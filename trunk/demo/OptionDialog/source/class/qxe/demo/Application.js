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
 * @asset(qxe/decoration/Modern/dialog/icon/48/warning.png)
 *
 * @asset(qxe/demo/*)
 *
 */

/**
 * This is the main application class of your custom application "qxe OptionPane"
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

      doc.add(this.dialog1(), {left: 100, top: 50});
      doc.add(this.dialog2(), {left: 175, top: 50});
      doc.add(this.dialog3(), {left: 250, top: 50});
    },

    dialog1 : function()
    {
      var optionDialog = null;

      var button1 = new qx.ui.form.Button("Press 1!");
      button1.addListener("execute", function(e) {
        if(optionDialog == null)
        {
          var buttonPane = {
            buttons : {
              OK : qxe.ui.form.ButtonPane.OK
            }
          };

          var optionPane = new qxe.ui.pane.OptionPane("This is a warning!", "qxe/decoration/Modern/dialog/icon/48/warning.png", buttonPane);

          optionDialog = new qxe.ui.dialog.OptionDialog("Testing option dialog", optionPane);
          optionDialog.setHeight(100);
          optionDialog.setWidth(100);
          optionDialog.moveTo(110, 60);
          optionDialog.show();
        }
      }, this);

      return button1;
    },

    dialog2 : function()
    {
      var optionDialog = null;

      var button2 = new qx.ui.form.Button("Press 2!");
      button2.addListener("execute", function(e) {
        if(optionDialog == null)
        {
          var optionPane = qxe.ui.pane.OptionPane.getInstance(qxe.ui.pane.OptionPane.INFO);
          optionPane.setMessage("This is information!");

          optionDialog = new qxe.ui.dialog.OptionDialog("Testing option dialog", optionPane);
          optionDialog.setHeight(100);
          optionDialog.setWidth(100);
          optionDialog.moveTo(110, 60);
          optionDialog.show();
        }
      }, this);

      return button2;
    },

    dialog3 : function()
    {
      var optionDialog = null;

      var button3 = new qx.ui.form.Button("Press 3!");
      button3.addListener("execute", function(e) {
        if(optionDialog == null)
        {
          var def = {
            caption : "a title",
            optionPane : qxe.ui.pane.OptionPane.ERR,
            message : "This is an info dialog"
          };

          optionDialog = qxe.ui.dialog.OptionDialog.getInstance(def);
          optionDialog.setHeight(100);
          optionDialog.setWidth(100);
          optionDialog.moveTo(110, 60);
          optionDialog.show();
        }
      }, this);

      return button3;
    }
  }
});
