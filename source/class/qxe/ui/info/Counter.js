/* ****************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

**************************************************************************** */

/**
 * A visit counter of the page.
 */
qx.Class.define("qxe.ui.info.Counter",
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

    this._setLayout(new qx.ui.layout.Canvas());

    this._createChildControl("pane");
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
      init : "counter"
    }
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
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
      var tooltip;

      switch(id)
      {
        case "pane":
          control = new qx.ui.container.Composite(new qx.ui.layout.Grid(4, 2));
          control.addListener("appear", this._onAppearCounter, this);

          control.add(this.getChildControl("num-label"), {column: 0, row: 0});
          control.add(this.getChildControl("num-field"), {column: 1, row: 0});
          control.add(this.getChildControl("date-label"), {column: 0, row: 1});
          control.add(this.getChildControl("date-field"), {column: 1, row: 1});

          this._add(control);
          break;

        case "num-label":
          control = new qx.ui.basic.Label("Number of visits");
          control.setAlignY("middle");
          break;

        case "num-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Total number of visits."));

          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.setKeepFocus(true);
          control.setTextAlign("right");
          control.setWidth(35);
          control.setToolTip(tooltip);
          break;

        case "date-label":
          control = new qx.ui.basic.Label("Last visit");
          control.setAlignY("middle");
          break;

        case "date-field":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Last date visit."));

          control = new qx.ui.form.DateField();
          control.setFocusable(false);
          control.setKeepFocus(true);
          control.setToolTip(tooltip);
          break;
      }

      return control || this.base(arguments, id);
    },

    _onAppearCounter : function()
    {
      this.__updateCounter();
    },

    __updateCounter : function()
    {
      var oldCounter = qx.bom.Cookie.get("visitCount");
      var counter = parseInt(oldCounter ? oldCounter : 0);

      var lastDate = qx.bom.Cookie.get("lastVisit");

      ++counter;

      var date = new Date();

      var expdate = date.getTime();
      expdate += 3600000 * 24 *30;

      date.setTime(expdate);
      var newDate = date.toGMTString();

      qx.bom.Cookie.set("visitCount", counter, newDate);
      qx.bom.Cookie.set("lastVisit", counter, newDate);

      this.getChildControl("num-field").setValue(counter);
      this.getChildControl("date-field").setValue(lastDate);
    }
  }
});

