/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2014 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/**
 * 
 * @childControl navigation-bar {qx.ui.container.Composite} container for the navigation bar controls
 * @childControl last-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the last year button
 * @childControl last-year-button {qx.ui.form.Button} button to jump to the last year
 * @childControl next-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the next year button
 * @childControl next-year-button {qx.ui.form.Button} button to jump to the next year
 * @childControl month-year-label {qx.ui.basic.Label} shows the current month and year
 * @childControl year-pane {qx.ui.container.Composite} the pane used to position the calendars of the year
 */
qx.Class.define("qxe.ui.scheduler.Year",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param date {Date ? null} The year of date to show. If <code>null</code>
   * the current year of today (today) is shown.
   */
  construct : function(date)
  {
    this.base(arguments);

    // set the layout
    var layout = new qx.ui.layout.VBox();
    this._setLayout(layout);

    // create the child controls
    this._createChildControl("navigation-bar");
    this._createChildControl("year-pane");

    // Support for key events
    this.addListener("keypress", this._onKeyPress);

    // initialize format - moved from statics{} to constructor due to [BUG #7149]
    var DateChooser = qx.ui.control.DateChooser;
    if (!DateChooser.MONTH_YEAR_FORMAT) {
        DateChooser.MONTH_YEAR_FORMAT = qx.locale.Date.getDateTimeFormat("yyyyMMMM", "MMMM yyyy");
    }

    // Show the right date
    var shownDate = (date != null) ? date : new Date();
    this.showMonth(shownDate.getMonth(), shownDate.getFullYear());

    // listen for locale changes
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener("changeLocale", this._updateYearPane, this);
    }

    // register pointer up and down handler
    this.addListener("pointerdown", this._onPointerUpDown, this);
    this.addListener("pointerup", this._onPointerUpDown, this);
  },

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init   : "year"
    },

    /** The currently shown year. */
    shownYear :
    {
      check : "Integer",
      init : null,
      nullable : true,
      event : "changeShownYear"
    },

    /** The date value of the widget. */
    value :
    {
      check : "Date",
      init : null,
      nullable : true,
      event : "changeValue",
      apply : "_applyValue"
    }
  },

  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET INTERNALS
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        // NAVIGATION BAR STUFF
        case "navigation-bar":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());

          // Add the navigation bar elements
          control.add(this.getChildControl("last-year-button"));
          control.add(this.getChildControl("month-year-label"), {flex: 1});
          control.add(this.getChildControl("next-year-button"));

          this._add(control);
          break;

        case "last-year-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Last year"));
          break;

        case "last-year-button":
          control = new qx.ui.toolbar.Button();
          control.addState("lastYear");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("last-year-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "month-year-label":
          control = new qx.ui.basic.Label();
          control.setAllowGrowX(true);
          control.setAnonymous(true);
          break;

        case "next-year-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Next year"));
          break;

        case "next-year-button":
          control = new qx.ui.toolbar.Button();
          control.addState("nextYear");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("next-year-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "year-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));

          var date = 12;

          for(var month = 0; month < 12; month++)
          {
            control.add(new qxe.ui.control.Calendar(date), {column: month % 4, row: Math.floor(month / 4)});
          }

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    // apply methods
    _applyValue : function(value, old)
    {
      if ((value != null) && (this.getShownYear() != value.getFullYear()))
      {
        // The new date is in another month -> Show that month
        this.showMonth(value.getMonth(), value.getFullYear());
      }
      else
      {
        // The new date is in the current month -> Just change the states
        var newDay = (value == null) ? -1 : value.getDate();

        for (var i=0; i<6*7; i++)
        {
          var dayLabel = this.__dayLabelArr[i];

          if (dayLabel.hasState("otherMonth"))
          {
            if (dayLabel.hasState("selected")) {
              dayLabel.removeState("selected");

              dayLabel.removeState("selected");
            }
          }
          else
          {
            var day = parseInt(dayLabel.getValue(), 10);

            if (day == newDay) {
              dayLabel.addState("selected");
            } else if (dayLabel.hasState("selected")) {
              dayLabel.removeState("selected");
            }
          }
        }
      }
    },

    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Handler which stops the propagation of the tap event if
     * the navigation bar or calendar headers will be tapped.
     *
     * @param e {qx.event.type.Pointer} The pointer up / down event
     */
    _onPointerUpDown : function(e) {
      var target = e.getTarget();

      if (target == this.getChildControl("navigation-bar") ||
          target == this.getChildControl("date-pane")) {
        e.stopPropagation();
        return;
      }
    },

    /**
     * Event handler. Called when a navigation button has been tapped.
     *
     * @param evt {qx.event.type.Data} The data event.
     */
    _onNavButtonTap : function(evt)
    {
      var year = this.getShownYear();
      var month = this.getShownMonth();

      switch(evt.getCurrentTarget())
      {
        case this.getChildControl("last-year-button"):
          year--;
          break;

        case this.getChildControl("next-year-button"):
          year++;
          break;
      }

      this.showMonth(month, year);
    },

    /**
     * Event handler. Called when a key was pressed.
     *
     * @param evt {qx.event.type.Data} The event.
     */
    _onKeyPress : function(evt)
    {
      var yearIncrement = null;

      if (evt.getModifiers() == 0)
      {
        switch(evt.getKeyIdentifier())
        {
          case "Left":
            dayIncrement = -1;
            break;

          case "Right":
            dayIncrement = 1;
            break;
          case "Up":
              dayIncrement = -7;
              break;

            case "Down":
              dayIncrement = 7;
              break;

            case "PageUp":
              monthIncrement = -1;
              break;

            case "PageDown":
              monthIncrement = 1;
              break;

            case "Escape":
              if (this.getValue() != null)
              {
                this.setValue(null);
                return;
              }
              break;

            case "Enter":
            case "Space":
              if (this.getValue() != null) {
                this.execute();
              }

              return;
          }
        }
        else if (evt.isShiftPressed())
        {
          switch(evt.getKeyIdentifier())
          {
            case "PageUp":
              yearIncrement = -1;
              break;

            case "PageDown":
              yearIncrement = 1;
              break;
          }
        }

        if (dayIncrement != null || monthIncrement != null || yearIncrement != null)
        {
          var date = this.getValue();

          if (date != null) {
            date = new Date(date.getTime());
          }

          if (date == null) {
            date = new Date();
          }
          else
          {
            if (dayIncrement != null){date.setDate(date.getDate() + dayIncrement);}
            if (monthIncrement != null){date.setMonth(date.getMonth() + monthIncrement);}
            if (yearIncrement != null){date.setFullYear(date.getFullYear() + yearIncrement);}
          }

          this.setValue(date);
        }
    },

    /**
     * Event handler. Used to handle the key events.
     *
     * @param e {qx.event.type.Data} The event.
     */
    handleKeyPress : function(e) {
      this._onKeyPress(e);
    },

    /**
     * Updates the year pane.
     */
    _updateYearPane : function()
    {
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._updateYearPane, this);
    }
  }
});