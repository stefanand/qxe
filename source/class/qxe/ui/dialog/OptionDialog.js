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
alert("HEJ");
    this.setLayout(new qx.ui.layout.Basic());

    this.add(optionPane);
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
     * @param option {object} The option can be either an OptionPane or a messageType or a json object.
     * @param message {string} The message to show.
     * @param parent {object} The parent widget to center on.
     * @param modal {boolean} The modality of the dialog.
     * @param blocker {object} The blocker object.
     *
     * @return {qxe.ui.dialog.OptionDialog} The OptionDialog instance.
     */
    getInstance : function(option, caption, message, optionType, parent, modal, blocker)
    {
      var optionPane;

      if(option instanceof qxe.ui.dialog.OptionPane)
      {
        optionPane = option;
      }
      else
      {
        // Create an option pane
        var messageType = (typeof option === "string") ? qxe.ui.dialog.OptionPane[option] : option;

        var messageOP = new qxe.ui.dialog.OptionPane(message, messageType, optionType);
//        var caption = qx.locale.Manager.getInstance().translate(typeStruct.caption, []).toString() || null;
      }

      var optionDialog = new qxe.ui.dialog.OptionDialog(caption, optionPane);
      optionDialog.setModal(modal || false);
      optionDialog.setBlocker(blocker || false);
      optionDialog.addListenerOnce("resize", function(e) {
        if(parent)
        {
          optionDialog.center(parent);
        }
        else
        {
          optionDialog.center(e);
        }
      }, optionDialog);

//      qx.core.Init.getApplication().getRoot().add(optionDialog);

      optionDialog.open();

      return optionDialog;
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
      INTERNAL ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Add option dialog.
     *
     * @param message {string} The message.
     * @param optionType {boolean} The option pane.
     */
    add : function(optionPane)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(optionPane instanceof qxe.ui.dialog.OptionPane))
        {
          throw new Error("Incompatible child for OptionDialog: " + optionPane);
        }

        if (this._getChildren())
        {
          throw new Error("Option pane already exists.");
        }
      }

      this._add(optionPane);
    }
//,


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Close the option dialog.
     */
/*    close : function()
    {
      this.base(arguments);

      qx.core.Init.getApplication().getRoot().remove(this);
    }
*/
  }
});

