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

#asset(qxe/icon/ui/info/binary/on.gif)
#asset(qxe/icon/ui/info/binary/off.gif)

************************************************************************ */

/**
 * ThinkGeek's Binary LED Clock displays the time in a graphical binary format.
 * The following grid is laid out:
 *   8   8   8
 *   4 4 4 4 4
 * 2 2 2 2 2 2
 * 1 1 1 1 1 1
 * H H M M S S
 */
qx.Class.define("qxe.ui.info.BinaryClock",
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
    this._setLayout(new qx.ui.layout.Grid(2, 2));
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
      init : "binary-clock"
    }
	},

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
		display : function(hours, minutes, seconds)
		{
      this.__resetPane();

      // Convert current time to binary
      // Get current time, return as 6-digit string: HHMMSS
      var padZeros = qxe.util.format.StringFormat.padZeros;
      var time = padZeros(hours, 2) + padZeros(minutes, 2);

      if(this.getShowSeconds())
      {
        time += padZeros(seconds, 2);
      }

      var num;
      var layout = this._getLayout();

      //i=col, j=row
      for (var i = 1, l = time.length; i<=l; i++)
      {
        num = time.charAt(i - 1);

        for (var j = 8; j >= 1; j = j / 2)
        {
          var widget = layout.getCellWidget(3 - Math.log(j)/Math.log(2), i - 1);

          if (num - j >= 0 && widget)
          {
            widget.setSource("qxe/icon/ui/info/binary/on.gif");

            num = num - j;
          }
        }
      }
		},

    __resetPane : function()
    {
      var setup = [
        [0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1]
      ];
      var cols = 6 - !this.getShowSeconds() * 2;
      var layout = this._getLayout();

      for(var y=0; y<4; y++)
      {
        for(var x=0; x<cols; x++)
        {
          if(setup[y][x] == 1)
          {
            var widget = layout.getCellWidget(y, x);

            if(widget)
            {
              widget.setSource("qxe/icon/ui/info/binary/off.gif");
            }
            else
            {
              this._add(new qx.ui.basic.Image("qxe/icon/ui/info/binary/off.gif"), {column: x, row: y});
            }
          }
        }
      }
    }
  }
});

