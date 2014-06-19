/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2014 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

   TODO:
     - current link item shall be hi-lighted (bold)
     - current link item hovered shall be hi-lighted (bold) and blue
     - any non-current link item hovered shall become blue

     - collapsible: true/false,
       showEffect: "slide"/fade,

************************************************************************ */

/**
 * An atom which opens the connected menu when hovering on it.
 */
qx.Class.define("qxe.ui.form.MenuAtom",
{
  extend : qx.ui.form.Button,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Initial label
   * @param icon {String?null} Initial icon
   * @param menu {qx.ui.menu.Menu} Connect to menu instance
   */
  construct : function(label, icon, menu)
  {
    this.base(arguments, label, icon);

    // Initialize properties
    if (menu != null) {
      this.setMenu(menu);
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
      init : "menuatom"
    },

    /** The menu instance to show when hovering on the atom */
    menu :
    {
      check : "qx.ui.menu.Menu",
      nullable : true,
      apply : "_applyMenu",
      event : "changeMenu"
    },

    /** Action to activate menu. */
    menuAction :
    {
      check : ["click", "hover"],
      init : "hover",
      nullable : false,
      event : "changeMenuAction"
    },
    
    /**
     * The time in milliseconds of menu to open.
     * If null then no transition is used.
     */
    menuOpenTime :
    {
      check : "Integer",
      init : 800,
      nullable : true,
      event : "changeMenuOpenTime"
    },

    /**
     * The time in milliseconds of menu to close.
     * If null then no transition is used.
     */
    menuCloseTime :
    {
      check : "Integer",
      init : 100,
      nullable : true,
      event : "changeMenuCloseTime"
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
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */
    // overridden
    _applyVisibility : function(value, old) {
      this.base(arguments, value, old);

      // hide the menu too
      var menu = this.getMenu();
      if (value != "visible" && menu) {
        menu.hide();
      }
    },


    // property apply
    _applyMenu : function(value, old)
    {
      if (old)
      {
        old.removeListener("changeVisibility", this._onMenuChange, this);
        old.resetOpener();
      }

      if (value)
      {
        value.addListener("changeVisibility", this._onMenuChange, this);
        value.setOpener(this);

        value.removeState("submenu");
        value.removeState("contextmenu");
      }
    },




    /*
    ---------------------------------------------------------------------------
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Positions and shows the attached menu widget.
     *
     * @param selectFirst {Boolean?false} Whether the first menu button should be selected
     */
    open : function(selectFirst)
    {
      var menu = this.getMenu();

      if (menu)
      {
        // Hide all menus first
        qx.ui.menu.Manager.getInstance().hideAll();

        // Open the attached menu
        menu.setOpener(this);
        menu.open();
        menu.fadeIn(this.getMenuOpenTime());

        // Select first item
        if (selectFirst)
        {
          var first = menu.getSelectables()[0];
          if (first) {
            menu.setSelectedButton(first);
          }
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener for visibility property changes of the attached menu
     *
     * @param e {qx.event.type.Data} Property change event
     */
    _onMenuChange : function(e)
    {
      var menu = this.getMenu();

      if (menu.isVisible()) {
        this.addState("pressed");
      } else {
        this.removeState("pressed");
      }
    },


    // overridden
    _onPointerDown : function(e) {
      // call the base function to get into the capture phase [BUG #4340]
      this.base(arguments, e);

      // only open on left clicks [BUG #5125]
      if(e.getButton() != "left" || this.getMenuAction() != "click") {
        return;
      }

      var menu = this.getMenu();
      if (menu) {
        // Toggle sub menu visibility
        if (!menu.isVisible()) {
          this.open();
        } else {
          var menuCloseTime = this.getMenuCloseTime();
          menu.fadeOut(menuCloseTime);

          // Delay exclusion to after fadeOut
          window.setTimeout(function(userData, timerId) {
        	menu.exclude();
          }, menuCloseTime);
        }

        // Event is processed, stop it for others
        e.stopPropagation();
      }
    },


    // overridden
    _onPointerUp : function(e) {
      // call base for firing the execute event
      this.base(arguments, e);

      // Just stop propagation to stop menu manager
      // from getting the event
      e.stopPropagation();
    },


    // overridden
    _onPointerOver : function(e) {
      // Add hovered state
      this.addState("hovered");

      if(this.getMenuAction() != "hover")
      {
        return;
      }

      var menu = this.getMenu();
      if (menu) {
        // Toggle sub menu visibility
        if (!menu.isVisible()) {
          this.open();
        }

        // Event is processed, stop it for others
        e.stopPropagation();
      }
    },


    // overridden
    _onPointerOut : function(e) {
      // Just remove the hover state
      this.removeState("hovered");

      if(this.getMenuAction() != "hover")
      {
        return;
      }

      var menu = this.getMenu();
      if (menu) {
        // Toggle sub menu visibility
        if (menu.isVisible()) {
          var menuCloseTime = this.getMenuCloseTime();
          menu.fadeOut(menuCloseTime);

          // Delay exclusion to after fadeOut
          window.setTimeout(function(userData, timerId) {
        	menu.exclude();
          }, menuCloseTime);
        }

        // Event is processed, stop it for others
        e.stopPropagation();
      }
    }
  }
});
