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
//submit
# asset(qx/icon/${qx.icontheme}/16/actions/document-send.png)
// yes
// no
// clean
# asset(qx/icon/${qx.icontheme}/16/actions/document-revert.png)

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

  construct : function(orientation, spacing)
  {
    this.base(arguments);

    // Configure orientation
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
    OK : {
      name : "OK",
      label : qx.locale.Manager.marktr("OK"),
      icon : "qx/icon/16/actions/dialog-ok.png",
      toolTip : null,
      toolTipIcon : "qx/icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Accept the dialog.")
    },

    CANCEL : {
      name : "CANCEL",
      label : qx.locale.Manager.marktr("Cancel"),
      icon : "qx/icon/16/actions/dialog-cancel.png",
      toolTip : null,
      toolTipIcon : "qx/icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Cancel the dialog.")
    },

    HELP : {
      name : "HELP",
      label : qx.locale.Manager.marktr("Help"),
      icon : "qx/icon/16/actions/help-about.png",
      toolTip : null,
      toolTipIcon : "qx/icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Get help about the dialog.")
    },

    YES : {
      name : "YES",
      label : qx.locale.Manager.marktr("Yes"),
      icon : "",
      toolTip : null,
      toolTipIcon : "qx/icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Accept the dialog.")
    },

    NO : {
      name : "NO",
      label : qx.locale.Manager.marktr("NO"),
      icon : "",
      toolTip : null,
      toolTipIcon : "qx/icon/16/actions/help-about.png",
      toolTipText : qx.locale.Manager.marktr("Accept the dialog.")
    }
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fired if the {@link #execute} method is invoked.*/
    "execute" : "qx.event.type.Event"
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
     * The button pane orientation
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

    // property apply
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

    _applySpacing : function(value, old)
    {
      var layout = this._getLayout();
      value == null ? layout.resetSpacing() : layout.setSpacing(value);
    },

    _applySizeConstraint : function()
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
     * @param button {[ "affirmative" | "cancel" | "help" | "other" ]} The constraint used for the button.
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

      var index = this.getChildren().length;

      if(constraint != null)
      {
// check valid constraints
        button.setUserData("constraint", constraint);
        index = this._constrainButtons(constraint);
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
     * @param constraint {qx.ui.form.Button} The button to be removed.
     */
    _constrainButtons : function(constraint)
    {
      var item = 0;

      // Windows versions
      if(qx.core.Environment.get("os.name") == "win")
      {
      }
      // All others osx, linux etc.
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
      this._add(spacer, {flex:1});

      return spacer;
    },

    /**
     * Read button resource.
     *
     * @return {qx.core.Object} The button resource object.
     */
    getResources : function(bitValue)
    {
      var buttons = [];

      for(var key in this.BUTTONS)
      {
        var button = this.BUTTONS[key];

        if(bitValue & button.bit)
        {
          buttons.push(button);
        }
      }

      return buttons;
    }
  }
});

