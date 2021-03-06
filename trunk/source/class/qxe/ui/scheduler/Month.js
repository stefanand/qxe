/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Martin Wittemann (martinwittemann)

     * Stefan Andersson (sand)

       Added:
        - DateChooser has been broken up into two parts to be reused for
          the qxe.ui.scheduler classes.
        - By breaking up the DateChooser we will also be able to choose
          different calendars complying with the selected locale after
          it has been implemented.
        - Supports implementation of different chronology of different
          calendars.

************************************************************************ */

/**
 * A *date chooser* is a small calendar including a navigation bar to switch the shown
 * month. It includes a column for the calendar week and shows one month. Selecting
 * a date is as easy as tapping on it.
 *
 * To be conform with all form widgets, the {@link qx.ui.form.IForm} interface
 * is implemented.
 *
 * The following example creates and adds a date chooser to the root element.
 * A listener alerts the user if a new date is selected.
 *
 * <pre class='javascript'>
 * var chooser = new qx.ui.control.DateChooser();
 * this.getRoot().add(chooser, { left : 20, top: 20});
 *
 * chooser.addListener("changeValue", function(e) {
 *   alert(e.getData());
 * });
 * </pre>
 *
 * Additionally to a selection event an execute event is available which is
 * fired by doubletap or tapping the space / enter key. With this event you
 * can for example save the selection and close the date chooser.
 *
 * @childControl navigation-bar {qx.ui.container.Composite} container for the navigation bar controls
 * @childControl previous-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the previous year button
 * @childControl previous-year-button {qx.ui.form.Button} button to jump to the previous year
 * @childControl previous-month-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the previous month button
 * @childControl previous-month-button {qx.ui.form.Button} button to jump to the previous month
 * @childControl next-month-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the next month button
 * @childControl next-month-button {qx.ui.form.Button} button to jump to the next month
 * @childControl next-year-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the next year button
 * @childControl next-year-button {qx.ui.form.Button} button to jump to the next year
 * @childControl month-year-label {qx.ui.basic.Label} shows the current month and year
 * @childControl date-pane {qx.ui.container.Composite} the pane used to position the week, weekday and day labels
 *
 */
qx.Class.define("qxe.ui.scheduler.Month",
{
  extend : qx.ui.core.Widget,
  include : [
    qx.ui.form.MForm
  ],
  implement : [
    qx.ui.form.IForm
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param date {Date ? null} The initial date to show. If <code>null</code>
   * the current day (today) is shown.
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
    this._createChildControl("date-pane");

    // listen for locale changes
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener("changeLocale", this._updateDatePane, this);
    }

    // register pointer up and down handler
    this.addListener("pointerdown", this._onPointerUpDown, this);
    this.addListener("pointerup", this._onPointerUpDown, this);

    // Needs to be run after adding the calendar to change label etc.
    this._updateDatePane();
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
      init   : "datechooser"
    },

    // overrridden
    width :
    {
      refine : true,
      init : 200
    },

    // overridden
    height :
    {
      refine : true,
      init : 150
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
          control.add(this.getChildControl("previous-month-button"));
          control.add(this.getChildControl("month-year-label"), {flex: 1});
          control.add(this.getChildControl("next-month-button"));
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

        case "previous-month-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Previous month"));
          break;

        case "previous-month-button":
          control = new qx.ui.toolbar.Button();
          control.addState("previousMonth");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("previous-month-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "month-year-label":
          control = new qx.ui.basic.Label();
          control.setAllowGrowX(true);
          control.setAnonymous(true);
          break;

        case "next-month-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Next month"));
          break;

        case "next-month-button":
          control = new qx.ui.toolbar.Button();
          control.addState("nextMonth");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("next-month-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
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

        case "date-pane":
          control = this.getCalendar();

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
      var calendar = this.getCalendar();
      var year = calendar.getShownYear();
      var month = calendar.getShownMonth();

      switch(evt.getCurrentTarget())
      {
        case this.getChildControl("previous-year-button"):
          year--;
          break;

        case this.getChildControl("previous-month-button"):
          month--;

          if (month < 0)
          {
            month = 11;
            year--;
          }

          break;

        case this.getChildControl("next-month-button"):
          month++;

          if (month >= 12)
          {
            month = 0;
            year++;
          }

          break;

        case this.getChildControl("next-year-button"):
          year++;
          break;
      }

      calendar.showMonth(month, year);
    },


    /**
     * Updates the date pane.
     */
    _updateDatePane : function()
    {
      var calendar = this.getCalendar();

      // update the calendar
      calendar._updateDatePane();
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
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._updateDatePane, this);
    }
  }
});
