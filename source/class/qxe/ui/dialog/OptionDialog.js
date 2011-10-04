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
 * An option dialog widget
 *
 * More information can be found in the package description {@link qxe.ui.dialog}.
 */
qx.Class.define("qxe.ui.dialog.OptionDialog",
{
  extend : qxe.ui.dialog.Dialog,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param caption {string} The caption
   * @param optionPane {qxe.ui.dialog.OptionPane} The option pane
   */
  construct : function(caption, optionPane)
  {
    this.base(arguments, caption);

    this.setLayout(new qx.ui.layout.Basic());

    if(optionPane != null)
    {
      this.setOptionPane(optionPane);
    }
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Get an instance of an option dialog.
     *
     * @param type {object} The option pane type.
     * @param message {string} The message to show.
     * @param modal {boolean} The modality of the dialog.
     * @param blocker {object} The blocker object.
     * @param parent {object} The parent widget to attach to.
     *
     * @return {qxe.ui.wizard.Page[]} List of children.
     */
    getInstance : function(type, message, modal, blocker, parent)
    {
      var typeStruct = (typeof type === "string") ? qxe.ui.dialog.OptionPanes[type] : type;

      var messageOP = new qxe.ui.dialog.OptionPane(typeStruct, message);

      var caption = qx.locale.Manager.getInstance().translate(typeStruct.caption, []).toString() || null;

      var messageOD = new qxe.ui.dialog.OptionDialog(caption, messageOP);
      messageOD.setModal(modal || false);
      messageOD.setBlocker(blocker);
      messageOD.addListenerOnce("resize", function(e) {
        if(parent)
        {
          messageOD.center(parent);
        }
        else
        {
          messageOD.center(e);
        }
      }, messageOD);

      qx.core.Init.getApplication().getRoot().add(messageOD);

      messageOD.open();

      return messageOD;
    }
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
      init : "option-dialog"
    },

    /**
     * The option pane.
     */
    optionPane :
    {
      check : "qxe.ui.dialog.OptionPane",
      init : null,
      apply : "_applyOptionPane"
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
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the option pane.
     *
     * The option pane is the inner pane of the dialog.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyOptionPane : function(value, old)
    {
      if (old)
      {
        old.dispose();
      }

      this.add(value);
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Close the option dialog.
     */
    close : function()
    {
      this.base(arguments);

      qx.core.Init.getApplication().getRoot().remove(this);
    }
  }
});

