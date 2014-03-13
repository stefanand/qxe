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
 * Registering program modules.
 */
qx.Mixin.define("qxe.application.MModules",
{
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.__modules = [];
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** Registered program modules. */
    __modules : null,


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Register a program module.
     *
     * @param name {String} The program module name.
     * @param clazz {qx.Object} The instance of program module.
     */
    registerModule : function(name, clazz)
    {
      this.__modules[name] = clazz;
    },

    /**
     * Register a program module.
     *
     * @param name {String} The program module name.
     */
    unregisterModule : function(name)
    {
      var modules = this.__modules;
      modules.splice(modules.indexOf(name), 1);
    },
	
    /**
     * Lookup a program module.
     *
     * @param name {String} The program module name.
     * @return {qx.Object} The instance of program module.
     */
    lookupModule : function(name)
    {
      return this.__modules[name];
    }
  },

  /**
   * Destruct.
   */
  destruct : function()
  {
    this.__modules = null;
  }
});

