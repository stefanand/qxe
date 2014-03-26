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
 * Creates a scrolling marquee (i.e. scrolling text or scrolling
 * images) by using the <marquee> tag. The text/images can scroll
 * from right to left, left to right, top to bottom, or bottom to top.
 *
 * The marquee element provides a way for browsers to render text that
 * moves across the page without having to resort to JavaScript techniques.
 * The marquee is non-standard but enjoys (or possibly suffers from) good
 * browser support.
 * 
 * Support for marquee is varied. Some browsers will stop animation
 * regardless of loop settings, some interpret direction differently,
 * some will honor height and width attributes, most pay no attention at
 * all. However, given that this is not part of any HTML recommendation,
 * this is perhaps to be expected. The simple answer is not to use it if
 * you want to have valid documents that render consistently and don’t
 * annoy the heck out of the reader.
 *
 * It is generally considered to be a very unfriendly element to use, one
 * which presents difficulties for many users who may have difficulty
 * tracking the text as it moves. Our advice is not to use it. JavaScript
 * is a more suitable technique for moving text on screen - if there is a
 * valid reason for doing this at all.
 * 
 * http://www.quackit.com/html/codes/scrolling_text.cfm
 * http://www.htmlmarquee.com/attributes.html
 * http://www.hongkiat.com/blog/css3-animation-advanced-marquee/
 */
qx.Class.define("qxe.ui.form.Marquee",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param html {String} the value (text or html) in the marquee
   */
  construct : function(description)
  {
    this.base(arguments);

    if(description != null)
    {
      this.__description = description;
    }
    else
    {
      this.description = qxe.ui.form.Marquee.DESCRIPTION;
    }

    // configure internal layout
    this._setLayout(new qx.ui.layout.Basic());

    this._createChildControl("marquee");
  },


  /*
   *****************************************************************************
      STATICS
   *****************************************************************************
   */

  statics :
  {
    /** Default description */
    DESCRIPTION : 
    {
      "duration": 20000,
//      "keep": 100,
      "keyFrames": {
          0 : {translate :  "100%"},  
         10 : {translate :    "0" },
         40 : {translate :    "0" },
         50 : {translate : "-100%"},
        100 : {translate : "-100%"}
      },
//      "origin": "50% 50%",
      "repeat": infinite,
      "timing": "ease"
//      "alternate": false,
//      "delay" : 2000
    }
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
      init : "marquee"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __description : null,

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "marquee" :
          control = new qx.ui.basic.Label();

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the direction.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyDirection : function(value, old)
    {
    },

    _applyBehaviour : function(value, old)
    {
    },

    _applyType : function(value, old)
    {
    },

    _applyScrollDelay : function(value, old)
    {
    },

    _applyScrollAmount : function(value, old)
    {
    },

    _applyLoop : function(value, old)
    {
    },

    _applyTrueSpeed : function(value, old)
    {
    },

    _applyValue : function(value, old)
    {
      if(value != old)
      {
        this._getChildControl("marquee").setValue(value);
      }
    },

    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    add : function(value, decsription, duration)
    {
      
    }
  },


  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

   destruct : function() {
     this._disposeObjects("__description");
   }
});
