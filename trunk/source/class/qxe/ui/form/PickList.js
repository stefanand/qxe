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

  TODO:
    - prevent moving from and to the same list
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


    /*
    ---------------------------------------------------------------------------
      INTERNAL
    ---------------------------------------------------------------------------
    */

    /**
     * Move items from source to target list.
     * 
     * @param source {qx.ui.for.List} the source list
     * @param target {qx.ui.for.List} the target list
     */
    _moveItems : function(source, target)
    {
      if(!source.isSelectionEmpty())
      {
        var selection = source.getSelection();

        for (var i = 0, l = selection.length; i < l; i++)
        {
          source.remove(selection[i]);
          target.add(selection[i]);
        }
      }
      else
      {
        this.debug("No items selected.");
      }
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

this.debug(e.getRelatedTarget() + "     " + e.getOriginalTarget());
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
      if (!e.supportsType("items"))
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
     * Add items to source list.
     * 
     * @param item {qx.ui.core.Widget} item to add too source list.
     */
    add : function(item)
    {
      this.getChildControl("source-list").add(item);
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
  }
});
