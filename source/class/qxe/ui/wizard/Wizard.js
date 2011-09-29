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
      }

      return control || this.base(arguments, id);
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
     * Remove a page from the Wizard.
     *
     * @param page {qxe.ui.wizard.Page} The page to be removed.
     */
    remove : function(page)
    {
      this.getChildControl("stack-pane").remove(page);
    },

    /**
     * Return Wizard's children widgets.
     *
     * @return {qxe.ui.wizard.Page[]} List of children.
     */
    getChildren : function()
    {
      return this.getChildControl("stack-pane").getChildren();
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
        if(stack.indexOf(current))
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
  }
});

