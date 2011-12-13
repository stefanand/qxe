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

 Todo:
 - fix zoom, with zoom frame
 - fix panning
 - fix scrollbars sync with the whole document and not only current page
 - fix integration with flash for functions like: print, search, text select etc.
 - fix for checking FRAMESLOADED instead of always 100% through getPercentLoaded() i.e. not all frames need to be loaded
   only the frame you want to look at.

************************************************************************ */

/* ************************************************************************

#asset(qxe/icon/info/loading_content.gif)

#asset(qx/icon/${qx.icontheme}/16/actions/document-print.png)

#asset(qxe/icon/ui/control/documentviewer/thumbnails.gif)
#asset(qxe/icon/ui/control/documentviewer/fitwidth.gif)
#asset(qxe/icon/ui/control/documentviewer/fitpage.gif)
#asset(qx/icon/${qx.icontheme}/16/actions/view-fullscreen.png)

#asset(qx/icon/${qx.icontheme}/16/actions/zoom-in.png)
#asset(qx/icon/${qx.icontheme}/16/actions/zoom-out.png)

#asset(qx/icon/${qx.icontheme}/16/actions/object-rotate-right.png)
#asset(qx/icon/${qx.icontheme}/16/actions/object-rotate-left.png)

#asset(qxe/icon/ui/control/documentviewer/pointer.gif)
#asset(qxe/icon/ui/control/documentviewer/textselect.gif)
#asset(qxe/icon/ui/control/documentviewer/handtool.gif)

#asset(qx/icon/${qx.icontheme}/16/actions/edit-find.png)

************************************************************************ */

/**
 * A document flash viewer as known from native applications.
 *
 * Includes support for viewing flash converted documents.
 *
 * @appearance textfield
 *
 * @childControl control-bar {qx.ui.container.Composite} container which holds the control-pane and visual-pane
 * @childControl control-pane {qx.ui.container.Composite} container shows the print-button and which holds the fit-pane, zoom-pane, orientation-pane, page-control, tool-pane and search-pane
 * @childControl print-button {qx.ui.toolbar.Button} prints the document in the visual-pane
 * @childControl fit-pane {qx.ui.container.Composite} container shows the thumb-view-button, fit-width-button, fit-page-button and full-screen-button
 * @childControl thumb-view-button {qx.ui.toolbar.RadioButton} shows all pages of the document in the visual-pane
 * @childControl fit-width-button {qx.ui.toolbar.RadioButton} fits the width of the document in the visual-pane
 * @childControl full-page-button {qx.ui.toolbar.RadioButton} fits the page of the document in the visual-pane
 * @childControl full-screen-button {qx.ui.toolbar.RadioButton} fits the full screen for the document in the visual-pane
 * @childControl zoom-pane {qx.ui.container.Composite} container shows the zoom-page-slider and zoom-page-field
 * @childControl zoom-page-slider {qx.ui.form.Slider} zooms the document in the visual-pane
 * @childControl zoom-page-field {qx.ui.form.TextField} shows the zoom value of the document in the visual-pane
 * @childControl orientation-pane {qx.ui.container.Composite} container shows the clockwise-button and counterclockwise-button
 * @childControl clockwise-button {qx.ui.toolbar.Button} rotates the document in the visual-pane clockwise
 * @childControl counterclockwise-button {qx.ui.toolbar.Button} rotates the document in the visual-pane counterclockwise
 * @childControl page-control-pane {qxe.ui.control.PageControl} container shows the page control pane
 * @childControl tool-pane {qx.ui.container.Composite} container shows the selection-tool-button and hand-tool-button
 * @childControl selection-tool-button {qx.ui.toolbar.RadioButton} chooses the text selection tool of the document in the visual-pane
 * @childControl hand-tool-button {qx.ui.toolbar.RadioButton} chooses the hand tool of the document in the visual-pane
 * @childControl search-pane {qx.ui.container.Composite} container shows the search-field and search-button
 * @childControl search-field {qx.ui.form.TextField} text to be search for in the document in the visual-pane
 * @childControl hand-tool-button {qx.ui.toolbar.Button} starts the search of the text in search-field of the document in the visual-pane
 * @childControl visual-pane {qx.ui.container.Composite} container shows the scroll pane and the flash widgets showing the document
 */
