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
 * A status bar showing different kind of information from different sources.
 *
 * The following features exist in the status bar:
 * - adding different status bar plugins.
 * - timeout or focus out removing of message (animation).
 */
qx.Class.define("qxe.ui.statusbar.StatusBar",
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

    this._setLayout(new qx.ui.layout.HBox());

		this._createChildControl("message-pane");
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
      init : "statusbar"
    },

    /**
     * The spacing between panes.
     */
    spacing :
    {
      check : "Integer",
      init : 4,
      apply : "_applySpacing"
    }
  },

  member :
  {
    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
			var tooltip;

      switch(id)
      {
        case "message-pane":
					control = new qxe.ui.statusbar.Message();

					this._add(control);
          break;
			}

      return control || this.base(arguments, id);
    },

    /*
    ---------------------------------------------------------------------------
      CHILDREN HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Add a pane to the statusbar.
     *
     * @param page {qxe.ui.statusbar.Pane} The pane which should be added.
     */
    add : function(pane)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(pane instanceof qxe.ui.statusbar.Pane))
        {
          throw new Error("Incompatible child for StatusBar: " + pane);
        }
      }

      this._add(pane);
    },

    /**
     * Remove a pane from the statusbar.
     *
     * @param pane {qxe.ui.statusbar.Pane} The pane to be removed.
     */
    remove : function(pane)
    {
      this._remove(pane);
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for spacing between buttons.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applySpacing : function(value, old)
    {
      var layout = this._getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    }
  }
});

