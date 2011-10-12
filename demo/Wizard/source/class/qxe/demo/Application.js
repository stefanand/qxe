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

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe"
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

      var wizard = new qxe.ui.wizard.Wizard();

      wizard.add(this.createPage1("Step 1"));
      wizard.add(this.createPage2("Step 2"));
      wizard.add(this.createPage3("Step 3"));
      wizard.add(this.createPage4("Step 4"));
      wizard.add(this.createPage5("Step 5"));

      doc.add(wizard, {left: 100, top: 50});
    },

    createPage1 : function()
    {
      var page = new qxe.ui.wizard.Page();
      page.setLayout(new qx.ui.layout.Canvas());

      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));

      var label = new qx.ui.basic.Label("Input label");
      label.setAlignY("middle");

      var textField = new qx.ui.form.TextField("Input textfield");

      composite.add(label);
      composite.add(textField);

      page.add(composite, {left: 10, top: 10});

      return page;
    },

    createPage2 : function()
    {
      var page = new qxe.ui.wizard.Page();
      page.setLayout(new qx.ui.layout.Canvas());

      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));

      var label = new qx.ui.basic.Label("Input label");
      label.setAlignY("middle");

      var textField = new qx.ui.form.TextField("Input textfield");

      composite.add(label);
      composite.add(textField);

      page.add(composite, {left: 10, top: 10});

      return page;
    },

    createPage3 : function()
    {
      var page = new qxe.ui.wizard.Page();
      page.setLayout(new qx.ui.layout.Canvas());

      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));

      var label = new qx.ui.basic.Label("Input label");
      label.setAlignY("middle");

      var textField = new qx.ui.form.TextField("Input textfield");

      composite.add(label);
      composite.add(textField);

      page.add(composite, {left: 10, top: 10});

      return page;
    },

    createPage4 : function()
    {
      var page = new qxe.ui.wizard.Page();
      page.setLayout(new qx.ui.layout.Canvas());

      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));

      var label = new qx.ui.basic.Label("Input label");
      label.setAlignY("middle");

      var textField = new qx.ui.form.TextField("Input textfield");

      composite.add(label);
      composite.add(textField);

      page.add(composite, {left: 10, top: 10});

      return page;
    },

    createPage5 : function()
    {
      var page = new qxe.ui.wizard.Page();
      page.setLayout(new qx.ui.layout.Canvas());

      var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));

      var label = new qx.ui.basic.Label("Input label");
      label.setAlignY("middle");

      var textField = new qx.ui.form.TextField("Input textfield");

      composite.add(label);
      composite.add(textField);

      page.add(composite, {left: 10, top: 10});

      return page;
    }
  }
});

