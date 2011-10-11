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

#asset(qxe/demo/*)

************************************************************************ */

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


      doc.add(this.pane1(), {left: 100, top: 50});
//      doc.add(this.pane2(), {left: 400, top: 50});
    },

    pane1 : function()
    {
      var optionPane = new qxe.ui.dialog.OptionPane("This is a warning!", qxe.ui.dialog.OptionPane.WARN, {OK : qxe.ui.form.ButtonPane.OK});

      return optionPane;
    },

    pane2 : function()
    {
      var def = {
        icon : "qxe/decoration/Modern/dialog/icon/16/message.png",
        caption : qx.locale.Manager.marktr("Message"),
        image : "qxe/decoration/Modern/dialog/icon/48/message.png",
        buttons : { qxe.ui.form.ButtonPane.OK }
      };

      var optionPane = new qxe.ui.dialog.OptionPane.getInstance(def);

      return optionPane;
    }
  }
});

