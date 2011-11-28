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

/**
 * A digital clock.
 *
 * - adapt to dst worldwide
 * - adapt to local (browser) respective remote (server) time
 */
qx.Class.define("qxe.ui.info.DigitalClock",
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
      init : "digital-clock"
    },


   /*
    ---------------------------------------------------------------------------
      FEATURES
    ---------------------------------------------------------------------------
    */

    /*
     * Show a 12 or 24 hour clock.
     */
    showHours :
    {
      check : [12, 24],
      init : 12
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
          control = new qx.ui.basic.Label();

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    // overriden
    display : function(hours, minutes, seconds)
    {
      var am_pm = "";

      if(this.getShowHours() == 12)
      {
        am_pm = (hours > 11) ? " PM" : " AM";
        hours = (hours > 12) ? hours - 12 : hours;
        hours = (hours == 0) ? 12 : hours;
        hours = (hours % 12);
      }

      var padZeros = qxe.util.format.StringFormat.padZeros;

      var time = padZeros(hours, 2) + ':' + padZeros(minutes, 2);

      if(this.getShowSeconds())
      {
        time += ':' + padZeros(seconds, 2);
      }

      time += am_pm;

      this.getChildControl("pane").setValue(time);
    }
  }
});

