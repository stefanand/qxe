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
 * A dialog widget
 *
 * More information can be found in the package description {@link qxe.ui.dialog}.
 */
qx.Class.define("qxe.ui.dialog.Dialog",
{
  extend : qxe.ui.window.DecoratedWindow,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param caption {String} The caption text
   */
  construct : function(caption)
  {
    this.base(arguments, caption);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      INTERNAL OPTIONS
    ---------------------------------------------------------------------------
    */

    // overridden
    appearance :
    {
      refine : true,
      init : "dialog"
    },

    /** Should the dialog be undecorated */
    undecorated :
    {
      check : "Boolean",
      init : false,
      event : "changeUndecorated"
    },

    /** Should the window be modal (this disables minimize and maximize buttons) */
    modal :
    {
      check : "Boolean",
      init : false,
      event : "changeModal"
    },

    /**
     * Block the ui underneath the dialog while displayed.
     */
    blocker :
    {
      check : "Boolean",
      init : false
    },

    /**
     * Blocker color
     */
    blockerColor :
    {
      check : "String",
      init : "black"
    },

    /**
     * Blocker opacity
     */
    blockerOpacity :
    {
      check : "Number",
      init : 0.5
    }
  },

  members :
  {
    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listens to the "focusout" event to deactivate the window (if the
     * currently focused widget is not a child of the window)
     *
     * @param e {qx.event.type.Focus} focus event
     */
    _onWindowFocusOut : function(e) {
      // only needed for non-modal windows
      if (this.getModal())
      {
        return;
      }

      this.base(arguments, e);
    },

    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // Augmented
    show : function()
    {
      if(this.isBlocker())
      {
        var root = this.getApplicationRoot();
        root.setBlockerOpacity(this.getBlockerOpacity());
        root.setBlockerColor(this.getBlockerColor());
        root.blockContent(this.getZIndex() - 1);
      }

      this.base(arguments);
    },

    // Augmented
    hide : function()
    {
      if(this.isBlocker())
      {
        this.getApplicationRoot().unblockContent();
      }

      this.base(arguments);
    }
  }
});

