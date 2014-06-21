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
 * Native browser status bar
 * -------------------------
 * First of all, its appearence is not uniform throughout browsers, and
 * secondly, that functionality has been disabled for a long time by default
 * on most browsers for security reasons.
 * 
 * window.status = text;
 * 
 * NB!
 * After IE6 (tested IE7/8) you do it in the same way, but you need also
 * to adapt the browser security options by turning the feature on: Tools -
 * Internet Options - Security - Custom Level
 */

/**
 * Text plugin:
 * Multi-line status display
 * Additive status messages with messages added top or bottom
 * Show an optional close 'button'
 * Message history
 * Expandable by double clicking
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

    this._createChildControl("bar");
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
     * The spacing between items.
     */
    spacing :
    {
      check : "Integer",
      init : 4,
      apply : "_applySpacing"
    },

    activeType/collapsible
    hover/always/click
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

      switch(id)
      {
        case "bar":
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
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Sets the value of the default message pane.
     *
     * @param text {string} The text.
     */
    setValue : function(text)
    {
      var child = this.getChildControl("message");

      if(child)
      {
        child.setValue(text);
      }
    }
  }
});

