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
 * An accordion is a multi-pane view where one or more pane is visible
 * at each moment. It is possible to switch the panes by clicking on the
 * caption bars rendered by each pane.
 *
 * The Outlook Category Bar can be rendered as in:
 *   http://www.siteexperts.com/tips/html/ts14/demo/default.htm
 *
 * @childControl bar {qx.ui.container.SlideBar} slidebar for all tab buttons
 * @childControl pane {qx.ui.container.Stack} stack container to show one tab page
 */
//collapseAll
//expandAll
//togglePane
// multiselect (many open) or uniselect (one open) of title panes
// which panel is active/expanded? one or more!

/*
 * When focus is on a header, the following key commands are available:

    UP/LEFT - Move focus to the previous header. If on first header, moves focus to last header.
    DOWN/RIGHT - Move focus to the next header. If on last header, moves focus to first header.
    HOME - Move focus to the first header.
    END - Move focus to the last header.
    SPACE/ENTER - Activate panel associated with focused header.
    
   When focus is in a panel:

    CTRL+UP: Move focus to associated header.
*/
qx.Class.define("qxe.ui.container.Accordion",
{
  extend : qx.ui.core.scroll.AbstractScrollArea,
  implement : [
    qx.ui.core.IMultiSelection,
    qx.ui.form.IForm,
    qx.ui.form.IModelSelection
  ],
  include : [
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.core.MMultiSelectionHandling,
    qx.ui.form.MForm,
    qx.ui.form.MModelSelection
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param orientation {String} The orientation of the accordion widget.
   *                             Allowed values are "barBottom", "barLeft", "barTop"
   *                             and "barRight".
   */
  construct : function(orientation)
  {
    this.base(arguments);

    // Create content
    var content = this.__content = this._createListItemContainer();

    // Used to fire item add/remove events
    content.addListener("addChildWidget", this._onAddChild, this);
    content.addListener("removeChildWidget", this._onRemoveChild, this);

    // Add to scrollpane
    this.getChildControl("pane").add(content);

    // Apply orientation
    if (orientation != null)
    {
      this.setOrientation(orientation);
    }
    else
    {
      this.initOrientation();
    }

    // Add keypress listener
    this.addListener("keypress", this._onKeyPress);
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * This event is fired after a list item was added to the list. The
     * {@link qx.event.type.Data#getData} method of the event returns the
     * added item.
     */
    addItem : "qx.event.type.Data",

    /**
     * This event is fired after a list item has been removed from the list.
     * The {@link qx.event.type.Data#getData} method of the event returns the
     * removed item.
     */
    removeItem : "qx.event.type.Data"
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
      init : "accordion"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },

    /**
     * The orientation of the accordion View control.
     */
    orientation :
    {
      check : [ "barBottom", "barLeft", "barTop", "barRight" ],
      init  : "barTop",
      apply : "_applyOrientation"
    }
// collapsible
// collapsed bars moved to the end of the container? like in outlook..
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** @type {qx.ui.core.Widget} The children container */
    __content : null,

    /** @type {Class} Pointer to the selection manager to use */
    SELECTION_MANAGER : qx.ui.core.selection.ScrollArea,


    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    getChildrenContainer : function() {
      return this.__content;
    },

    /**
     * Handle child widget adds on the content pane
     *
     * @param e {qx.event.type.Data} the event instance
     */
    _onAddChild : function(e) {
      this.fireDataEvent("addItem", e.getData());
    },

    /**
     * Handle child widget removes on the content pane
     *
     * @param e {qx.event.type.Data} the event instance
     */
    _onRemoveChild : function(e) {
      this.fireDataEvent("removeItem", e.getData());
    },


    /*
    ---------------------------------------------------------------------------
      PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Used to route external <code>keypress</code> events to the list
     * handling (in fact the manager of the list)
     *
     * @param e {qx.event.type.KeySequence} KeyPress event
     */
    handleKeyPress : function(e)
    {
      if (!this._onKeyPress(e)) {
        this._getManager().handleKeyPress(e);
      }
    },


    /*
    ---------------------------------------------------------------------------
      PROTECTED API
    ---------------------------------------------------------------------------
    */

    /**
     * This container holds the list item widgets.
     *
     * @return {qx.ui.container.Composite} Container for the list item widgets
     */
    _createListItemContainer : function() {
      return new qx.ui.container.Composite;
    },

    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyOrientation : function(value, old)
    {
      // Create new layout
      var horizontal = value === "barLeft" || value === "barRight";
      var layout = horizontal ? new qx.ui.layout.HBox() : new qx.ui.layout.VBox();

      // Configure content
      var content = this.__content;
      content.setLayout(layout);
      content.setAllowGrowX(!horizontal);
      content.setAllowGrowY(horizontal);
    },

    
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for <code>keypress</code> events.
     *
     * @param e {qx.event.type.KeySequence} KeyPress event
     * @return {Boolean} Whether the event was processed
     */
    _onKeyPress : function(e)
    {
      // Execute action on press <ENTER>
      if (e.getKeyIdentifier() == "Enter" && !e.isAltPressed())
      {
        var items = this.getSelection();
        for (var i=0; i<items.length; i++) {
          items[i].fireEvent("action");
        }

        return true;
      }

      return false;
    }
  },


  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

   destruct : function() {
     this._disposeObjects("__content");
   }
});
