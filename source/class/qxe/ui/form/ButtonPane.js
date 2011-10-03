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

#asset(qx/icon/${qx.icontheme}/16/actions/dialog-ok.png)
#asset(qx/icon/${qx.icontheme}/16/actions/dialog-cancel.png)
#asset(qx/icon/${qx.icontheme}/16/actions/dialog-apply.png)
#asset(qx/icon/${qx.icontheme}/16/actions/help-about.png)

************************************************************************ */

/**
 * A button pane is a pane with a number of buttons. It can be a standardised
 * button pane with preset combinations of buttons. It can also be totally customised.
 * All buttons are kept together in a Widget container with preset spacing.
 */
qx.Class.define("qxe.ui.form.ButtonPane",
{
  extend : qx.ui.core.Widget,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param orientation {String} Orientation of the button pane
   * @param spacing {Integer} The spacing between buttons of the button pane
   */
  construct : function(orientation, spacing)
  {
    this.base(arguments);

    if(orientation != null)
    {
      this.setOrientation(orientation);
    }
    else
    {
      this.initOrientation();
    }

    if(spacing != null)
    {
      this.setSpacing(spacing);
    }
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    // Buttons
    /** The OK button */     
    OK : {
      label : qx.locale.Manager.marktr("OK"),
      icon : "icon/16/actions/dialog-ok.png",
      toolTip : null,
      toolTipIcon : "icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Accept the dialog.")
    },

    /** The Cancel button */
    CANCEL : {
      label : qx.locale.Manager.marktr("Cancel"),
      icon : "icon/16/actions/dialog-cancel.png",
      toolTip : null,
      toolTipIcon : "icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Cancel the dialog.")
    },

    /** The Help button */
    HELP : {
      label : qx.locale.Manager.marktr("Help"),
      icon : "icon/16/actions/help-about.png",
      toolTip : null,
      toolTipIcon : "icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Get help about the dialog.")
    },

    /** The YES button */
    YES : {
      label : qx.locale.Manager.marktr("Yes"),
      icon : "icon/16/actions/dialog-ok.png",
      toolTip : null,
      toolTipIcon : "icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Answer yes to the dialog.")
    },

    /** The NO button */
    NO : {
      label : qx.locale.Manager.marktr("No"),
      icon : "icon/16/actions/dialog-cancel.png",
      toolTip : null,
      toolTipIcon : "icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Answer no to the dialog.")
    }
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
      init : "button-pane"
    },

    /**
     * The orientation.
     */
    orientation :
    {
      check : [ "horizontal", "vertical" ],
      init : "horizontal",
      apply : "_applyOrientation"
    },

    /**
     * The spacing between buttons.
     */
    spacing :
    {
      check : "Integer",
      init : 4,
      apply : "_applySpacing"
    },

    /**
     * Sets the size constraint. Valid values are "less" and "same".
     * The size constraint will apply to all components except if the component client property
     * growX or growY set to true.
     */
    sizeConstraint :
    {
      check : ["same", "less"],
      init : "same",
      apply : "_applySizeConstraint"
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
     * Apply method for the orientation.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyOrientation : function(value, old)
    {
      // Dispose old layout
      var oldLayout = this._getLayout();

      if (oldLayout)
      {
        oldLayout.dispose();
      }

      // Reconfigure
      if (value === "horizontal")
      {
        var layout = new qx.ui.layout.HBox(this.getSpacing());
        layout.setReversed(qx.locale.Manager.getInstance().getDirection() == "right-to-left");
        this._setLayout(layout);

        this.setAllowStretchX(true);
        this.setAllowStretchY(false);
      }
      else
      {
        this._setLayout(new qx.ui.layout.VBox(this.getSpacing()));

        this.setAllowStretchX(false);
        this.setAllowStretchY(true);
      }
    },

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

    /**
     * Apply method for size constraint.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applySizeConstraint : function(value, old)
    {
    },

    /*
    ---------------------------------------------------------------------------
      CHILD HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Adds button to buttonpane with specified constraint.
     * The valid constraints are "affirmative", "cancel", "help" and "other".
     *
     * The main purpose of the constraints is to determine how the buttons are
     * laid out on different platforms according to the OS convention. For example, on
     * Windows, affirmative button appears on the right hand side of cancel button.
     * On Mac OS X, affirmative button will appear on the left hand side of cancel button.
     *
     * @param button {qx.ui.form.Button} The button to add.
     * @param constraint {[ "affirmative" | "cancel" | "help" | "other" ]} The constraint used for the button.
     */
    add : function(button, constraint)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(button instanceof qx.ui.form.Button))
        {
          throw new Error("Incompatible child for ButtonPane: " + button);
        }
      }

      var index = this._getChildren().length;

      if(constraint != null)
      {
// check valid constraints
//        button.setUserData("constraint", constraint);
//        index = this._constrainButtons(constraint);
      }

      this._addAt(button, index);
    },

    /**
     * Remove a button from the button pane.
     *
     * @param button {qx.ui.form.Button} The button to be removed.
     */
    remove : function(button)
    {
      this._remove(button);
    },

    /**
     * Add a spacer to the button pane. The spacer has a flex
     * value of one and will stretch to the available space.
     *
     * @return {qx.ui.core.Spacer} The newly added spacer object. A reference
     * to the spacer is needed to remove this spacer from the layout.
     */
    addSpacer : function()
    {
      var spacer = new qx.ui.core.Spacer;
      this._add(spacer, {flex:1});

      return spacer;
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * The main purpose of the constraints is to determine how the buttons are
     * laid out on different platforms according to the OS convention. For example, on
     * Windows, affirmative button appears on the right hand side of cancel button.
     * On Mac OS X, affirmative button will appear on the left hand side of cancel button.
     *
     * @param constraint {[ "affirmative" | "cancel" | "help" | "other" ]} The constraint for buttons.
     */
    _constrainButtons : function(constraint)
    {
      var item = 0;

      // Windows versions
      // affirm button to the right of the cancel button.
      if(qx.core.Environment.get("os.name") == "win")
      {
      }
      // All others osx, linux etc.
      // affirm button to the left of the cancel button.
      else
      {
      }

      return item;
    },


    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Gets the button with the index.
     *
     * @param index {Number} the button index.
     * @return {qx.ui.form.Button} the button which has the name. null if there is no button with that name.
     */
    getButton : function(index)
    {
      return this._getChildren()[index];
    },

    /**
     * Gets the button with the name.
     * In order to use this method, you have to set a name to the button using {@link
     * Widget#setUserData("name", String)} method.
     *
     * @param name {String} the button name.
     * @return {qx.ui.form.Button} the button which has the name. null if there is no button with that name.
     */
    getButtonByName : function(name)
    {
      var button = null;
      var children = this._getChildren();

      for(var i = 0, l = children.length; i < l; i++)
      {
        if(children[i].getUserData("name") == name)
        {
          button = children[i];
          break;
        }
      }

      return button;
    },

    /**
     * Add a spacer to the button pane. The spacer has a flex
     * value of one and will stretch to the available space.
     *
     * @return {qx.ui.core.Spacer} The newly added spacer object. A reference
     * to the spacer is needed to remove this spacer from the layout.
     */
    addSpacer : function()
    {
      var spacer = new qx.ui.core.Spacer;
      this._add(spacer, {flex : 1});

      return spacer;
    }
  }
});

