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
 * A wizard consists of a collection of pages which are all one step in the
 * wizard.
 */
qx.Class.define("qxe.ui.wizard.Page",
{
  extend : qx.ui.groupbox.GroupBox,

  implement : qxe.ui.wizard.IPage,

//  type : "abstract",

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param legend {String} The label of the page.
   * @param icon {String} The icon of the page.
   */
  construct : function(legend, icon)
  {
    this.base(arguments);
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
      init : "wizard-page"
    },

    /**
     * Previous page to navigate to.
     */
    previous :
    {
      check : "qxe.ui.wizard.Page",
      nullable : true,
      init : null,
      event : "changePrevious"
    },

    /**
     * Next page to navigate to.
     */
    next :
    {
      check : "qxe.ui.wizard.Page",
      nullable : true,
      init : null,
      event : "changeNext"
    },


    /*
    ---------------------------------------------------------------------------
      BASIC OPTIONS
    ---------------------------------------------------------------------------
    */

    /**
     * Whether to allow to go to the previous wizard pane.
     */
    allowPrevious :
    {
      check : "Boolean",
      init : false,
      event : "changeAllowPrevious"
    },

    /**
     * Whether to allow to go to the next wizard pane.
     */
    allowNext :
    {
      check : "Boolean",
      init : false,
      event : "changeAllowNext"
    }
  }
});

