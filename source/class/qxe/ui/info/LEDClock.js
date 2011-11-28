/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/* ************************************************************************

#asset(qxe/icon/ui/info/led/*)

************************************************************************ */

/**
 * A LED clock.
 */
qx.Class.define("qxe.ui.info.LEDClock",
{
  extend : qxe.ui.info.Clock,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.Canvas());

    this._createChildControl("pane");
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
      init : "led-clock"
    },

   /*
    ---------------------------------------------------------------------------
      FEATURES
    ---------------------------------------------------------------------------
    */

    /*
     * Image to use if no font possible.
     */
    imagePath :
    {
      check : "Image",
      init : "qxe/icon/ui/info/led/"
    },

    /*
     * Show a 12 or 24 hour clock.
     */
    showHours :
    {
      check : [12, 24],
      init : 12
    },

    /*
     * Show a leading zero for one digit hours.
     */
    leadingHourZero :
    {
      check : "Boolean",
      init : true
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
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());

          control.add(new qx.ui.basic.Image());
          control.add(new qx.ui.basic.Image());

          control.add(new qx.ui.basic.Image());

          control.add(new qx.ui.basic.Image());
          control.add(new qx.ui.basic.Image());

          control.add(new qx.ui.basic.Image());

          control.add(new qx.ui.basic.Image());
          control.add(new qx.ui.basic.Image());

          control.add(new qx.ui.basic.Image());
          this._add(control);
          break;
			}

      return control || this.base(arguments, id);
    },

    // overridden
		display : function(hours, minutes, seconds)
		{
      var am_pm = "";

      if(this.getShowHours() == 12)
      {
        am_pm = (hours > 11) ? "pm" : "am";
        hours = (hours > 12) ? hours - 12 : hours;
        hours = (hours == 0) ? 12 : hours;
        hours = (hours % 12);
      }

      var padZeros = qxe.util.format.StringFormat.padZeros;

      var time = padZeros(hours, 2) + padZeros(minutes, 2);

      if(this.getShowSeconds())
      {
        time += padZeros(seconds, 2);
      }

      var children = this.getChildControl("pane").getChildren();
      var path = this.getImagePath();

      if(this.getLeadingHourZero())
      {
        children[0].setSource(path + "digit_" + time.charAt(0) + ".gif");
      }
      else
      {
        children[0].setSource(path + "blank.gif");
      }

      children[1].setSource(path + "digit_" + time.charAt(1) + ".gif");

      children[2].setSource(path + "colon.gif");

      children[3].setSource(path + "digit_" + time.charAt(2) + ".gif");
      children[4].setSource(path + "digit_" + time.charAt(3) + ".gif");

      if(this.getShowSeconds())
      {
        children[5].setSource(path + "colon.gif");

        children[6].setSource(path + "digit_" + time.charAt(4) + ".gif");
        children[7].setSource(path + "digit_" + time.charAt(5) + ".gif");
      }

      if(am_pm != "")
      {
        children[8].setSource(path + am_pm + ".gif");
      }
      else
      {
        children[8].setSource(path + "blank.gif");
      }
		}
  }
});

