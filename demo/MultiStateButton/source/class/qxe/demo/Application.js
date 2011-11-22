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

#asset(qxe/icon/ui/control/audio-volume-muted.png)
#asset(qxe/icon/ui/control/audio-volume-low.png)
#asset(qxe/icon/ui/control/audio-volume-medium.png)
#asset(qxe/icon/ui/control/audio-volume-high.png)

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe MultiStateButton"
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
      var multiStateButton1 = new qxe.ui.form.MultiStateButton();
      multiStateButton1.addButtonState("Muted", "qxe/icon/ui/control/audio-volume-muted.png", "Muted volume");
      multiStateButton1.addButtonState("Low", "qxe/icon/ui/control/audio-volume-low.png", "Low volume");
      multiStateButton1.addButtonState("Medium", "qxe/icon/ui/control/audio-volume-medium.png", "Medium volume");
      multiStateButton1.addButtonState("High", "qxe/icon/ui/control/audio-volume-high.png", "High volume");

      var multiStateButton2 = new qxe.ui.form.MultiStateButton();
      multiStateButton2.addButtonState("Muted", "qxe/icon/ui/control/audio-volume-muted.png", "Muted volume");
      multiStateButton2.addButtonState("Low", "qxe/icon/ui/control/audio-volume-low.png", "Low volume");
      multiStateButton2.addButtonState("Medium", "qxe/icon/ui/control/audio-volume-medium.png", "Medium volume");
      multiStateButton2.addButtonState("High", "qxe/icon/ui/control/audio-volume-high.png", "High volume");
      multiStateButton2.setDynamic(true);

      doc.add(multiStateButton1, {left: 50, top: 50});
      doc.add(multiStateButton2, {left: 150, top: 50});
    }
  }
});
