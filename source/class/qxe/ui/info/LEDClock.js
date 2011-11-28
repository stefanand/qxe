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
 * An LED clock.
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
    this._setLayout(new qx.ui.layout.HBox());

    this._createChildControl("pane");

    this.__digits = [];
    this._loadFigures(this.getImagePath() + this.getTemplate() + "/");
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
    image :
    {
      check : "Image",
      init : ""
    },

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
    __digits : null,

    __hour1I : null,
    __hour2I : null,
    __divisor1I : null,
    __minute1I : null,
    __minute2I : null,
    __divisor2I : null,
    __second1I : null,
    __second2I : null,

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
          this.__hour1I = new qx.ui.basic.Image();
          this.__hour2I = new qx.ui.basic.Image();
          this.__divisor1I = new qx.ui.basic.Image();
          this.__minute1I = new qx.ui.basic.Image();
          this.__minute2I = new qx.ui.basic.Image();
          this.__divisor2I = new qx.ui.basic.Image();
          this.__second1I = new qx.ui.basic.Image();
          this.__second2I = new qx.ui.basic.Image();

          this._add(this._hour1I, this._hour2I, this._divisor1I, this._minute1I, this._minute2I, this._divisor2I, this._second1I, this._second2I);
          break;
			}

      return control || this.base(arguments, id);
    },

		_loadFigures : function(imagePath)
		{
      for(var i=0; i<10; i++) {
        this._figures[i] = new QxImagePreloader(imagePath + i + ".png");
      }

      this._figures[10] = new QxImagePreloader(imagePath + "blank.png");
      this._figures[11] = new QxImagePreloader(imagePath + "divisor.png");
		},

		display : function(hours, minutes, seconds)
		{
      if(this.getShowHours() == 12)
      {
        hours = (hours > 12) ? hours - 12 : hours;
        hours = (hours == 0) ? 12 : hours;
      }

      var time = ((hours < 10) ? "0" + hours : hours) + '' + ((minutes < 10) ? "0"+minutes : minutes) + '' + ((seconds < 10) ? "0"+seconds : seconds);

  if(this.getShowHours() == 12)
  {
    this._hour1I.setSource(this._figures[time.charAt(0)].getSource());
  }
  else
  {
    this._hour1I.setSource(this._figures[10].getSource());
  }

      this._hour2I.setSource(this._figures[time.charAt(1)].getSource());
      this._divisor1I.setSource(this._figures[11].getSource());
      this._minute1I.setSource(this._figures[time.charAt(2)].getSource());
      this._minute2I.setSource(this._figures[time.charAt(3)].getSource());
      this._divisor2I.setSource(this._figures[11].getSource());
      this._second1I.setSource(this._figures[time.charAt(4)].getSource());
      this._second2I.setSource(this._figures[time.charAt(5)].getSource());
		}
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

	destruct : function()
	{
  if(this._hour1I)
  {
    this._hour1I.dispose();
    this._hour1I = null;
  }

  if(this._hour2I)
  {
    this._hour2I.dispose();
    this._hour2I = null;
  }

  if(this._divisor1I)
  {
    this._divisor1I.dispose();
    this._divisor1I = null;
  }

  if(this._minute1I)
  {
    this._minute1I.dispose();
    this._minute1I = null;
  }

  if(this._minute2I)
  {
    this._minute2I.dispose();
    this._minute2I = null;
  }

  if(this._divisor2I)
  {
    this._divisor2I.dispose();
    this._divisor2I = null;
  }

  if(this._second1I)
  {
    this._second1I.dispose();
    this._second1I = null;
  }

  if(this._second2I)
  {
    this._second2I.dispose();
    this._second2I = null;
  }

  this._figures = null;
	}
});

