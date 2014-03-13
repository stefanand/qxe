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
 * This is the main application class of your custom application "qxe Busy indicator"
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

      var busy = new qxe.ui.indicator.Busy();

      doc.add(busy, {left: 50, top: 50});
      doc.add(this._createControlPane(busy), {left: 100, top: 50});

      busy.start();
    },

    _createControlPane : function(busy)
    {
      // Create components
      var linesL = new qx.ui.basic.Label("Number of lines");

      var linesS = new qx.ui.form.Spinner(6, busy.getLines(), 16);
      linesS.addListener("changeValue", function(e) {
        busy.setLines(e.getData());
      }, this);

      var lineLengthL = new qx.ui.basic.Label("Line length");

      var lineLengthS = new qx.ui.form.Spinner(0, busy.getLineLength(), 30);
      lineLengthS.addListener("changeValue", function(e) {
        busy.setLineLength(e.getData());
      }, this);

      var lineWidthL = new qx.ui.basic.Label("Line width");

      var lineWidthS = new qx.ui.form.Spinner(2, busy.getLineWidth(), 20);
      lineWidthS.addListener("changeValue", function(e) {
        busy.setLineWidth(e.getData());
      }, this);

      var radiusL = new qx.ui.basic.Label("Radius");

      var radiusS = new qx.ui.form.Spinner(0, busy.getRadius(), 40);
      radiusS.addListener("changeValue", function(e) {
        busy.setRadius(e.getData());
      }, this);

      var lineColorL = new qx.ui.basic.Label();

      var lineColorP = new qx.ui.control.ColorPopup();
      lineColorP.exclude();
      lineColorP.setValue("#000");
      lineColorP.addListener("changeValue", function(e) {
        busy.setLineColor(e.getData());
      }, this);

      var lineColorB = new qx.ui.form.Button("Line color");
      lineColorB.addListener("execute", function(e)
      {
        lineColorP.placeToWidget(lineColorB);
        lineColorP.show();
      });

      var trailL = new qx.ui.basic.Label("Trail");

      var trailS = new qx.ui.form.Spinner(10, busy.getTrail(), 100);
      trailS.addListener("changeValue", function(e) {
        busy.setTrail(e.getData());
      }, this);

      var speedL = new qx.ui.basic.Label("Speed");

      var speedS = new qx.ui.form.Spinner(0.5, busy.getSpeed(), 2.2);
      speedS.addListener("changeValue", function(e) {
        busy.setSpeed(e.getData());
      }, this);

      var opacityL = new qx.ui.basic.Label("Opacity");

      var format = new qx.util.format.NumberFormat();
      format.setMaximumFractionDigits(2);

      var opacityS = new qx.ui.form.Spinner(0, busy.getOpacity(), 1);
      opacityS.addListener("changeValue", function(e) {
        busy.setOpacity(e.getData());
      }, this);
      opacityS.setNumberFormat(format);

      var fpsL = new qx.ui.basic.Label("Frames Per Second");

      var fpsS = new qx.ui.form.Spinner(0, busy.getFps(), 40);
      fpsS.addListener("changeValue", function(e) {
        busy.setFps(e.getData());
      }, this);

      var shadowCB = new qx.ui.form.CheckBox("Apply shadow");
      shadowCB.addListener("changeValue", function(e) {
        busy.setShadow(e.getData());
      }, this);

//      progress

      // Layout
      var layout = new qx.ui.layout.Grid();
      var pane = new qx.ui.container.Composite(layout);

      pane.add(linesL, {row: 0, column: 0});
      pane.add(linesS, {row: 0, column: 1});

      pane.add(lineLengthL, {row: 1, column: 0});
      pane.add(lineLengthS, {row: 1, column: 1});

      pane.add(lineWidthL, {row: 2, column: 0});
      pane.add(lineWidthS, {row: 2, column: 1});

      pane.add(radiusL, {row: 3, column: 0});
      pane.add(radiusS, {row: 3, column: 1});

      pane.add(lineColorB, {row: 4, column: 0});
      pane.add(lineColorL, {row: 4, column: 1});

      pane.add(trailL, {row: 5, column: 0});
      pane.add(trailS, {row: 5, column: 1});

      pane.add(speedL, {row: 6, column: 0});
      pane.add(speedS, {row: 6, column: 1});

      pane.add(opacityL, {row: 7, column: 0});
      pane.add(opacityS, {row: 7, column: 1});

      pane.add(fpsL, {row: 8, column: 0});
      pane.add(fpsS, {row: 8, column: 1});

      pane.add(shadowCB, {row: 9, column: 0});

      return pane;
    }
  }
});

