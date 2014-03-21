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
  construct : function()
  {
    this.base(arguments);

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
    }
    },


  /*
   *****************************************************************************
      CONSTRUCTOR
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
          control = new qx.ui.basic.Label();
          break;

        case "source-list" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Source list."));

          control = new qx.ui.form.List();
          control.setToolTip(tooltip);
          control.setDraggable(true);
          control.setSelectionMode("multi");
          control.addListener("dragstart", this._onDragStart);
          control.addListener("droprequest", this._onDropRequest);
          break;

        case "control-pane" :
          layout = new qx.ui.layout.VBox();

          control = new qx.ui.container.Composite(layout);

          control.add(this._createChildControl("add-button"));
          control.add(this._createChildControl("remove-button"));
          control.add(this._createChildControl("add-all-button"));
          control.add(this._createChildControl("remove-all-button"));

          this._add(control);
          break;

        case "add-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Add item."));

          control = new qx.ui.form.Button(null, "icon/ui/form/move-right.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onAddButtonClick, this);
          break;

        case "remove-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Remove item."));

          control = new qx.ui.form.Button(null, "icon/ui/form/move-left.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onRemoveButtonClick, this);
          break;

        case "add-all-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Add all items."));

          control = new qx.ui.form.Button(null, "icon/ui/form/move-all-right.png");
          control.setToolTip(tooltip);
          control.addListener("execute", this._onRemoveAllButtonClick, this);
          break;

        case "remove-all-button" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Remove all items."));

          control = new qx.ui.form.Button(null, "icon/ui/form/move-all-left.png");
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
          control = new qx.ui.basic.Label();
          break;

        case "target-list" :
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Target list."));

          control = new qx.ui.form.List();
          control.setToolTip(tooltip);
          control.setDroppable(true);
          control.setSelectionMode("multi");
          control.addListener("drop", this._onDrop);
          control.addListener("dragover", this._onDragOver);
          break;
      }

      return control || this.base(arguments, id);
    },

    _onAddButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      var selection = source.getSelection();

      for (var i=0, l=selection.length; i<l; i++)
      {
        target.add(selection[i]);
        source.remove(selection[i]);
      }
    },

    _onRemoveButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      var selection = target.getSelection();

      for (var i=0, l=selection.length; i<l; i++)
      {
        source.add(selection[i]);
        target.remove(selection[i]);
      }
    },

    _onRemoveAllButtonClick : function(e)
    {
      var source = this.getChildControl("source-list");
      var target = this.getChildControl("target-list");

      var children = target.getChildren();

      for (var i=0, l=children.length; i<l; i++)
      {
        source.add(children[i]);
        target.remove(children[i]);
      }
    },

    _onDragStart : function(e)
    {
      // dragstart is cancelable, you can put any runtime checks
      // here to dynamically disallow the drag feature on a widget
      if (!check.isValue())
      {
        e.preventDefault();
      }

      // Register supported types
      e.addType("value");
      e.addType("items");

      // Register supported actions
      e.addAction("copy");
      e.addAction("move");
    },

    _onDropRequest : function(e)
    {
      this.debug("Related of droprequest: " + e.getRelatedTarget());

      var action = e.getCurrentAction();
      var type = e.getCurrentType();
      var result;

      switch(type)
      {
        case "items":
          result = this.getSelection();

          if (action == "copy")
          {
            var copy = [];

            for (var i=0, l=result.length; i<l; i++)
            {
              copy[i] = result[i].clone();
            }

            result = copy;
          }
          break;

        case "value":
          result = this.getSelection()[0].getLabel();
          break;
      }

      // Remove selected items on move
      if (action == "move")
      {
        var selection = this.getSelection();

        for (var i=0, l=selection.length; i<l; i++)
        {
          this.remove(selection[i]);
        }
      }

      // Add data to manager
      e.addData(type, result);
    },

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

    _onDragOver : function(e)
    {
      if (!e.supportsType("items"))
      {
        e.preventDefault();
      }
    }
  }
});