qx.Class.define("qxe.ui.control.DocumentViewer",
{
  extend : qx.ui.core.Widget,
  implement : [
    qxe.ui.control.IPageControl
  ],
  include :
  [
    qxe.ui.control.MPageControl,
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.core.MRemoteLayoutHandling,
    qx.ui.core.MContentPadding
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Constructor.
   *
   * @param source {String} the flash source
   * @param param {Map} the map of flash parameters
   * @param variables {Map} the map of flash variables
   */
  construct : function(source, param, variables)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("control-pane");
    this._createChildControl("visual-pane");

    // apply constructor parameters
    if(source)
    {
      this.setSource(source);
    }

    if(param)
    {
      this.setParam(param);
    }

    if (variables)
    {
      this.setVariables(variables);
    }

    // Register as root for the focus handler ???
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
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
      init : "document-viewer"
    },

    /** Should the whole view panel be shown */
    showControlPane :
    {
      check : "Boolean",
      init : true,
      apply : "_applyShowControlPaneChange",
      themeable : true
    },

    /** Should the print button be shown */
    printable :
    {
      check : "Boolean",
      init : true,
      apply : "_applyPrintableChange",
      themeable : true
    },

    /** Should the fit full screen button be shown */
    showFullScreen :
    {
      check : "Boolean",
      init : true,
      apply : "_applyShowFullScreenChange",
      themeable : true
    },

    /** Should the selection tool button be shown */
    useSelectionTool :
    {
      check : "Boolean",
      init : true,
      apply : "_applyUseSelectionToolChange",
      themeable : true
    },

    /*
     * The fraction used at zooming.
     */
    zoomFraction :
    {
      check : "Integer",
      init : 10
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** Original height */
    __flashHeight : null,
    /** Original width */
    __flashWidth : null,


    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    /**
     * The children container needed by the {@link qx.ui.core.MRemoteChildrenHandling}
     * mixin
     *
     * @return {qx.ui.container.Composite} The container sub widget
     */
    getChildrenContainer : function()
    {
      return this.getChildControl("visual-pane");
    },

     /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The container sub widget
     */
    _getContentPaddingTarget : function()
    {
      return this.getChildControl("pane");
    },

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
      var radioGroup;
      var widget;
      var tooltip;

      switch(id)
      {
        /*
        ---------------------------------------------------------------------------
          CREATE #1: BASE STRUCTURE
        ---------------------------------------------------------------------------
        */

        /*
        ---------------------------------------------------------------------------
          CREATE #2: PANES
        ---------------------------------------------------------------------------
        */

        case "control-pane":
          control = new qx.ui.toolbar.ToolBar();

          if(this.getPrintable())
          {
            control.add(this._createChildControl("print-button"));
          }

          control.add(this._createChildControl("fit-pane"));
          control.add(this._createChildControl("zoom-pane"));
          control.add(this._createChildControl("orientation-pane"));
          control.add(this._createChildControl("page-control-pane"));
          control.add(this._createChildControl("tool-pane"));
          control.add(this._createChildControl("search-pane"));

          this._add(control);
          break;

        case "print-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Print the document."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/document-print.png");
          control.setEnabled(false);
          control.setToolTip(tooltip);
          control.addListener("execute", this._onPrintButtonClick, this);
          break;

        case "fit-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          radioGroup = new qx.ui.form.RadioGroup();
//          radioGroup.addListener("changeSelection", this._onChangeSelection, this);

          widget = this._createChildControl("thumb-view-button");
          control.add(widget);
          radioGroup.add(widget);

          widget = this._createChildControl("fit-width-button");
          control.add(widget);
          radioGroup.add(widget);
          radioGroup.setSelection([widget]);

          widget = this._createChildControl("fit-page-button");
          control.add(widget);
          radioGroup.add(widget);

          if(this.getShowFullScreen())
          {
            widget = this._createChildControl("full-screen-button");
            control.add(widget);
            radioGroup.add(widget);
          }
          break;

        case "thumb-view-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Show thumbnails of the pages of the document."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/thumbnails.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onThumbViewButtonClick, this);
          break;

        case "fit-width-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Fit page width with viewer."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/fitwidth.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onFitWidthButtonClick, this);
          break;

        case "fit-page-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Fit page height with viewer."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/fitpage.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onFitPageButtonClick, this);
          break;

        case "full-screen-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Show document in full screen."));

          control = new qx.ui.toolbar.RadioButton(null, "icon/16/actions/view-fullscreen.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onFullScreenButtonClick, this);
          break;

        case "zoom-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          control.add(this._createChildControl("zoom-in-page"));
          control.add(this._createChildControl("zoom-page-field"));
          control.add(this._createChildControl("zoom-out-page"));
          break;

        case "zoom-in-page":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Zoom in the document."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/zoom-in.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onZoomInButtonClick, this);
          break;

        case "zoom-page-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Zoom percentage of the document."));

          control = new qx.ui.form.TextField();
          control.setTextAlign("right");
          control.setWidth(35);
          control.setAlignY("middle");
          control.setToolTip(tooltip);
          control.setFilter(/[0-9]/);
          control.addListener("changeValue", this._onZoomChangeValue, this);
          break;

        case "zoom-out-page":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Zoom out the document."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/zoom-out.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onZoomOutButtonClick, this);
          break;

        case "orientation-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          control.add(this._createChildControl("counterclockwise-button"));
          control.add(this._createChildControl("clockwise-button"));
          break;

        case "counterclockwise-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Rotate the document counterclockwise."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/object-rotate-left.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onCounterclockwiseButtonClick, this);
          break;

        case "clockwise-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Rotate the document clockwise."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/object-rotate-right.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onClockwiseButtonClick, this);
          break;

        case "page-control-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          control.add(this._createChildControl("page-control"));
          break;

        case "page-control":
          control = new qxe.ui.control.PageControl(this);
          break;

        case "tool-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          radioGroup = new qx.ui.form.RadioGroup();

          widget = this._createChildControl("pointer-selection-tool-button");
          control.add(widget);
          radioGroup.add(widget);

          if(this.getUseSelectionTool())
          {
            widget = this._createChildControl("text-selection-tool-button");
            control.add(widget);
            radioGroup.add(widget);
          }

          widget = this._createChildControl("hand-tool-button")
          control.add(widget);
          radioGroup.add(widget);
          break;

        case "pointer-selection-tool-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Use tool to point at content of document."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/pointer.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onPointerSelectionToolButtonClick, this);
          break;

        case "text-selection-tool-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Use tool to select text in document."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/textselect.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onTextSelectionToolButtonClick, this);
          break;

        case "hand-tool-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Use hand tool to maneuvre document."));

          control = new qx.ui.toolbar.RadioButton(null, "qxe/icon/ui/control/documentviewer/handtool.gif");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onHandToolButtonClick, this);
          break;

        case "search-pane":
          control = new qx.ui.toolbar.Part();
          control.setEnabled(false);
          control.add(this._createChildControl("search-field"));
          control.add(this._createChildControl("search-button"));
          break;

        case "search-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Text to be searched in document."));

          control = new qx.ui.form.TextField();
          control.setPlaceholder(this.tr("Expression"));
          control.setWidth(70);
          control.setAlignY("middle");
          control.setToolTip(tooltip);
          break;

        case "search-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Start the search of text in document."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/edit-find.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onSearchButtonClick, this);
          break;

        case "visual-pane":
          var layout = new qx.ui.layout.Grow();
          control = new qx.ui.container.Composite(layout);

          control.add(this._createChildControl("scroll-pane"));

          this._add(control, {flex: 1});
          break;

        case "scroll-pane":
          // Scroll container
          control = new qx.ui.container.Scroll();
          control.getChildControl("pane").addListener("scrollY", this._onScrollY, this);
          break;

        case "flash":
          control = new qxe.ui.embed.Flash("");
