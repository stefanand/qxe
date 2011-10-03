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

#asset(qx/icon/${qx.icontheme}/16/actions/go-previous.png)
#asset(qx/icon/${qx.icontheme}/16/actions/go-next.png)

************************************************************************ */

/**
 * A wizard is a multi page view where only one page is visible at each time.
 * Each page is a step following the wizard. The different steps can be conditional
 * and validated. It is possible to navigate between the pages by the previous and
 * next buttons, and by typing in the step number in the field.
 *
 * The following features are included in the wizard widget:
 *  - Easy to implement wizard widget.
 *  - Assemble a Wizard from a series of pages.
 *  - Support for multiple branches (dynamically changing sets of steps)
 *  - Option for specifying first selected step.
 *  - Option for making all steps enabled.
 *  - Step titles are act as anchors.
 *  - Easy Navigation to next or previous page.
 *  - Both vertical and horizontal navigation widgets possible.
 *  - Validation for each step and when finish the wizard.
 *  - Pages can be validated as the user interacts, or when the user presses next.
 *  - Support for long running operations with progress indication.
 *  - Support for end-of-wizard summary panels
 */
qx.Class.define("qxe.ui.wizard.Wizard",
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

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("stack-pane");
    this._createChildControl("navigation-pane");
    this._createChildControl("button-pane");

    this.addListenerOnce("appear", this._onAppearOnce, this);
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
      init : "wizard"
    },

    /**
     * Controller of the wizard.
     */
    controller :
    {
      check : "qx.data.controller.Object",
      init : new qx.data.controller.Object(),
      event : "changeController",
      apply : "_applyController"
    },

    /**
     * Validator of the wizard.
     */
    validator :
    {
      check : "qx.ui.form.validation.Manager",
      init : new qx.ui.form.validation.Manager(),
      event : "changeValidator",
      apply : "_applyValidator"
    },

    /**
     * Resetter of the wizard.
     */
    resetter :
    {
      check : "qx.ui.form.Resetter",
      init : new qx.ui.form.Resetter(),
      event : "changeResetter"
    },

    /**
     * Whether to allow to finish the wizard. 
     * The finish property is set to true when the validation has passed and coming to the last page.
     */
    allowFinish :
    {
      check : "Boolean",
      init : false,
      event : "changeAllowFinish"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // create the data model
    __skeleton : {},

    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
      var layout;
      var widget;
      var tooltip;
      var def;

      switch(id)
      {
        /*
        ---------------------------------------------------------------------------
          CREATE #1: STACK PANE
        ---------------------------------------------------------------------------
        */
        case "stack-pane":
          control = new qx.ui.container.Stack();
          control.setDecorator("main");
          control.addListener("changeSelection", this._onChangeSelection, this);

          this._add(control);
          break;

        /*
        ---------------------------------------------------------------------------
          CREATE #2: NAVIGATION PANE
        ---------------------------------------------------------------------------
        */
        case "navigation-pane":
          layout = new qx.ui.layout.HBox(5);

          control = new qx.ui.container.Composite(layout);
          control.setMargin(5, 10);

          control.add(this._createChildControl("previous-button"));

          var spacer1 = new qx.ui.core.Spacer();
          spacer1.setAllowGrowX(true);

          control.add(spacer1, {flex : 1});

          control.add(this._createChildControl("step-navigation"));

          var spacer2 = new qx.ui.core.Spacer();
          spacer2.setAllowGrowX(true);

          control.add(spacer2, {flex : 1});

          control.add(this._createChildControl("next-button"));

          this._add(control);
          break;

        case "previous-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to previous step."));

          control = new qx.ui.form.Button(this.tr("Previous"), "icon/16/actions/go-previous.png");
          control.addListener("execute", this._onExecutePrevious, this);
          control.setToolTip(tooltip);
          control.setIconPosition("left");
          break;

        case "step-navigation":
          layout = new qx.ui.layout.HBox(4);

          control = new qx.ui.container.Composite(layout);

          widget = this._createChildControl("current-step");

          var label = new qx.ui.basic.Label(this.tr("Step"));
          label.setBuddy(widget);
          label.setAlignY("middle");

          control.add(label);

          control.add(widget);

          widget = this._createChildControl("num-steps");

          label = new qx.ui.basic.Label("/");
          label.setBuddy(widget);
          label.setAlignY("middle");

          control.add(label);

          control.add(widget);
          break;

        case "current-step":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Current step in the wizard."));

          control = new qx.ui.form.TextField();
          control.setReadOnly(true);
          control.setWidth(20);
          control.setToolTip(tooltip);
          break;

        case "num-steps":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Number of steps in the wizard."));

          control = new qx.ui.form.TextField();
          control.setReadOnly(true);
          control.setWidth(20);
          control.setToolTip(tooltip);
          break;

        case "next-button":
          tooltip = new qx.ui.tooltip.ToolTip(this.tr("Go to next step."));

          control = new qx.ui.form.Button(this.tr("Next"), "icon/16/actions/go-next.png");
          control.addListener("execute", this._onExecuteNext, this);
          control.setToolTip(tooltip);
          control.setIconPosition("right");
          break;

        case "button-pane":
          control = new qxe.ui.form.ButtonPane(qxe.ui.form.ButtonPane.CUSTOM);
          // ??? control.setAlignX("center");
          control._getLayout().setAlignX("center");
          control.setMargin(5);

          control.add(this._createChildControl("affirm-button"), "affirm")
          control.add(this._createChildControl("reset-button"))
          control.add(this._createChildControl("cancel-button"), "cancel");
          break;

        case "affirm-button":
          control = new qx.ui.form.Button();
          control.setUserData("name", "FINISH");
          control.setLabel(this.tr("Finish"));
          control.setIcon(""),
          control.setToolTipIcon("qx/icon/16/actions/help-about.png");
          control.setToolTipText(this.tr("Finish wizard."));
          control.setEnabled(false);
          break;

        case "reset-button":
          control = new qx.ui.form.Button();
          control.setUserData("name", "RESET");
          control.setLabel(this.tr("Reset"));
          control.setIcon(""),
          control.setToolTipIcon("qx/icon/16/actions/help-about.png");
          control.setToolTipText(this.tr("Reset the fields of the wizard."));
          control.setEnabled(false);
          break;

        case "cancel-button":
          control = new qx.ui.form.Button();
          control.set(qxe.ui.form.ButtonPane.CANCEL);
          control.setUserData("name", "CANCEL");
          control.setToolTipText(this.tr("Cancel the wizard."));
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the controller.
     *
     * The controller connects all fields of the wizard.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyController : function(value, old)
    {
      // create the controller and connect all fields
//      var controller = new qx.data.controller.Object();
    },

    /**
     * Apply method for the validator.
     *
     * Validates all attached fields of the wizard.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyValidator : function(value, old)
    {
      if(value)
      {
        value.setRequiredFieldMessage(this.tr("This field is required."));
        value.setInvalidMessage(this.tr("The validation of data failed."));

        old = null;
      }
    },

    /**
     * Apply method for the resetter.
     *
     * Resets all attached fields of the wizard.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyResetter : function(value, old)
    {
//      var resetter = this.__resetter = new qx.ui.form.Resetter();
//      old = null;
    },

    /*
    ---------------------------------------------------------------------------
      CHILDREN HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Add a page to the wizard.
     *
     * @param page {qxe.ui.wizard.Page} The page which should be added.
     */
    add : function(page)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(page instanceof qxe.ui.wizard.Page))
        {
          throw new Error("Incompatible child for Wizard: " + page);
        }
      }

      this.getChildControl("stack-pane").add(page);
    },

    /**
     * Remove a page from the wizard.
     *
     * @param page {qxe.ui.wizard.Page} The page to be removed.
     */
    remove : function(page)
    {
      this.getChildControl("stack-pane").remove(page);
    },

    /**
     * Return child pages.
     *
     * @return {qxe.ui.wizard.Page[]} List of children.
     */
    getChildren : function()
    {
      return this.getChildControl("stack-pane").getChildren();
    },

    /**
     * Add fields for model.
     *
     * @param e {json} Fields to append to model.
     */
    addControlFields : function(items)
    {
      var skeleton = this.__skeleton;

      // Append items (json format) to the model skeleton
      for(var key in items)
      {
        skeleton[key] = items[key];
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for <code>onappear</code>.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onAppearOnce : function()
    {
      var model = qx.data.marshal.Json.createModel(this.__skeleton, true);

      this.getController().setModel(model);

      // validate on every change of the model
      model.addListener("changeBubble", function(e) {
        this.getValidator().validate();
      }, this);

      // invoke the inital validate
      this.getValidator().validate();

      // switch the submit button on and off
      this.getValidator().bind("valid", this.__submitB, "enabled");
    },

    /**
     * Event handler for <code>changeSelection</code>.
     *
     * @param e {qx.event.type.Data} Data event.
     */
     _onChangeSelection : function(e)
    {
      var stack = this.getChildControl("stack-pane");

      var index = stack.indexOf(stack.getSelection()[0]);

      if(index == 0)
      {
        this.getChildControl("previous-button").setEnabled(false);
      }
      else if(index == (stack.getChildren().length - 1))
      {
        this.getChildControl("next-button").setEnabled(false);
      }
      else
      {
        this.getChildControl("previous-button").setEnabled(true);
        this.getChildControl("next-button").setEnabled(true);
      }

      this.getChildControl("current-step").setValue("" + (index + 1));
      this.getChildControl("num-steps").setValue("" + stack.getChildren().length);
    },

    /**
     * Event handler for <code>execute</code> of the previous button.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onExecutePrevious : function(e)
    {
      this.previous();
    },

    /**
     * Event handler for <code>execute</code> of the next button.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onExecuteNext : function(e)
    {
      this.next();
    },

    /*
    ---------------------------------------------------------------------------
      NAVIGATION
    ---------------------------------------------------------------------------
    */

    /**
     * Navigate to previous page.
     */
    previous : function()
    {
      var stack = this.getChildControl("stack-pane");
      var current = stack.getSelection()[0];
      var previous = current.getPrevious();

      if(previous != null)
      {
        stack.setSelection([previous]);
      }
      else
      {
        if(stack.indexOf(current))
        {
          stack.previous();
        }
      }
    },

    /**
     * Navigate to next page.
     */
    next : function()
    {
      var stack = this.getChildControl("stack-pane");
      var current = stack.getSelection()[0];
      var next = current.getNext();

      if(next != null)
      {
        stack.setSelection([next]);
      }
      else
      {
        if(stack.indexOf(current) < (stack.getChildren().length - 1))
        {
          stack.next();
        }
      }
    },

    /**
     * Enable all pages.
     */
    enablePages : function()
    {
      var children = this.getChildControl("stack-pane").getChildren();

      for(var i = 0, l = children.length; i < l; i++)
      {
        children[i].setEnabled();
      }
    }
  },

  destruct : function()
  {
    this.__skeleton = null;
  }
});

