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

#asset(qx/icon/${qx.icontheme}/16/actions/dialog-ok.png)
#asset(qx/icon/${qx.icontheme}/16/actions/dialog-cancel.png)
#asset(qx/icon/${qx.icontheme}/16/actions/help-about.png)

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe ButtonPane"
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
			
      // Add button to document at fixed coordinates
      doc.add(new qx.ui.basic.Label("Default with custom and predefined buttons"), {left: 100, top: 35});
      doc.add(this.createButtonPane1(), {left: 100, top: 50});

      doc.add(new qx.ui.basic.Label("Spacing 8px with predefined buttons"), {left: 100, top: 85});
      doc.add(this.createButtonPane2(), {left: 100, top: 100});

      doc.add(new qx.ui.basic.Label("Button constraints with predefined buttons"), {left: 100, top: 135});
      doc.add(this.createButtonPane3(), {left: 100, top: 150});

      doc.add(new qx.ui.basic.Label("Yes and No predefined buttons"), {left: 100, top: 185});
      doc.add(this.createButtonPane4(), {left: 100, top: 200});

      doc.add(new qx.ui.basic.Label("JSON definition"), {left: 100, top: 235});
      doc.add(this.createButtonPane5(), {left: 100, top: 250});

      doc.add(new qx.ui.basic.Label("Vertical predefined buttons same width"), {left: 350, top: 35});
      doc.add(this.createButtonPane6(), {left: 350, top: 50});

      doc.add(new qx.ui.basic.Label("Vertical predefined buttons and optimized width"), {left: 350, top: 135});
      doc.add(this.createButtonPane7(), {left: 350, top: 150});
    },

    createButtonPane1 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane();

      var sendB = new qx.ui.form.Button("Send", "icon/16/actions/dialog-ok.png");
      sendB.addListener("execute", function() {
        alert("You pressed the Send button!");
      }, this);

      buttonPane.add(sendB);

      var cancelB = new qx.ui.form.Button();
      cancelB.set(qxe.ui.form.ButtonPane.CANCEL);
      cancelB.addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);

      buttonPane.add(cancelB);

      var helpB = new qx.ui.form.Button();
      helpB.set(qxe.ui.form.ButtonPane.HELP);
      helpB.addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);

      buttonPane.add(helpB);

      return buttonPane;
    },

    createButtonPane2 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane(null, 8);

      var okB = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
      okB.addListener("execute", function() {
        alert("You pressed the OK button!");
      }, this);

      buttonPane.add(okB);

      var cancelB = new qx.ui.form.Button();
      cancelB.set(qxe.ui.form.ButtonPane.CANCEL);
      cancelB.addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);

      buttonPane.add(cancelB);

      var helpB = new qx.ui.form.Button();
      helpB.set(qxe.ui.form.ButtonPane.HELP);
      helpB.addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);
    
      buttonPane.add(helpB);

      return buttonPane;
    },

    createButtonPane3 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane();
      buttonPane.setSizeConstraint(false);

      var okB = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
      okB.addListener("execute", function() {
        alert("You pressed the OK button!");
      }, this);

      buttonPane.add(okB, "affirmative");

      var cancelB = new qx.ui.form.Button();
      cancelB.set(qxe.ui.form.ButtonPane.CANCEL);
      cancelB.addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);

      buttonPane.add(cancelB, "cancel");

      var helpB = new qx.ui.form.Button();
      helpB.set(qxe.ui.form.ButtonPane.HELP);
      helpB.addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);
    
      buttonPane.add(helpB, "help");

      return buttonPane;
    },

    createButtonPane4 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane();

      var yesB = new qx.ui.form.Button();
      yesB.set(qxe.ui.form.ButtonPane.YES);
      yesB.addListener("execute", function() {
        alert("You pressed the Yes button!");
      }, this);

      buttonPane.add(yesB, "affirmative");

      var noB = new qx.ui.form.Button();
      noB.set(qxe.ui.form.ButtonPane.NO);
      noB.addListener("execute", function() {
        alert("You pressed the Yes button!");
      }, this);
    
      buttonPane.add(noB, "cancel");

      return buttonPane;
    },

    createButtonPane5 : function()
    {
      var def = {
        OK : qxe.ui.form.ButtonPane.OK,
        CANCEL : {
          label : qx.locale.Manager.marktr("Cancel"),
          icon : "icon/16/actions/dialog-cancel.png",
          toolTip : null,
          toolTipIcon : "icon/16/actions/help-about.png",
          toolTipText : qx.locale.Manager.marktr("Cancel the dialog."),
          userData : [ "constraint" , "cancel" ]
        },
        HELP : {
          label : qx.locale.Manager.marktr("Help"),
          icon : "icon/16/actions/help-about.png",
          toolTip : null,
          toolTipIcon : "icon/16/actions/help-about.png",
          toolTipText : qx.locale.Manager.marktr("Get help about the dialog.")
        }
      };

      var buttonPane = new qxe.ui.form.ButtonPane.getInstance(def);
      buttonPane.getButtonByName("OK").addListener("execute", function() {
        alert("You pressed the OK button!");
      }, this);
      buttonPane.getButtonByName("CANCEL").addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);
      buttonPane.getButtonByName("HELP").addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);

      return buttonPane;
    },

    createButtonPane6 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane("vertical");

      var okB = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
      okB.addListener("execute", function() {
        alert("You pressed the OK button!");
      }, this);

      buttonPane.add(okB);

      var cancelB = new qx.ui.form.Button();
      cancelB.set(qxe.ui.form.ButtonPane.CANCEL);
      cancelB.addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);

      buttonPane.add(cancelB);

      var helpB = new qx.ui.form.Button();
      helpB.set(qxe.ui.form.ButtonPane.HELP);
      helpB.addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);
    
      buttonPane.add(helpB);

      return buttonPane;
    },

    createButtonPane7 : function()
    {
      var buttonPane = new qxe.ui.form.ButtonPane("vertical");
      buttonPane.setSizeConstraint(false);

      var okB = new qx.ui.form.Button("OK", "icon/16/actions/dialog-ok.png");
      okB.addListener("execute", function() {
        alert("You pressed the OK button!");
      }, this);

      buttonPane.add(okB);

      var cancelB = new qx.ui.form.Button();
      cancelB.set(qxe.ui.form.ButtonPane.CANCEL);
      cancelB.addListener("execute", function() {
        alert("You pressed the Cancel button!");
      }, this);

      buttonPane.add(cancelB);

      var helpB = new qx.ui.form.Button();
      helpB.set(qxe.ui.form.ButtonPane.HELP);
      helpB.addListener("execute", function() {
        alert("You pressed the Help button!");
      }, this);
    
      buttonPane.add(helpB);

      return buttonPane;
    }
  }
});
