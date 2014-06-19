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

************************************************************************ */

/**
 * A breadcrumb button
 */
qx.Class.define("qxe.ui.navigation.Link",
{
  extend : qxe.ui.form.MenuAtom,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, icon, menu)
  {
    this.base(arguments, label, icon, menu);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "breadcrumb-link"
    },

    show :
    {
      refine : true,
      init : "inherit"
    },

    focusable :
    {
      refine : true,
      init : false
    },

    /** Parameters enables collapsing of link text. */
    collapsible :
    {
      check : "Boolean",
      init : false,
      nullable : false,
      event : "changeCollapsible"
    },

    /** Width of collapsed level. */
    collapseWidth :
    {
      check : "Integer",
      init : 10,
      nullable : true,
      event : "changeCollapseWidth"
    },

    /** Active menu attached to the link items. */
    menuActive :
    {
      check : "Boolean",
      init : false,
      nullable : false,
      event : "changeMenuActive"
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
      HELPER METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Inspects the parent chain to find the Breadcrumb
     *
     * @return {qxe.ui.navigation.Breadcrumb} Breadcrumb instance or <code>null</code>.
     */
    getBreadcrumb : function()
    {
      var parent = this;
      while (parent)
      {
        /* this method is also used by breadcrumb.MenuAtom, so we need to check
           for a Breadcrumb instance. */
        if (parent instanceof qxe.ui.navigation.Breadcrumb) {
          return parent;
        }

        parent = parent.getLayoutParent();
      }

      return null;
    },


    // overridden
    open : function(selectFirst) {
      this.base(arguments, selectFirst);

      var breadcrumb = this.getBreadcrumb();
      if (breadcrumb) {
        breadcrumb._setAllowMenuOpenHover(true);
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
      var breadcrumb = this.getBreadcrumb();

      if (menu.isVisible())
      {
        this.addState("pressed");

        // Sync with open menu property
        if (breadcrumb) {
          breadcrumb.setOpenMenu(menu);
        }
      }
      else
      {
        this.removeState("pressed");

        // Sync with open menu property
        if (breadcrumb && breadcrumb.getOpenMenu() == menu) {
          breadcrumb.resetOpenMenu();
          breadcrumb._setAllowMenuOpenHover(false);
        }
      }
    },

    // overridden
    _onPointerUp : function(e)
    {
      this.base(arguments, e);

      // Set state 'pressed' to visualize that the menu is open.
      var menu = this.getMenu();
      if (menu && menu.isVisible() && !this.hasState("pressed")) {
        this.addState("pressed");
      }
    },

    /**
     * Event listener for pointerover event
     *
     * @param e {qx.event.type.Pointer} pointerover event object
     */
    _onPointerOver : function(e)
    {
      // Add hovered state
      this.addState("hovered");

      // Open submenu
      if (this.getMenu() && e.getPointerType() == "mouse")
      {
        var breadcrumb = this.getBreadcrumb();

        if (breadcrumb && breadcrumb._isAllowMenuOpenHover())
        {
          // Hide all open menus
          qx.ui.menu.Manager.getInstance().hideAll();

          // Set it again, because hideAll remove it.
          breadcrumb._setAllowMenuOpenHover(true);

          // Then show the attached menu
          if (this.isEnabled()) {
            this.open();
          }
        }
      }
    }
  }
});