//          control.setId("flashDoc");
          control.setAllowShrinkY(false);
          control.setAllowShrinkX(false);
          control.setScale("noscale");
          control.setPlay(false);
          control.setLoop(false);
          control.setAllowScriptAccess("sameDomain");
          control.setAllowFullScreen(true);
          control.setLiveConnect(true);
//          control.setMayScript(true);
          control.setMenu(false);
          control.addListener("keyup", this._onKeyUp, this);
          control.addListener("loading", function() {
            this.debug(control.getPercentLoaded());
          }, this);
          break;

        case "initiator":
//          control = new qxe.ui.info.LoadIndicator.getInstance(this, "qxe/icon/info/loading_content.gif");
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listens to the "execute" event to print the document.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onPrintButtonClick : function(e)
    {
      this.callCustomFunction("print");
    },

    /**
     * Listens to the "execute" event to layout pages in a thumb view.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onThumbViewButtonClick : function(e)
    {
      this.callCustomFunction("showThumbnails");
    },

    /**
     * Listens to the "execute" event to fit document to width.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onFitWidthButtonClick : function(e)
    {
      var flash = this.getChildControl("flash");
      flash.setYScale(100);
      flash.setXScale(100);

      // Needed to refresh/update
      this.gotoPage(this.getCurrentPage());
    },

    /**
     * Listens to the "execute" event to fit document to whole page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onFitPageButtonClick : function(e)
    {
      var flash = this.getChildControl("flash");
      var pane = this.getChildControl("scroll-pane");

//      pane.setBackgroundColor("red");

      if(this.__flashHeight == null)
      {
        this.__flashHeight = flash.getFlashHeight();
        this.__flashWidth = flash.getFlashWidth();
      }

      var ratio = 100 * pane.getHeight()/this.__flashHeight;
      flash.setYScale(ratio);
      flash.setXScale(ratio);

      // Change pane size
//      pane.setHeight(pane.getHeight());
//      pane.setWidth(Math.floor(ratio/100 * this.__flashWidth));

      // Needed to refresh/update
      this.gotoPage(this.getCurrentPage());
    },

    /**
     * Listens to the "execute" event to change to full screen mode.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onFullScreenButtonClick : function(e)
    {
      this.callCustomFunction("showFullScreen");
    },

    /**
     * Listens to the "execute" event to change to zoom in page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onZoomInButtonClick : function(e)
    {
      this.getChildControl("flash").zoom(100 - this.getZoomFraction());
// change height and width of the pane
    },

    /**
     * Listens to the "execute" event to change to zoom page in or out.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onZoomChangeValue : function(e)
    {
      var flash = this.getChildControl("flash");
 
      // Relative change in percent: 50% -> doubles the size, 200% -> halfs the size
      this.zoom(e.getData());
    },

    /**
     * Listens to the "execute" event to change to zoom out page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onZoomOutButtonClick : function(e)
    {
      this.getChildControl("flash").zoom(100 + this.getZoomFraction());
    },

    /**
     * Listens to the "execute" event to change to clockwise rotate page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onClockwiseButtonClick : function(e)
    {
      var flash = this.getChildControl("flash");
      flash.setRotation(flash.getRotation() + 90);
    },

    /**
     * Listens to the "execute" event to change to counter clockwise rotate page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onCounterclockwiseButtonClick : function(e)
    {
      var flash = this.getChildControl("flash");
      flash.setRotation(flash.getRotation() - 90);
    },

    /**
     * Listens to the "execute" event to change to select pointer cursor.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onPointerSelectionToolButtonClick : function(e)
    {
      this.callCustomFunction("setPointerCursor");
    },

    /**
     * Listens to the "execute" event to change to select text selection cursor.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onTextSelectionToolButtonClick : function(e)
    {
      this.callCustomFunction("setTextCursor");
    },

    /**
     * Listens to the "execute" event to change to select hand tool cursor.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onHandToolButtonClick : function(e)
    {
      this.callCustomFunction("setHandCursor");
    },

    /**
     * Listens to the "execute" event to change to search within document.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onSearchButtonClick : function(e)
    {
      this.callCustomFunction("search");
    },

    /**
     * @todo Show user dialog with error message. Negative is that it will be bound to another class.
     */
    callCustomFunction : function(func)
    {
      var flash = this.getChildControl("flash");

      if(flash.isLoaded())
      {
        var flashFE = flash.getFlashElement();

        if(flashFE[func])
        {
          // Calling a custom flash method over ExternalInterface
          flashFE[func]();
        }
        else
        {
          this.debug("The " + func + " function can not be called or is not supported for the flash file.");
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      ACTION EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listens to the "loaded" event sent when the flash has been fully loaded.
     *
     * @param e {qx.event.type.Event} loaded event
     */
    _onTimeout : function(e)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        this.debug("Flash has timed out.");
      }

//      this.getChildControl("initiator").terminate();
    },

    /**
     * Listens to the "timeout" event sent when loading of the flash has timed out.
     *
     * @param e {qx.event.type.Event} timeout event
     */
    _onLoaded : function(e)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        this.debug("Flash has been loaded.");
      }

      var flash = this.getChildControl("flash");

      // Set height and width so we get scrollbars
      flash.setWidth(flash.getFlashWidth());
      flash.setHeight(flash.getFlashHeight());

      var xScale = flash.getXScale();
      var yScale = flash.getYScale();

      this.getChildControl("zoom-page-field").setValue("" + ((xScale + yScale)/2));

      this.enableAll();

      var pageControl = this.getChildControl("page-control");
      pageControl.getChildControl("current-page-field").setValue("" + this.getCurrentPage());
      pageControl.getChildControl("num-pages-field").setValue("" + this.getTotalPages());

      this.setScrolledAll(false);

