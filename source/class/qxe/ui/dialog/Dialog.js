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
   * @param icon {String} The URL of the caption bar icon
   */
  construct : function(caption, icon)
  {
    this.base(arguments, caption, icon);
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

    /** Should the dialog be resizable */
    resizabe :
    {
      check : "Boolean",
      init : false,
      event : "changeResizable"
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

