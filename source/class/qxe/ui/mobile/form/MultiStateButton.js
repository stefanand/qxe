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
 * A multi-state Button widget.
 *
 * If the user presses the button by clicking on it, pressing the enter or
 * space key, the button toggles between the different states. Each state has its own
 * atom definitions.
 */
qx.Class.define("qxe.ui.mobile.form.MultiStateButton",
{
  extend : qx.ui.mobile.form.Button,
  implement : qx.ui.core.ISingleSelection,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a MultiStateButton.
   *
   * @param command {qx.ui.core.Command?null} Command instance to connect with
   */
  construct : function(command)
  {
    this.base(arguments, null, null, command);

    this.__atoms = [];
    this.__maxSize = {
      height : 0,
      width : 0
    };
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties:
  {
    // overridden
    appearance:
    {
      refine: true,
      init: "multi-state-button"
    },

    /**
     * Whether the size of the widget depends on the selected button state. When
     * disabled (default) the size is configured to the largest child.
     */
    dynamic :
    {
      check : "Boolean",
      init : false,
      apply : "_applyDynamic"
    }
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /** Fires after the selection was modified */
    "changeSelection" : "qx.event.type.Data"
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __selection : null,
    __atoms : null,
    __maxSize : null,


    /**
     * Calculates the biggest size; height and width, for non-dynamic size behaviour.
     *
     * @param atom {json} Button state json definition.
     * @return {void}
     */
    __calcSize : function(atom)
    {
      var button = new qx.ui.mobile.form.Button();
      button.set(atom);

      var sizeHint = button.getSizeHint();
      var maxSize = this.__maxSize;

      maxSize.height = (maxSize.height > sizeHint.height) ? maxSize.height : sizeHint.height;
      maxSize.width = (maxSize.width > sizeHint.width) ? maxSize.width : sizeHint.width;
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyDynamic : function(value, oldValue)
    {
      var children = this.__atoms;
      var selected = this.__selection;
      var child;

      if (!value && value != oldValue) {
        for (var i=0, l=children.length; i<l; i++)
        {
          this.__calcSize(children[i]);
        }

        var maxSize = this.__maxSize;
        this.setHeight(maxSize.height);
        this.setWidth(maxSize.width);
      }
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener method for "mouseup" event
     * <ul>
     * <li>Removes "pressed" state (if set)</li>
     * <li>Removes "abandoned" state (if set)</li>
     * <li>Adds "hovered" state (if "abandoned" state is not set)</li>
     *</ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseUp : function(e)
    {
      this.base(arguments, e);

      this.setSelection((this.getSelection() + 1) % this.__atoms.length);
    },

    /**
     * Listener method for "keyup" event.<br/>
     * Removes "abandoned" and "pressed" state (if "pressed" state is set)
     * for the keys "Enter" or "Space"
     *
     * @param e {Event} Key event
     * @return {void}
     */
    _onKeyUp : function(e)
    {
      this.base(arguments, e);

      this.setSelection((this.getSelection() + 1) % this.__atoms.length);
    },

    /*
    ---------------------------------------------------------------------------
      BUTTON STATE HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Adds a button state to the multistate button.
     *
     * @param label {String} The label which should be added.
     * @param icon {String} The icon which should be added.
     * @param toolTipText {String} The tooltip text which should be added.
     */
    addButtonState : function(label, icon, toolTipText)
    {
      var atoms = this.__atoms;
      var atom = {
        label : label,
        icon : icon,
        toolTipText : toolTipText || null
      };

      atoms.push(atom);

      // Calculate size hint
      // No better way to do it if not the states should be added as buttons.
      // It would not be logical as it should be the same button
      if(!this.isDynamic())
      {
        this.__calcSize(atom);

        var maxSize = this.__maxSize;
        this.setHeight(maxSize.height);
        this.setWidth(maxSize.width);
      }

      // Set selection
			if(atoms.length == 1)
			{
				this.setSelection(0);
			}
    },

    /**
     * Removes a button state from the MultiStateButton.
     *
     * @param index {Integer} The button state index to be removed.
     */
    removeButtonState : function(index)
    {
      var atoms = this.__atoms;

      // Try to select next button state
      if (this.getSelection() == index)
      {
        if (index == 0)
        {
          if (atoms[1])
					{
            this.setSelection(1);
          }
					else
					{
            this.resetSelection();
          }
        }
        else
        {
          this.setSelection(index - 1);
        }
      }

      atoms.slice(index, 1);
    },


    /*
    ---------------------------------------------------------------------------
      SELECTION API
    ---------------------------------------------------------------------------
    */

    /**
     * Returns an array of currently selected items.
     *
     * Note: The result is only a set of selected items, so the order can
     * differ from the sequence in which the items were added.
     *
     * @return {qx.ui.core.Widget[]} List of items.
     */
    getSelection : function()
    {
      return this.__selection;
    },

    /**
     * Replaces current selection with the given items.
     *
     * @param items {qx.ui.core.Widget[]} Items to select.
     * @throws an exception if the item is not a child element.
     */
    setSelection : function(items)
    {
      var oldSelection = this.getSelection();

      this.__selection = items;
      this.set(this.__atoms[items]);

      this.fireDataEvent("changeSelection", items, oldSelection);
    },

    /**
     * Clears the whole selection at once.
     */
    resetSelection : function()
    {
      this.setSelection(0);
    },

    /**
     * Detects whether the given item is currently selected.
     *
     * @param item {qx.ui.core.Widget} Any valid selectable item
     * @return {Boolean} Whether the item is selected.
     * @throws an exception if the item is not a child element.
     */
    isSelected : function(item) {
      return item == this.__selection;
    },

    /**
     * Whether the selection is empty.
     *
     * @return {Boolean} Whether the selection is empty.
     */
    isSelectionEmpty : function() {
      return false;
    },

    /**
     * Returns all elements which are selectable.
     *
     * @param all {boolean} true for all selectables, false for the
     *   selectables the user can interactively select
     * @return {qx.ui.core.Widget[]} The contained items.
     */
    getSelectables: function(all) {
      return this.__atoms;
    }
  }
});
