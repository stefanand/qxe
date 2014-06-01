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

     - today button

************************************************************************ */

/*
 * To be correctly parsed, data items must have at least 3 properties:

    start_date - (string) the date when an event is scheduled to begin;
    end_date - (string) the date when an event is scheduled to be completed;
    text - (string) the event text.

To be loaded from a database, data items should have one more mandatory property:

    id - (string, number) the event id.
 */

/*
 * display_marked_timespans	defines whether the marked(blocked) time spans should be highlighted in the scheduler
check_limits	activates/disables checking of limits
mark_now	enables/disables the marker displaying the current time
limit_end	sets the right border of the allowable date range
limit_start	sets the left border of the allowable date range
limit_view	limits viewing events

Related sample:  Current time marking
 */
 /*
  * display_marked_timespans	defines whether the marked(blocked) time spans should be highlighted in the scheduler
check_limits	activates/disables checking of limits
mark_now	enables/disables the marker displaying the current time
limit_end	sets the right border of the allowable date range
limit_start	sets the left border of the allowable date range
limit_view	limits viewing events

Related sample:  Current time marking
  */
/*
 * addMarkedTimespan	marks dates, but with certain settings makes blocking (unlike blockTime() allows setting custom styling for the limit)
markTimespan	marks and/or blocks date(s) by applying the default or a custom style to them. Marking is cancelled right after any internal update occurs in the app. Can be used for highlighting

 */
/*
 * deleteMarkedTimespan	removes marking/blocking, set by the addMarkedTimespan() and blockTime() methods
unmarkTimespan	removes marking/blocking, set by the markTimespan() method
unblockTime	removes blocking, set by the blockTime() method
 */
/*
 * Blocking priority

When you call the 'blocking' methods several times and block different ranges, blocking will follow this priority (from highest to lowest):

    Dates specified through Date() objects for certain items;
    Dates for certain items (when the sections parameter is defined);
    Dates specified through Date() objects;
    Other dates.

    A blocking/marking with the higher priority will overwrite ones with the lower priority.
    Several blocking/marking methods with the same priority (located in the same time slot) will be applied simultaneously.

For example:

scheduler.addMarkedTimespan({ // blocks 4th July,2012 (this is Wednesday).
    days:  new Date(2012,7,4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section"
});
 */
/**
 *
 * @asset(qxe/icon/ui/scheduler/clock_small.gif)
 *
 * @childControl navigation-bar {qx.ui.container.Composite} container for the navigation bar controls
 * @childControl previous-week-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the previous week button
 * @childControl previous-week-button {qx.ui.form.Button} button to jump to the previous week
 * @childControl next-week-button-tooltip {qx.ui.tooltip.ToolTip} tooltip for the next week button
 * @childControl next-week-button {qx.ui.form.Button} button to jump to the next week
 * @childControl week-label {qx.ui.basic.Label} shows the current week
 * @childControl week-pane {qx.ui.container.Composite} the pane used to position the calendars of the week
 */
qx.Class.define("qxe.ui.scheduler.Week",
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

    // set the layout
    var layout = new qx.ui.layout.VBox();
    this._setLayout(layout);

    // create the child controls
    this._createChildControl("navigation-bar");
    this._createChildControl("spanning-week-pane");
    this._createChildControl("week-pane");
/*
    // Support for key events
    this.addListener("keypress", this._onKeyPress);

    // initialize format - moved from statics{} to constructor due to [BUG #7149]
    var Day = qxe.ui.scheduler.Day;
    if (!Day.DAY_MONTH_YEAR_FORMAT) {
        Day.DAY_MOtH_YEAR_FORMAT = qx.locale.Date.getDateTimeFormat("yyyyMMMM", "MMMM yyyy");
    }

    // Show the right date
    var shownDate = (date != null) ? date : new Date();
    this.showMonth(shownDate.getMonth(), shownDate.getFullYear());
*/
    // listen for locale changes
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener("changeLocale", this._updateDayPane, this);
    }
