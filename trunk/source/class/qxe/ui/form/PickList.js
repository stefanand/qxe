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

  TODO:
    - sort list by getSortedSelection()

************************************************************************ */

/**
 *
 * @asset(qxe/icon/ui/form/move-right.png)
 * @asset(qxe/icon/ui/form/move-left.png)
 * @asset(qxe/icon/ui/form/move-all-right.png)
 * @asset(qxe/icon/ui/form/move-all-left.png)
 *
 */

/**
 * A twin multiple select box control to select items.
 */
qx.Class.define("qxe.ui.form.PickList",
{
  extend : qx.ui.core.Widget,


  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */

  /**
   *
   */
  construct : function(label)
  {
    this.base(arguments);


    if(label != null)
    {
      this.setLabel(label);
    }

    // configure internal layout
    this._setLayout(new qx.ui.layout.HBox());

    this._createChildControl("source-pane");
    this._createChildControl("control-pane");
    this._createChildControl("target-pane");
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
      init : "pick-list"
    },

    /** List label */
    label :
    {
      check : "String",
      event : "changeLabel",
      nullable : true
    },

    /** List sort order
     * "none"       - don't sort at all
     * "original"   - keep the initial add/remove order before move
     *                from one list to the other
     * "ascending"  - sort alphabetically ascending
     * "descending" - sort alphabetically descending
     */
    sortOrder :
    {
      check : [ "none", "original", "ascending", "descending" ],
      init : "none",
      nullable : false,
      apply : "_applySortOrder"
    }
  },


  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  members :
  {
	/**
	 * Hash codes of objects added in source list to store original
	 * order of children.
	 */
    __list : [],

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
      var layout;
      var tooltip;

      switch(id)
      {
        case "source-pane" :
          layout = new qx.ui.layout.VBox();
          control = new qx.ui.container.Composite(layout);

          control.add(this._createChildControl("source-label"));
          control.add(this._createChildControl("source-list"));

          this._add(control);
          break;

        case "source-label" :
          control = new qx.ui.basic.Label(this.getLabel());
          control.setAlignX("center");
          break;

        case "source-list" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Source list."));

          control = new qx.ui.form.List();
          control.setToolTip(tooltip);
          control.setDraggable(true);
          control.setDroppable(true);
          control.setSelectionMode("multi");
          control.addListener("dragstart", this._onDragStart);
          control.addListener("droprequest", this._onDropRequest);
          control.addListener("drop", this._onDrop);
          control.addListener("dragover", this._onDragOver);
          control.addListener("addItem", this.__onAddItem, this);
          control.addListener("removeItem", this.__onRemoveItem, this);
          break;

        case "control-pane" :
          layout = new qx.ui.layout.VBox(5, "middle");

          control = new qx.ui.container.Composite(layout);
          control.setMargin(0, 5, 0, 5);

          control.add(this._createChildControl("add-button"));
          control.add(this._createChildControl("remove-button"));
          control.add(new qx.ui.core.Spacer());
          control.add(this._createChildControl("add-all-button"));
          control.add(this._createChildControl("remove-all-button"));

          this._add(control);
          break;

        case "add-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Add item."));

          control = new qx.ui.form.Button(null, "qxe/icon/ui/form/move-right.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onAddButtonClick, this);
          break;

        case "remove-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Remove item."));

          control = new qx.ui.form.Button(null, "qxe/icon/ui/form/move-left.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onRemoveButtonClick, this);
          break;

        case "add-all-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Add all items."));

          control = new qx.ui.form.Button(null, "qxe/icon/ui/form/move-all-right.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onAddAllButtonClick, this);
          break;

        case "remove-all-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Remove all items."));

          control = new qx.ui.form.Button(null, "qxe/icon/ui/form/move-all-left.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onRemoveAllButtonClick, this);
          break;

        case "target-pane" :
          layout = new qx.ui.layout.VBox();
          control = new qx.ui.container.Composite(layout);

          control.add(this._createChildControl("target-label"));
          control.add(this._createChildControl("target-list"));

          this._add(control);
          break;

        case "target-label" :
          control = new qx.ui.basic.Label(this.tr("Selected"));
          control.setAlignX("center");
          break;

        case "target-list" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Target list."));

          control = new qx.ui.form.List();
          control.setToolTip(tooltip);
          control.setDraggable(true);
          control.setDroppable(true);
          control.setSelectionMode("multi");
          control.addListener("dragstart", this._onDragStart);
          control.addListener("droprequest", this._onDropRequest);
          control.addListener("drop", this._onDrop);
          control.addListener("dragover", this._onDragOver);
          control.addListener("addItem", this.__onAddItem, this);
          control.addListener("removeItem", this.__onRemoveItem, this);
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * Apply new sort order by sorting both source and target lists.
     */
    _applySortOrder : function(value, old)
    {
      this._sort(this.getChildControl("source-list"));
      this._sort(this.getChildControl("target-list"));
    },


    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * Add selected items from source to target list.
     * 
     * @param e {qx.event.type.Event} the event data
     */
    _onAddButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      this._moveItems(source, target);
    },

    /**
     * Remove selected items from target to source list.
     * 
     * @param e {qx.event.type.Event} the event data
     */
    _onRemoveButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      this._moveItems(target, source);
    },

    /**
     * Add all items from source to target list.
     * 
     * @param e {qx.event.type.Event} the event data
     */
    _onAddAllButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      source.selectAll();

      this._moveItems(source, target);
    },

    /**
     * Remove all items from target to source list.
     * 
     * @param e {qx.event.type.Event} the event data
     */
    _onRemoveAllButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      target.selectAll();

      this._moveItems(target, source);
    },

    /**
     * Event addItem from any of the lists.
     * Separate listeners if lists are manipulated outside this API.
     * 
     * @param e {qx.event.type.Data} event data
     */
    __onAddItem : function(e)
    {
      this.__list.push(e.getData().toHashCode());
    },

    /**
     * Event removeItem from any of the lists.
     * Separate listeners if lists are manipulated outside this API.
     * 
     * @param e {qx.event.type.Data} event data
     */
    __onRemoveItem : function(e)
    {
      var index = this.__list.indexOf(e.getData().toHashCode());

      if(index > -1)
      {
        this.__list.splice(index, 1);
      }
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL
    ---------------------------------------------------------------------------
    */

    /**
     * Move items from source to target list.
     * 
     * @param source {qx.ui.form.List} the source list
     * @param target {qx.ui.form.List} the target list
     */
    _moveItems : function(source, target)
    {
      if(!source.isSelectionEmpty())
      {
    	// Add the source list items selected to target list
        var selection = source.getSelection();

        for (var i = 0, l = selection.length; i < l; i++)
        {
          source.remove(selection[i]);
          target.add(selection[i]);
        }

        // Sort target list according to sort method
        var sortedList = this._sort(target);

        // Add the sorted list
        if(sortedList != null)
        {
          target.removeAll();

          for (var i = 0, l = sortedList.length; i < l; i++)
          {
            target.add(sortedList[i]);
          }
        }
      }
      else
      {
        this.debug("No items selected.");
      }
    },

    /**
     * Sorts according to sortOrder.
     * 
     * @param list {qx.ui.form.List} the list to be sorted
     * @return {qx.ui.core.Widget[]} the sorted list
     */
    _sort : function(list)
    {
      var sortOrder = this.getSortOrder();
      var children = list.getChildren();
      var sel = qx.lang.Object.getValues(children);

      sel.sort(function(a, b) {
        switch(sortOrder)
        {
          case "none":
            return 0;

          case "original":
            return children.indexOf(a) - this.__list.indexOf(b);

          case "ascending":
            return children.indexOf(a) - children.indexOf(b);

          case "descending":
            return children.indexOf(b) - children.indexOf(a);
        }
      });

      return sel;
    },


    /*
    ---------------------------------------------------------------------------
      DRAG & DROP SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for own <code>dragstart</code> event.
     *
     * @param e {qx.event.type.Drag} Drag event
     */
    _onDragStart : function(e)
    {
      // Register supported types
      e.addType("items");

      // Register supported actions
      e.addAction("move");
    },

    /**
     * Event listener for own <code>droprequest</code> event.
     *
     * @param e {qx.event.type.Drag} Drag event
     */
    _onDropRequest : function(e)
    {
      this.debug("Related of droprequest: " + e.getRelatedTarget());

      var type = e.getCurrentType();

      if(type == "items")
      {
        // Add data to manager
        e.addData(type, this.getSelection());
      }
    },

    /**
     * Event listener for own <code>drop</code> event.
     *
     * @param e {qx.event.type.Drag} Drag event
     */
    _onDrop : function(e)
    {
      this.debug("Related of drop: " + e.getRelatedTarget());

      // Move items from source to target
      var items = e.getData("items");

      for (var i=0, l=items.length; i<l; i++)
      {
        this.add(items[i]);
      }
    },

    /**
     * Event listener for own <code>dragover</code> event.
     *
     * @param e {qx.event.type.Drag} Drag event
     */
    _onDragOver : function(e)
    {
      // Stop if coming from inside the same list
      // or does not support type "items"
      if(!e.getRelatedTarget() || !e.supportsType("items"))
      {
        e.preventDefault();
      }
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Add item to source list.
     * 
     * @param item {qx.ui.core.Widget} item to add too source list.
     */
    add : function(item)
    {
      this.getChildControl("source-list").add(item);
    },

    /**
     * Remove item from source list.
     * 
     * @param item {qx.ui.core.Widget} item to remove from source list.
     */
    remove : function(item)
    {
      this.getChildControl("source-list").remove(item);
    },

    /**
     * Get the selected items.
     * 
     * @return {qx.ui.core.Widget[]} the selected items
     */
    getSelection : function()
    {
      return this.getChildControl("target-list").getSelection();
    }
  },


  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

   destruct : function() {
     this._disposeArray("__list");
   }
});
