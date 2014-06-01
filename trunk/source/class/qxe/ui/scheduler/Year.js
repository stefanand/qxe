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

     - should not be able to click and get focus on any day/only one day at a time?
       and arrow key functionality between months etc ?
     - control panel fix with arrows and label
     - days with bookings should have a different colour
     - pointing (not clicking) on a day with bookings a popup should show the
       bookings, both activities with time and day spanning activities without
       time.
     - a today/current year button in the control panel
     - copy object/getByName to create calendar?

************************************************************************ */

/**
 *
 * @require(qxe.ui.control.ISOCalendar)
 * 
 * @childControl navigation-bar {qx.ui.container.Composite} container for the navigation bar controls
 * @childControl previous-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the previous year button
 * @childControl previous-year-button {qx.ui.form.Button} button to jump to the previous year
 * @childControl next-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the next year button
 * @childControl next-year-button {qx.ui.form.Button} button to jump to the next year
 * @childControl year-label {qx.ui.basic.Label} shows the current month and year
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
  construct : function(calendar)
  {
    this.base(arguments);

    if(calendar)
    {
      this.setCalendar(calendar);
    }
    else
    {
      this.initCalendar();
    }

    // set the layout
    var layout = new qx.ui.layout.VBox();
    this._setLayout(layout);

    // create the child controls
    this._createChildControl("navigation-bar");
    this._createChildControl("year-pane");

    // Support for key events
    this.addListener("keypress", this._onKeyPress);

    // initialize format - moved from statics{} to constructor due to [BUG #7149]
//    if (!calendar.YEAR_FORMAT) {
//        calendar.YEAR_FORMAT = qx.locale.Date.getDateTimeFormat("yyyy", "yyyy");
//    }

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

    /** The calendar to be used. Defaults to the ISO calendar. */
    calendar :
    {
      check : "Object",
      init : new qxe.ui.control.ISOCalendar(),
      event : "changeCalendar"
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
          control.add(this.getChildControl("previous-year-button"));
          control.add(this.getChildControl("year-label"), {flex: 1});
          control.add(this.getChildControl("next-year-button"));

          this._add(control);
          break;

        case "previous-year-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Previous year"));
          break;

        case "previous-year-button":
          control = new qx.ui.toolbar.Button();
          control.addState("previousYear");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("previous-year-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "year-label":
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

          var calendar = this.getCalendar();
          var year = calendar.getShownYear();
          var clazz = qx.Class.getByName(calendar.classname);

          for(var month = 0; month < 12; month++)
          {
            var date = new Date(year, month, 1);
            control.add(new clazz(date), {column: month % 4, row: Math.floor(month / 4)});
          }

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
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
          target == this.getChildControl("year-pane")) {
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

      switch(evt.getCurrentTarget())
      {
        case this.getChildControl("previous-year-button"):
          year--;
          break;

        case this.getChildControl("next-year-button"):
          year++;
          break;
      }

      this.showYear(year);
    },

    /**
     * Event handler. Called when a key was pressed.
     *
     * @param evt {qx.event.type.Data} The event.
     */
    _onKeyPress : function(evt)
    {
/*
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
            if (this.getValue() != null)
            {
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

      if (yearIncrement != null)
      {
        var date = this.getValue();

        if (date != null)
        {
          date = new Date(date.getTime());
        }

        if (date == null)
        {
          date = new Date();
        }
        else
        {
          date.setFullYear(date.getFullYear() + yearIncrement);
        }

        this.setValue(date);
      }
*/
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
