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

/* ****************************************************************************

**************************************************************************** */

/**
 * A status bar pane.
 */
qx.Class.define("qxe.ui.statusbar.Message",
{
  extend : qxe.ui.statusbar.Pane,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.Basic());

    this._createChildControl("text");
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
      init : "statusbar-pane-message"
    }
  },

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

      switch(id)
      {
        case "text":
          control = new qx.ui.basic.Label();

          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Set the value of the statusbar pane.
     *
     * @param value {object} The new value.
     */
    setValue : function(value)
    {
      this.getChildControl("text").setValue(value);
    }
  }
});