//      this.getChildControl("initiator").terminate();
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    zoom : function(zoomValue)
    {
/*      // Relative change in percent: 50% -> doubles the size, 200% -> halfs the size
        var zoomValue = 100 + this.getZoomFraction();
        this.zoom(zoomValue);

        this.getChildControl("zoom-page-field").setValue("" + zoomValue);
*/    },

    /**
     * Go to page in the document.
     *
     * @param absolutePage {Number} page number
     */
    gotoPage : function(absolutePage)
    {
      var totalPages = this.getTotalPages();
 
      if(absolutePage >= 1 && absolutePage <= totalPages)
      {
        this.getChildControl("flash").gotoFrame(absolutePage - 1);

        this.getChildControl("page-control").getChildControl("current-page-field").setValue("" + absolutePage);
      }
      else
      {
        this.debug("Page " + (absolutePage - 1) + " is outside page range.");
      }
    },

    /**
     * Enable all controllers.
     */
    enableAll : function()
    {
      this.getChildControl("print-button").setEnabled(true);
      this.getChildControl("fit-pane").setEnabled(true);
      this.getChildControl("zoom-pane").setEnabled(true);
      this.getChildControl("orientation-pane").setEnabled(true);
      this.getChildControl("page-control").setEnabled(true);
      this.getChildControl("tool-pane").setEnabled(true);
      this.getChildControl("search-pane").setEnabled(true);
    },

    /*
    ---------------------------------------------------------------------------
      FLASH JAVASCRIPT METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Go to page in the document.
     *
     */
    getFlashElement : function()
    {
      return this.getChildControl("flash").getFlashElement();
    },

    getSource : function()
    {
      return this.getChildControl("flash").getSource();
    },

    setSource : function(source)
    {
//      this.getChildControl("initiator");

      // If not created, create it now.
      var flash = this.getChildControl("flash");

      flash.setSource(source);
      flash.addListenerOnce("loaded", this._onLoaded, this);
      flash.addListenerOnce("timeout", this._onTimeout, this);

      // Add after source has been set. Can not change source after adding to the DOM tree.
      var flashS = this.getChildControl("scroll-pane");
      var children = flashS.getChildren();

      if(children.length)
      {
        flashS.remove(children[0]);
      }

      flashS.add(flash);
    },

    setParam : function(param)
    {
//      this.getChildControl("flash").getContentElement().setParam(param);
    },

    setVariables : function(variables)
    {
//      this.getChildControl("flash").setVariables(variables);
    },

    /*
     * Get the current page of the document.
     *
     * @return {Number} current page
     */
    getCurrentPage : function()
    {
      return this.getChildControl("flash").getCurrentFrame();
    },

    /*
     * Get the total number of pages of the document.
     *
     * @return {Number} total number of pages
     */
    getTotalPages : function()
    {
      return this.getChildControl("flash").getTotalFrames();
    },

    /*
     * twips = 1440 units per inch, 72 points per inch -> x20 = twips
     */
    zoomRectangle : function(left, top, right, bottom)
    {
/*      var flash = this.getChildControl("flash");

      if(flash.isLoaded())
      {
        var pointsToTwips = 20;

        this.setZoomRect(left * pointsToTwips, top * pointsToTwips, right * pointsToTwips, bottom * pointsToTwips);
      }
*/    },

    panPage : function(x, y, mode)
    {
/*      var flash = this.getChildControl("flash");

      if(flash.isLoaded())
      {
        this.pan(x, y, mode)
      }
*/    }
  }
});

