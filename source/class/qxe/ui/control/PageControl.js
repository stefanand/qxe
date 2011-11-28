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

#asset(qx/icon/${qx.icontheme}/16/actions/go-first.png)
#asset(qx/icon/${qx.icontheme}/16/actions/go-previous.png)
#asset(qx/icon/${qx.icontheme}/16/actions/go-next.png)
#asset(qx/icon/${qx.icontheme}/16/actions/go-last.png)

************************************************************************ */

/**
 * A page control pane to control the scrolling between pages.
 *
 * @childControl control-pane {qx.ui.container.Composite} a pane of all page control widgets.
 * @childControl first-page-button {qx.ui.form.Button} go to first page button
 * @childControl previous-page-button {qx.ui.form.Button} go to previous page button
 * @childControl current-page-field {qx.ui.form.TextField} the current page field
 * @childControl num-pages-field {qx.ui.form.TextField} the total number of pages field
 * @childControl next-page-button {qx.ui.form.Button} go to next page button
 * @childControl last-page-button {qx.ui.form.Button} go to last page button
 */
qx.Class.define("qxe.ui.control.PageControl",
{
  extend : qx.ui.core.Widget,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(pageContainer)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.Canvas());

    this._createChildControl("control-pane");

    this.__pageContainer = pageContainer || this.getLayoutParent();
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
      init : "page-control"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** The container class where this widget is added. */
    __pageContainer : null,

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
      var tooltip;

      switch(id)
      {
        case "control-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          control.add(this._createChildControl("first-page-button"));
          control.add(this._createChildControl("previous-page-button"));
          control.add(this._createChildControl("current-page-field"));

          var dash = new qx.ui.basic.Label("/");
          dash.setAlignY("middle");
          dash.setMarginLeft(2);
          dash.setMarginRight(2);

          control.add(dash);
          control.add(this._createChildControl("num-pages-field"));
          control.add(this._createChildControl("next-page-button"));
          control.add(this._createChildControl("last-page-button"));

          this._add(control);
          break;

        case "first-page-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to first page."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/go-first.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onFirstPageButtonClick, this);
          break;

        case "previous-page-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to previous page."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/go-previous.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onPreviousPageButtonClick, this);
          break;

        case "current-page-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Current page number."));

          control = new qx.ui.form.TextField();
          control.setTextAlign("right");
          control.setWidth(35);
          control.setAlignY("middle");
          control.setToolTip(tooltip);
          control.setFilter(/[0-9]/);
          control.addListener("changeValue", this._onGotoPageChangeValue, this);
          break;

        case "num-pages-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Total number of pages."));

          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.setKeepFocus(true);
          control.setTextAlign("right");
          control.setReadOnly(true);
          control.setWidth(35);
          control.setAlignY("middle");
          control.setToolTip(tooltip);

          control.setValue(this.__pageContainer.getNumPages());
          break;

        case "next-page-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to next page."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/go-next.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onNextPageButtonClick, this);
          break;

        case "last-page-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to last page."));

          control = new qx.ui.toolbar.Button(null, "icon/16/actions/go-last.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onLastPageButtonClick, this);
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      EVENTS FOR VIEW PANEL BUTTONS
    ---------------------------------------------------------------------------
    */

    /**
     * Listens to the "execute" event to scroll to first page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onFirstPageButtonClick : function(e)
    {
      this.__pageContainer.gotoPage(1);

      this.checkEnable();
    },

    /**
     * Listens to the "execute" event to scroll to previous page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onPreviousPageButtonClick : function(e)
    {
      var pageContainer = this.__pageContainer;

      if(pageContainer.getCurrentPage() > 1)
      {
        pageContainer.gotoRelativePage(-1);
      }

      this.checkEnable();
    },

    _onGotoPageChangeValue : function(e)
    {
      var newPage = e.getData();
      var pageContainer = this.__pageContainer;

      if(newPage >= 1 && newPage <= pageContainer.getNumPages() && newPage != pageContainer.getCurrentPage())
      {
        pageContainer.gotoPage(newPage);
        this.checkEnable();
      }
    },

    /**
     * Listens to the "execute" event to scroll to next page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onNextPageButtonClick : function(e)
    {
      var pageContainer = this.__pageContainer;

      if(pageContainer.getCurrentPage() < pageContainer.getNumPages())
      {
        pageContainer.gotoRelativePage(1);
      }

      this.checkEnable();
    },

    /**
     * Listens to the "execute" event to scroll to last page.
     *
     * @param e {qx.event.type.Execute} execute event
     */
    _onLastPageButtonClick : function(e)
    {
      var pageContainer = this.__pageContainer;
      pageContainer.gotoPage(pageContainer.getNumPages());

      this.checkEnable();
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Check the enable state for the buttons.
     */
    checkEnable : function()
    {
      var pageContainer = this.__pageContainer;
      var currentPage = pageContainer.getCurrentPage();

      if(currentPage == 1)
      {
        this.getChildControl("first-page-button").setEnabled(false);
        this.getChildControl("previous-page-button").setEnabled(false);
      }
      else
      {
        this.getChildControl("first-page-button").setEnabled(true);
        this.getChildControl("previous-page-button").setEnabled(true);
      }

      if(currentPage == pageContainer.getNumPages())
      {
        this.getChildControl("last-page-button").setEnabled(false);
        this.getChildControl("next-page-button").setEnabled(false);
      }
      else
      {
        this.getChildControl("last-page-button").setEnabled(true);
        this.getChildControl("next-page-button").setEnabled(true);
      }
    }
  }
});

