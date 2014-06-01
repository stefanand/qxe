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

     - today button

************************************************************************ */

/**
 * The widget presents a list of upcoming events.
 */
qx.Class.define("qxe.ui.scheduler.Grid",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // set the layout
    var layout = new qx.ui.layout.VBox();
    this._setLayout(layout);

    // create the child controls
    this._createChildControl("selection-pane");
    this._createChildControl("event-table");
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
      WIDGET INTERNALS
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "selection-pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          control.add(new qx.ui.basic.Label("Selection date"));
          control.add(this.getChildControl("start-date"));
          control.add(new qx.ui.basic.Label("-"));
          control.add(this.getChildControl("end-date"));

          this._add(control);
          break;

        case "start-date":
//          control = new qxe.ui.form.DateField(Date.now());
          control = new qx.ui.form.DateField(Date.now());
          break;

        case "end-date":
//          control = new qxe.ui.form.DateField(Date.now() + 365);
          control = new qx.ui.form.DateField(Date.now() + 365);
          break;

        case "event-table":
          var columns = [
            "Event",
            "Start",
            "End",
            "Details"
          ];

          var tableModel = new qx.ui.table.model.Simple();
          tableModel.setColumns(columns);
          tableModel.setColumnEditable(1, false);
          tableModel.setColumnEditable(2, false);
          tableModel.setColumnEditable(3, false);
          tableModel.setColumnEditable(4, false);

//          control = new qxe.ui.table.Table(tableModel);
          control = new qx.ui.table.Table(tableModel);

//          table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

          var tcm = control.getTableColumnModel();

          tcm.setHeaderCellRenderer(1, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "Start date"));
          tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "End date"));

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    }
  },


  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this._disposeObjects("_tableModel");
  }
});
