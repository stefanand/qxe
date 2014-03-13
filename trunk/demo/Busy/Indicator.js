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

#asset(qxe/icon/info/loading_application.gif)

************************************************************************ */

/**
 *
 * Get loading images from http://ajaxload.info/
 *
 * @childControl control-bar {qx.ui.container.Composite} container which holds the control-pane and visual-pane
 * @childControl control-pane {qx.ui.container.Composite} container shows the print-button and which holds the fit-pane, zoom-pane, orientation-pane, location-pane, tool-pane and search-pane
 *
 */
qx.Class.define("qxe.ui.info.Indicator",
{
  extend : qx.ui.core.Widget,
  include : qx.ui.core.MBlocker,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param image {String} The image.
   * @param indicator {Boolean} Show indicator.
   */
  construct : function(image, indicator)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.Basic());

    this._createChildControl("image-pane");

    // apply constructor parameters
    if(image == null)
    {
      image = "qxe/icon/info/loading_application.gif";
    }

    this.getChildControl("image-pane").setSource(image);

    if(indicator != null)
    {
      this.setIndicator(indicator);
    }
  },


  /*
  *****************************************************************************
     STATISTICS
  *****************************************************************************
  */

  statics :
  {
    getInstance : function(widget, image)
    {
      var location = widget.getContainerLocation("padding");

      // Show loading indicator
      var loadingLI = new qxe.ui.info.LoadIndicator(image);

      var left = Math.round(location.left + (location.right - location.left - loadingLI.getWidth())/2);
      // Height of <div id="join"> is 470 and is hard coded here cause it is not seen in.
      var top = Math.round(location.top + (location.bottom - location.top - loadingLI.getHeight() + 470)/2);

      var rootW = widget.getApplicationRoot();
      rootW.add(loadingLI, {left: left, top: top});

      return loadingLI;
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
      init : "indicator"
    },

   /*
    ---------------------------------------------------------------------------
      FEATURES
    ---------------------------------------------------------------------------
    */

    /** Should the indicator be shown */
    indicator :
    {
      check : "Boolean",
      init : true,
      apply : "_applyIndicatorChange",
      themeable : true
    },

    /** The value of the progress indicator */
    progress :
    {
      init : 0,
      check : "_validateProgress"
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
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "image-pane":
          control = new qx.ui.basic.Image();

          if(this.getIndicator())
          {
            this._add(this.getChildControl("progress-indicator"));
          }

//          control.setZIndex(1e10);
//          this.blockContent(this.getZIndex() - 1);

          this._add(control);
          break;

        case "progress-indicator":
          control = new qx.ui.basic.Label();
          break;
      }

      return control || this.base(arguments, id);
    },

    /**
     * Validate the progress.
     *
     * @param value {Integer} The progressed value
     */
    _validateProgress : function(value)
    {
      if(value == 100)
      {
        this.terminate();

        return true;
      }
      else
      {
        return !isNaN(value) && value >= 0 && value <= 100;
      }
    },

    /**
     * Terminate.
     */
    terminate : function()
    {
//      if (this.isContentBlocked())
//      {
//        this.unblockContent();
//      }

      this.getLayoutParent().remove(this);
    }
  }
});