/*
    // register pointer up and down handler
    this.addListener("pointerdown", this._onPointerUpDown, this);
    this.addListener("pointerup", this._onPointerUpDown, this);
*/
    this._updateDayPane();
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
      init   : "day"
    },

    /** The currently shown year. */
    shownDay :
    {
      check : "Integer",
      init : null,
      nullable : true,
      event : "changeShownDay"
    },

    /** Scale x min. */
    hourScale :
    {
      check : "Integer",
      init : 15,
      nullable : false,
      event : "changeHourScale"
    },

    /** First hour to show. */
    firstHour :
    {
      check : "Integer",
      init : 8,
      nullable : false,
      event : "changeFirstHour"
    },

    /** Last hour to show. */
    lastHour :
    {
      check : "Date",
      init : 17,
      nullable : false,
      event : "changeLastHour"
    }
  },

  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  members :
  {
	__timeLabelArr : null,


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
          control.add(this.getChildControl("previous-week-button"));
          control.add(this.getChildControl("week-label"), {flex: 1});
          control.add(this.getChildControl("next-week-button"));

          this._add(control);
          break;

        case "previous-week-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Previous week"));
          break;

        case "previous-week-button":
          control = new qx.ui.toolbar.Button();
          control.addState("previousWeek");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("previous-week-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "week-label":
          control = new qx.ui.basic.Label();
          control.setAllowGrowX(true);
          control.setAnonymous(true);
          break;

        case "next-week-button-tooltip":
          control = new qx.ui.tooltip.ToolTip(this.tr("Next week"));
          break;

        case "next-week-button":
          control = new qx.ui.toolbar.Button();
          control.addState("nextWeek");
          control.setFocusable(false);
          control.setToolTip(this.getChildControl("next-week-button-tooltip"));
          control.addListener("tap", this._onNavButtonTap, this);
          break;

        case "spanning-week-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          control.add(this.getChildControl("clock-image"));
          control.add(this.getChildControl("spanning-label"), {flex : 1});

          this._add(control);
          break;

        case "clock-image":
          control = new qx.ui.basic.Image("qxe/icon/ui/scheduler/clock_small.gif");
          break;

        case "spanning-label":
          control = new qx.ui.basic.Label();
          break;

        case "time":
          control = new qx.ui.basic.Label();
          control.setAllowGrowX(true);
          control.setAllowGrowY(true);
          control.setSelectable(false);
          control.setAnonymous(true);
          control.setCursor("default");
          break;

        case "slot":
          control = new qx.ui.container.Composite();
          control.setAllowGrowX(true);
          control.setAllowGrowY(true);
          control.setCursor("default");
//          control.addListener("pointerdown", this._onDayTap, this);
//          control.addListener("dbltap", this._onDayDblTap, this);
          break;

        case "week-pane":
          var controlLayout = new qx.ui.layout.Grid();
          control = new qx.ui.container.Composite(controlLayout);

          // Add the hours
          this.__timeLabelArr = [];

          var firstHour = this.getFirstHour();
          var num = this.getLastHour() - firstHour + 1;
          var rowSpan = 60/this.getHourScale();
this.debug("start");
          for (var y = 0; y < num; y++)
          {
            // Add the week label
            var label = this.getChildControl("time#" + y);
            control.add(label, {column: 0, row: y, rowSpan: rowSpan});
            this.__timeLabelArr.push(label);

            // Add the day labels
            for (var y2 = 0; y2 < rowSpan; y2++)
            {
              var row = y * rowSpan + y2;
this.debug(y + "   " + row);
              controlLayout.setColumnFlex(row, 1);

              var label = this.getChildControl("slot#" + row);
              control.add(label, {column: 1, row: row, flex: 1});
            }
          }

          this._add(control);
this.debug("finishedddd");
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
        case this.getChildControl("last-year-button"):
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
    _updateDayPane : function()
    {
      var today = new Date();
      var todayYear = today.getFullYear();
      var todayMonth = today.getMonth();
      var todayDayOfMonth = today.getDate();

      // Create a help date that points to the first of the current month
      var helpDate = new Date(this.getShownYear(), this.getShownMonth(), 1);

      var year = helpDate.getFullYear();
      var month = helpDate.getMonth();
      var dayOfMonth = helpDate.getDate();

      var isToday = (year == todayYear && month == todayMonth && dayOfMonth == todayDayOfMonth);

      if (isToday) {
        dayLabel.addState("today");
      } else {
        dayLabel.removeState("today");
      }

      var weekFormat = new qx.util.format.DateFormat(this.getCalendar().TIME_FORMAT);

      var firstHour = this.getFirstHour();
      var num = this.getLastHour() - firstHour + 1;

      for (var y = 0; y < num; y++)
      {
        var str = "0" + (firstHour + y);
        this.__timeLabelArr[y].setValue(weekFormat.format(str.substring(str.length - 2) + ":00"));
      }
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
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._updateDayPane, this);
    }
  }
});
