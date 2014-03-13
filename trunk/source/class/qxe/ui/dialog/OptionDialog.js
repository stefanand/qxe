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

    this.setLayout(new qx.ui.layout.Canvas());

    if(optionPane)
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
     * Get an instance of an option dialog by definition through json.
     *
     * The json structure looks like this:
     * {
     *   caption : "a title",
     *   optionPane : qxe.ui.dialog.OptionPane.INFO,
     *   message : "This is an info dialoga"
     * }
     *
     * @param json {object} The new value.
     * @return {qxe.ui.dialog.OptionDialog} The newly created option dialog.
     */
    getInstance : function(json)
    {
      var optionDialog = new qxe.ui.dialog.OptionDialog();
      optionDialog.set(json);

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
     * Set option pane for dialog.
     *
     * @param optionPane {qxe.ui.dialog.OptionPane} The option pane object or json definition.
     */
    setOptionPane : function(optionPane)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(optionPane instanceof Object))
        {
          throw new Error("Incompatible child for OptionDialog: " + optionPane);
        }
      }

      if(!(optionPane instanceof qxe.ui.dialog.OptionPane))
      {
        optionPane = qxe.ui.dialog.OptionPane.getInstance(optionPane);
      }

      this.add(optionPane);
    },

    /**
     * Set message for option pane dialog.
     *
     * @param message {string} The message for the option pane dialog.
     */
    setMessage : function(message)
    {
      var optionPane = this.getChildren()[0];

      if(optionPane)
      {
        optionPane.setMessage(message);
      }
    }
  }
});

