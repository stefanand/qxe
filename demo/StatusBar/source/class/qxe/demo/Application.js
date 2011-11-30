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

#asset(qx/icon/${qx.icontheme}/16/apps/office-calendar.png)
#asset(qxe/decoration/Modern/dialog/icon/16/information.png)

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe StatusBar"
 */
qx.Class.define("qxe.demo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __frame1 : null,
    __frame2 : null,

    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Document is the application root
      var doc = this.getRoot();

      // Button
      var button1 = new qx.ui.form.Button("Frame 1!");
      button1.addListener("execute", this.createFrame1, this);

      var button2 = new qx.ui.form.Button("Frame 2!");
      button2.addListener("execute", this.createFrame2, this);

      doc.add(button1, {left: 50, top: 50});
      doc.add(button2, {left: 150, top: 50});
      doc.add(this.createTable(), {left: 50, top: 100});
    },

    createFrame1 : function()
    {
      var frame = this.__frame1;

      if(!frame)
      {
        var label = new qx.ui.basic.Label("Just a label");

        frame = this.__frame1 = new qxe.ui.window.Frame("Testing frame 1", "qxe/decoration/Modern/dialog/icon/16/information.png");
        frame.setLayout(new qx.ui.layout.Canvas());
        frame.setHeight(100);
        frame.setWidth(100);
        frame.add(label);
        frame.moveTo(110, 60);
        frame.show();
      }
    },

    createFrame2 : function()
    {
      var frame = this.__frame2;

      if(!frame)
      {
        var label = new qx.ui.basic.Label("Just a label");
        var statusBar = new qxe.ui.statusbar.StatusBar();

        frame = this.__frame2 = new qxe.ui.window.Frame("Testing frame 2", "qxe/decoration/Modern/dialog/icon/16/information.png");
        frame.setLayout(new qx.ui.layout.Canvas());
        frame.setHeight(100);
        frame.setWidth(100);
        frame.add(label);
        frame.moveTo(110, 60);
        frame.show();
        frame.addStatusBar(statusBar);
      }
    },

    nextId : 0,

    createRandomRows : function(rowCount)
    {
      var rowData = [];
      var now = new Date().getTime();
      var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
      for (var row = 0; row < rowCount; row++) {
        var date = new Date(now + Math.random() * dateRange - dateRange / 2);
        rowData.push([ this.nextId++, Math.random() * 10000, date, (Math.random() > 0.5) ]);
      }
      return rowData;
    },

    createTable : function()
    {
      // Create the initial data
      var rowData = this.createRandomRows(20);

      // table model
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();
      tableModel.setColumns([ "ID", "A number", "A date", "Boolean" ]);
      tableModel.setData(rowData);
      tableModel.setColumnEditable(1, true);
      tableModel.setColumnEditable(2, true);
      tableModel.setColumnSortable(3, false);

      // table
      var table = new qxe.ui.table.Table(tableModel);

      table.set({
        width: 600,
        height: 150,
        decorator : null
      });

      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      var tcm = table.getTableColumnModel();

      // Display a checkbox in column 3
      tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());

      // use a different header renderer
      tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png", "A date"));

      return table;
    }
  }
});

