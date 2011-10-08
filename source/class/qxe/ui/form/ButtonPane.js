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
 *
 * A button pane has the following features:
 * - horizontal and vertical orientation
 * - create from json objects
 * - predefined buttons like ok, cancel, help, yes and no
 * - button spacing
 * - buttons kept together
 * - individual button access
 * - button constrain for Windows and OS/X respectively and default none (original button order)
 * - button size constraint
 * - add spacer between buttons
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
    },

    /**
     * Get an instance of a button pane by definition through json.
     *
     * The json structure looks like this:
     * {
     *   <button name> : {
     *     constraint : "affirmative",
     *     label : qx.locale.Manager.marktr("Submit"),
     *     icon : "icon/16/actions/dialog-ok.png",
     *     toolTip : null,
     *     toolTipIcon : "icon/16/actions/help-about.png",
     *     toolTipText : qx.locale.Manager.marktr("Submit the dialog."),
     *     userData : ["constraint", "affirmative"] // http://bugzilla.qooxdoo.org/show_bug.cgi?id=5692
     *   },
     *   <button name> : {
     *     ...
     *   },
     *   ...
     * }
     *
     * @param json {object} The new value.
     * @return {qxe.ui.form.ButtonPane} The newly created button pane.
     */
    getInstance : function(json)
    {
      var button;
      var buttonPane = new qxe.ui.form.ButtonPane(json.orientation, json.spacing);

      for(var key in json)
      {
        if(json[key])
        {
          button = new qx.ui.form.Button();
          button.setUserData("name", key);
          button.set(json[key]);
          // The set() function  does not take functions with >1 parameter
          // Bug: http://bugzilla.qooxdoo.org/show_bug.cgi?id=5692
          buttonPane.add(button, json[key].userData ? json[key].userData[1] : null);
        }
      }

      return buttonPane;
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
     * The constraint of buttons positioning affirmative button to the right or left of the cancel button
     * and the help button.
     *
     *  true:
     *    windows -> buttons in following order from left to right: other > help > cancel > affirmative
     *    os/x    -> buttons in following order from left to right: affirmative > cancel > help > other
     *  false:
     *    all -> in the order you define them
     */
    constraint :
    {
      check : "Boolean",
      init : false,
      apply : "_applyConstraint"
    },

    /**
     * The size constraint of buttons making them grow to same width (false) or optimized (true).
     *
     * qx.ui.layout.HBox has minimum width as default
     * qx.ui.layout.VBox has maximum width as default.
     *
     * This has been change for the button pane to be minimum width as default.
     *
     *   true  -> minimum width
     *   false -> maximum width (flex:1)
     */
    sizeConstraint :
    {
      check : "Boolean",
      init : true,
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
    __buttonOrder : [],

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
//rtl        layout.setReversed(qx.locale.Manager.getInstance().getDirection() == "right-to-left");
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
     * Apply method for constraint.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyConstraint : function(value, old)
    {
      if(value)
      {
        this._constrainButtons();
      }
      else
      {
        this.removeAll();

        var buttonOrder = this.__buttonOrder;

        // Restore initial button order
        for(var i = 0, l = this._getChildren().length; i < l; i++)
        {
          this.add(buttonOrder[i]);
        }
      }
    },

    /**
     * Apply method for size constraint.
     *
     * Horizontal layout has optimized lengths as default while vertical layout has same lengths as default.
     *
     * @param value {boolean} The new value.
     *                         true  -> optimized lengths
     *                         false -> same lengths
     * @param old {boolean} The old value.
     */
    _applySizeConstraint : function(value, old)
    {
      if(value != old && this._getChildren())
      {
        this.invalidateLayoutCache();
      }
    },

    /*
    ---------------------------------------------------------------------------
      CHILD HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Add button to a button pane with specified constraint.
     * The valid constraints are "affirmative", "cancel" and "help".
     *
     * The main purpose of the constraints is to determine how the buttons are
     * laid out on different platforms according to the OS convention. For example, on
     * Windows, affirmative button appears on the right hand side of cancel button.
     * On Mac OS X, affirmative button will appear on the left hand side of cancel button.
     *
     * @param button {qx.ui.form.Button} The button to add.
     * @param constraint {[ "affirmative" | "cancel" | "help" ]} The constraint used for the button.
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

      if(this.__buttonOrder.indexOf(button) != -1)
      {
        this.__buttonOrder.push(button);
      }

      var index = this._getChildren().length;

      if(constraint != null)
      {
        var constraints = this._getConstraints();

        if(constraint.match("affirmative|cancel|help") && !constraints[constraint])
        {
          button.setUserData("constraint", constraint);
        }
        else
        {
          this.debug("Illegal or double constraint " + constraint + ".");
        }

        if(this.getConstraint())
        {
          index = this._constrainButton(button, constraint);
        }
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
      var buttonOrder = this.__buttonOrder;
      buttonOrder.splice(buttonOrder.indexOf(button), 1);

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
      LAYOUT INTERFACE
    ---------------------------------------------------------------------------
    */

    // overridden
    renderLayout : function(left, top, width, height)
    {
      this._sizeConstrainButtons(this.getSizeConstraint());

      return this.base(arguments, left, top, width, height);
    },

    /*
    ---------------------------------------------------------------------------
      INTERNAL ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Get all constrained buttons.
     *
     * @return {Array#map} the constrained buttons.
     */
    _getConstraints : function()
    {
      var constraint;
      var constraints = [];
      var children = this._getChildren();

      for(var i = 0, l = children.length; i < l; i++)
      {
        constraint = children[i].getUserData("constraint");

        if(!constraints[constraint])
        {
          constraints[constraint] = children[i];
        }
      }

      return constraints;
    },

    /**
     * The main purpose of the constraints is to determine how the buttons are
     * laid out on different platforms according to the OS convention. For example, on
     * Windows, affirmative button appears on the right hand side of cancel button.
     * On Mac OS X, affirmative button will appear on the left hand side of cancel button.
     *
     * @param button {qx.ui.form.Button} The button to constrain.
     * @param constraint {[ "affirmative" | "cancel" | "help" | "other" ]} The constraint for the button.
     */
    _constrainButton : function(button, constraint)
    {
      // First remove the button if it has been added
      this.remove(button);

      var children = this._getChildren();
      var index = children.length;

      // Then add the button to the new position according to the standard of the OS
      var win = (qx.core.Environment.get("os.name") == "win");

      if(constraint == "affirmative")
      {
        this._addAt(button, win ? index : 0);
      }
      else
      {
        var constraints = this._getConstraints();
        var affirmative = constraints["affirmative"];

        if(constraint == "cancel")
        {
          win ? this._addAfter(button, children[index - !!affirmative]) : this._addBefore(button, children[!!affirmative]);
        }
        else
        {
          var cancel = (constraints["cancel"] ? 1 : 0);
  
          if(constraint == "help")
          {
            win ? this._addAfter(button, children[index - !!affirmative - !!cancel]) : this._addBefore(button, children[!!affirmative + !!cancel]);
          }
        }
      }
    },

    /**
     * Re-constrain all buttons.
     */
    _constrainButtons : function()
    {
      var children = this._getChildren();
      var l = children.length;

      for(var i = 0; i < l; i++)
      {
        this._constrainButton(children[i], children[i].getUserData("constraint"));
      }
    },

    /**
     * Resize the buttons according to sizeConstraint.
     *
     * @param value {boolean} True if size constrained.
     */
    _sizeConstrainButtons : function(value)
    {
      var children = this._getChildren();
      var len = children.length;

      if(!value && len && this.getOrientation() == "horizontal")
      {
        var widest = 0;
        var width;

        // Find the widest button
        for(var i = 0; i < len; i++)
        {
          width = children[i].getSizeHint().width;

          widest = widest < width ? width : widest;
        }
 
        // Set all button widths to widest
        for(var i = 0; i < len; i++)
        {
          children[i].setWidth(widest);
        }
      }
      else
      {
        if(value && len)
        {
          for(var i = 0, l = children.length; i < l; i++)
          {
            children[i].setAllowGrowX(!value);
            children[i].setAllowShrinkX(value);
          }
        }
      }
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
    }
  },

  /**
   * Destruct function.
   */
  destruct : function()
  {
    this._disposeArray("__buttonOrder");
  }
});

