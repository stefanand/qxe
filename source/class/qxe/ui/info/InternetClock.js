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
 * This class shows the Internet Time which is a time scheme designed by Swatch,
 * which divides the 24 hour day into 1000 "beats", measured from midnight in Biel,
 * Switzerland. As the Internet Time is the same all over the world this script would
 * be useful if you want to make an appointment. See www.swatch.com. 
 */
qx.Class.define("qxe.ui.info.InternetClock",
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
    this._setLayout(new qx.ui.layout.HBox());

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
      init : "internet-clock"
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
      // Biel MeanTime (BMT) is the universal reference for Internet Time.
      var bmt = (now.getTimezoneOffset() + 60);  

      var total = ((60 * hours + minutes + seconds/60 + bmt) * (1000 / 1440));

      var time = Math.floor(total);
      time = (time < 0) ? time + 1000 : time;
      time = qxe.util.format.StringFormat.padZeros(time, 4)

      this.getChildControl("pane").setValue("@" + time);
    }
  }
});

