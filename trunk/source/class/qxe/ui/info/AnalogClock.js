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
 * An analog clock.
 */
qx.Class.define("qxe.ui.info.AnalogClock",
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

//  this.setMinHeight(100);
//  this.setMinWidth(100);

  this._dial = [];
  this._dots = [];

  this._hours = [];
  this._minutes = [];
  this._seconds = [];
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
      init : "analog-clock"
    },

   /*
    ---------------------------------------------------------------------------
      FEATURES
    ---------------------------------------------------------------------------
    */

		manualDial :
		{
			check : "Object",
			nullable : true,
			init : null
		},

    /**
     * The face colour.
     */
    faceColor :
    {
      check : "Color",
      init : "#00ff00"
    },

    /**
     * The dot colour.
     */
    dotColor :
    {
      check : "Color",
      init : "#ffffff"
    },

    /**
     * The hour colour.
     */
    hourColor :
    {
      check : "Color",
      init : "#ff0000"
    },

    /**
     * The minute colour.
     */
    minuteColor :
    {
      check : "Color",
      init : "#ffffff"
    },

    /**
     * The second colour.
     */
    secondColor :
    {
      check : "Color",
      init : "#00ff00"
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
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "image-pane":
          control = new qx.ui.basic.Image();

					this._add(control);
          break;
			}

      return control || this.base(arguments, id);
    },

		_applyElementData : function(el)
		{
			this.error(el);
			var image = this.getManualDial();

			if(image)
			{
				this.add(image);
			}
			else
			{
				this._createDial(el);
				this._createHands(el);
			}
		},

    // Face and dial dial[i]
    __createFace :function(dial, i)
    {
      var face = qx.bom.Element.create("div");
      face.value = dial;

      var faceStyle = {
        position   : "absolute",
        top        : "0px",
        left       : "0px",
        width      : "15px",
        height     : "15px",
        fontFamily : "arial,sans-serif",
        fontSize   : "10px",
        color      : this.getFaceColor().getValue(),
        textAlign  : "center"
      };

      qx.bom.element.Style.setStyles(face, faceStyle);

      var e = 360/dial.length;

      this._dial[i] = faceStyle;
      this._dial[i].top  = this.getHeight()/2 - 6 + 30 * 1.4  * Math.sin(i*e*Math.PI/180) + "px";
      this._dial[i].left = this.getWidth()/2 - 6 + 30 * 1.4 * Math.cos(i*e*Math.PI/180) + "px";

      return face;
    },

    __createDots : function(i)
    {
      var dot = qx.bom.Element.create("div");
      var dotStyle = {
        position        : "absolute",
        top             : "0px",
        left            : "0px",
        width           : "2px",
        height          : "2px",
        fontSize        : "2px",
        backgroundColor : this.getDotColor().getValue()
      };

      qx.bom.element.Style.setStyles(dot, dotStyle);

      var e = 360/dial.length;

      this._dots[i] = dotStyle;
      this._dots[i].top  = this.getHeight()/2 + 30 * Math.sin(e*i*Math.PI/180) + "px";
      this._dots[i].left = this.getWidth()/2 + 30 * Math.cos(e*i*Math.PI/180) + "px";

      return dot;
    },

		_createDial : function(el)
		{
      var dial = "3 4 5 6 7 8 9 10 11 12 1 2";
      dial = dial.split(" ");

      for (var i=0, l=dial.length; i<l; i++)
      {
        el.appendChild(this.__createFace(dial[i], i));
        el.appendChild(this.__createDots(i));
      }
		},

		_createHands : function(el)
		{
      this._createHourHand(el);
      this._createMinuteHand(el);
      this._createSecondHand(el);
		},

    _createHourHand : function(el)
    {
      var h = 3;

      for (var i=0; i < h; i++)
      {
        var hourHand = qx.bom.Element.create("div");
        var hourHandStyle = {
          position        : "absolute",
          top             : "0px",
          left            : "0px",
          width           : "2px",
          height          : "2px",
          fontSize        : "2px",
          backgroundColor : this.getHourColor().getValue()
        };

        qx.bom.element.Style.setStyles(hourHand, hourHandStyle);

        el.appendChild(hourHand);

        this._hours[i] = hourHandStyle;
      }
    },

    _createMinuteHand : function(el)
    {
      var m = 4;

      for (var i=0; i < m; i++)
      {
        var minuteHand = qx.bom.Element.create("div");
        var minuteHandStyle = {
          position        : "absolute",
          top             : "0px",
          left            : "0px",
          width           : "2px",
          height          : "2px",
          fontSize        : "2px",
          backgroundColor : this.getMinuteColor().getValue()
        };

        qx.bom.element.Style.setStyles(minuteHand, minuteHandStyle);

        el.appendChild(minuteHand);

        this._minutes[i] = minuteHandStyle;
      }
    },

    _createSecondHand : function(el)
    {
      var s = 5;

      for (var i=0; i < s; i++)
      {
        var secondHand = qx.bom.Element.create("div");
        var secondHandStyle = {
          position        : "absolute",
          top             : "0px",
          left            : "0px",
          width           : "2px",
          height          : "2px",
          fontSize        : "2px",
          backgroundColor : this.getSecondColor().getValue()
        };

        qx.bom.element.Style.setStyles(secondHand, secondHandStyle);

        el.appendChild(secondHand);

        this._seconds[i] = secondHandStyle;
      }
    },

		display : function(hours, minutes, seconds)
		{
      var halfHeight = this.getHeight()/2;
      var halfWidth = this.getWidth()/2;
      var cyx = 30/4;

      // Second calculations
      var secondOffSet = seconds - 15;

      if (seconds < 15)
      {
        secondOffSet = seconds + 45;
      }

      var second = Math.PI * (secondOffSet/30);

      // Render second
      for (var i=0; i < second; i++)
      {
        this._seconds[i].top = halfheight + (i*cyx) * Math.sin(second) + pix;
        this._seconds[i].left = halfWidth + (i*cyx) * Math.cos(second) + pix;
      }

      // Minute calculations
      var minuteOffSet = minutes - 15;

      if (minutes < 15)
      {
        minuteOffSet = minutes + 45;
      }

      var minute = Math.PI * (minuteOffSet/30);

      // Render minute
      for (var i=0; i < minute; i++)
      {
        this._minutes[i].top = halfHeight + (i*cyx) * Math.sin(minute) + pix;
        this._minutes[i].left = halfWidth + (i*cyx) * Math.cos(minute) + pix;
      }

      // Hour calculations
      if (hours > 12)
      {
        hours -= 12;
      }

      var hourOffSet = hours - 3;

      if (hours < 3)
      {
        hourOffSet = hours + 9;
      }

      var hour = Math.PI * (hourOffSet/6) + Math.PI * minutes/360;

      // Render hour
      for (var i=0; i < hour; i++)
      {
        this._hours[i].top = halfHeight + (i*cyx) * Math.sin(hour) + pix;
        this._hours[i].left = halfWidth + (i*cyx) * Math.cos(hour) + pix;
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
    this.disposeObject("_dial", "_dots");
    this.disposeArray("_hours", "_minutes", "_seconds");
	}
});

