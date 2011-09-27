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
 * 
 */
qx.Class.define("qxe.ui.wizard.Page",
{
  extend : qx.ui.groupbox.GroupBox,

  implement : qxe.ui.wizard.IPage,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} The label of the page.
   * @param previous {qxe.ui.wizard.IPage} The previous page to navigate to.
   * @param next {qxe.ui.wizard.IPage} The next page to navigate to.
   */
  construct : function(legend, icon, previous, next)
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
    /**
     * Adding fields of the page to the validator.
     *
     * @param validator {qx.ui.form.validation.Manager} The validator object to use.
     */
    _addValidators : function(validator)
    {
    },

    /**
     * Adding fields of the page to the serializer.
     *
     * @param controller {qx.data.controller.*} The controller object to use.
     *
     * @return {Json Array} Skeleton of fields.
     */
    _addSerializers : function(controller)
    {
      return null;
    },

    /**
     * Adding fields of the page to the resetter.
     *
     * @param resetter {qx.ui.form.Resetter} The resetter object to use.
     */
    _addResetter : function(resetter)
    {
    }
  }
});

