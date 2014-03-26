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
 * An accordion is a multi page view where one or more page is visible
 * at each moment. It is possible to switch the pages using the
 * caption bars rendered by each pane.
 *
 * http://www.siteexperts.com/tips/html/ts14/demo/default.htm
 *
 * @childControl bar {qx.ui.container.SlideBar} slidebar for all tab buttons
 * @childControl pane {qx.ui.container.Stack} stack container to show one tab page
 */
qx.Class.define("qxe.ui.container.Accordion",
{
  extend : qx.ui.core.Widget,
  implement : qx.ui.core.ISingleSelection,
  include : qx.ui.core.MContentPadding,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param orientation {String} The orientation of the accordion View control.
   * Allowed values are "horizontal" (default) and "vertical".
   */
  construct : function(orientation)
  {
    this.base(arguments);

    this._createChildControl("pane");

    // Create manager
    var mgr = this.__radioGroup = new qx.ui.form.RadioGroup;
    mgr.setWrap(false);
    mgr.addListener("changeSelection", this._onChangeSelection, this);

    // Initialize orientation
    if (orientation) {
      this.setOrientation(orientation);
    } else {
      this.initOrientation();
    }
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fires after the selection was modified */
    "changeSelection" : "qx.event.type.Data"
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

    /**
     * The orientation of the accordion View control.
     */
    orientation :
    {
      check : [ "barBottom", "barLeft", "barTop", "barRight" ],
      init  : "barTop",
      apply : "_applyOrientation"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** {qx.ui.form.RadioGroup} instance containing the radio group */
    __radioGroup : null,


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
        case "pane":
          var layout;

          if(qx.util.Validate.inArray(["barBottom", "barTop"])(this.getOrientation()))
          {
            layout = qx.ui.layout.VBox();
          }
          else
          {
            layout = qx.ui.layout.HBox();
          }

          control = new qx.ui.container.SlideBar(layout);

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
/*    _getContentPaddingTarget : function() {
      return this.getChildControl("pane");
    },
*/

    /*
    ---------------------------------------------------------------------------
      CHILDREN HANDLING
    ---------------------------------------------------------------------------
    */


    /**
     * Adds a page to the accordion including its needed button
     * (contained in the page).
     *
     * @param page {qxe.ui.form.TitlePane} The page which should be added.
     */
    add : function(pane)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(page instanceof qxe.ui.form.TitlePane)) {
          throw new Error("Incompatible child for accordion: " + page);
        }
      }

      pane.collapse();

      this.getChildControl("pane").add(pane);

      // Register pane
      this.__radioGroup.add(pane);

      // Add state to pane
      pane.setOrientation(this.getOrientation());
    },

    /**
     * Removes a page (and its corresponding button) from the accordion View.
     *
     * @param page {qx.ui.form.TitlePane} The page to be removed.
     */
    remove : function(pane)
    {
      var pane = this.getChildControl("pane");
      var children = pane.getChildren();

      // Try to select next page
      if (this.getSelection()[0] == page)
      {
        var index = children.indexOf(page);
        if (index == 0)
        {
          if (children[1]) {
            this.setSelection([children[1]]);
          } else {
            this.resetSelection();
          }
        }
        else
        {
          this.setSelection([children[index-1]]);
        }
      }

      // Remove the button from the radio group
      this.__radioGroup.remove(pane);
    },

    /**
     * Returns accordion View's children widgets.
     *
     * @return {qx.ui.accordion.Page[]} List of children.
     */
    getChildren : function() {
      return this.getChildControl("pane").getChildren();
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /** {Map} Maps the bar orientation to an appearance state */
    __barOrientationToState : null,
    __isHorizontal : null,

    /**
     * Apply method for the placeBarOnTop-Property.
     *
     * Passes the desired value to the layout of the accordion View so
     * that the layout can handle it.
     * It also sets the states to all buttons so they know the
     * position of the bar.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyOrientation : function(value, old)
    {
      var bar = this.getChildControl("bar");

      var horizontal = value == "left" || value == "right";

      var layoutClass = horizontal ? qx.ui.layout.HBox : qx.ui.layout.VBox;

      var layout = this._getLayout();
      if (layout && layout instanceof layoutClass) {
        // pass
      } else {
        this._setLayout(layout = new layoutClass);
      }

      // Sync orientation to bar
      bar.setOrientation(horizontal ? "vertical" : "horizontal");

      // Read children
      var children = this.getChildren();

      // Toggle state to bar
      if (old)
      {
        // Update bar
        bar.removeState(old);

        // Update pages
        for (var i=0, l=children.length; i<l; i++) {
          children[i].removeState(old);
					children[i].getChildControl("button").removeState(old);
        }
      }

      if (value)
      {
        // Update bar
        bar.addState(value);

        // Update pages
        for (var i=0, l=children.length; i<l; i++) {
          children[i].addState(value);
					children[i].getChildControl("button").addState(value);
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      SELECTION API
    ---------------------------------------------------------------------------
    */

    /**
     * Returns an array of currently selected items.
     *
     * Note: The result is only a set of selected items, so the order can
     * differ from the sequence in which the items were added.
     *
     * @return {qx.ui.accordion.Page[]} List of items.
     */
    getSelection : function() {
      var buttons = this.__radioGroup.getSelection();
      var result = [];

      for (var i = 0; i < buttons.length; i++) {
        result.push(buttons[i].getUserData("page"));
      }

      return result;
    },

    /**
     * Replaces current selection with the given items.
     *
     * @param items {qx.ui.accordion.Page[]} Items to select.
     * @throws an exception if one of the items is not a child element and if
     *    items contains more than one elements.
     */
    setSelection : function(items) {
      var buttons = [];

      for (var i = 0; i < items.length; i++) {
        buttons.push(items[i].getChildControl("button"));
      }
      this.__radioGroup.setSelection(buttons);
    },

    /**
     * Clears the whole selection at once.
     */
    resetSelection : function() {
      this.__radioGroup.resetSelection();
    },

    /**
     * Detects whether the given item is currently selected.
     *
     * @param item {qx.ui.accordion.Page} Any valid selectable item.
     * @return {Boolean} Whether the item is selected.
     * @throws an exception if one of the items is not a child element.
     */
    isSelected : function(item) {
      var button = item.getChildControl("button");
      return this.__radioGroup.isSelected(button);
    },

    /**
     * Whether the selection is empty.
     *
     * @return {Boolean} Whether the selection is empty.
     */
    isSelectionEmpty : function() {
      return this.__radioGroup.isSelectionEmpty();
    },

    /**
     * Returns all elements which are selectable.
     *
     * @return {qx.ui.accordion.Page[]} The contained items.
     */
    getSelectables: function() {
      var buttons = this.__radioGroup.getSelectables();
      var result = [];

      for (var i = 0; i <buttons.length; i++) {
        result.push(buttons[i].getUserData("page"));
      }

      return result;
    },

    /**
     * Event handler for <code>changeSelection</code>.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onChangeSelection : function(e)
    {
      var pane = this.getChildControl("pane");
      var button = e.getData()[0];

      if (button)
      {
        pane.setSelection([button.getUserData("page")]);
        button.focus();
        this.scrollChildIntoView(button, null, null, false);
      }
      else
      {
        pane.resetSelection();
      }

      var value = pane.getSelection();
      var old = e.getOldData();

      this.fireDataEvent("changeSelection", value, old);
    },

    /**
     * Event handler for <code>beforeChangeSelection</code>.
     *
     * @param e {qx.event.type.Event} Data event.
     */
    _onBeforeChangeSelection : function(e)
    {
      if (!this.fireNonBubblingEvent("beforeChangeSelection",
          qx.event.type.Event, [false, true])) {
        e.preventDefault();
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for the change of the selected item of the radio group.
     * @param e {qx.event.type.Data} The data event
     */
    _onRadioChangeSelection : function(e) {
      var element = e.getData()[0];
      if (element) {
        this.setSelection([element.getUserData("page")]);
      } else {
        this.resetSelection();
      }
    },


    /**
     * Removes the Page widget on which the close button was clicked.
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onPageClose : function(e) {
      this.remove(e.getTarget());
    }

//collapseAll
//expandAll
//togglePane
// multiselect (many open) or uniselect (one open) of title panes
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */


  destruct : function() {
    this._disposeObjects("__radioGroup");
  }
});
