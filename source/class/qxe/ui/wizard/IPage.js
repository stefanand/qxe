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
 * An interface for the wizard pages.
 */
qx.Interface.define("qxe.ui.wizard.IPage",
{
  members :
  {
    /**
     *
     */
    _addValidators : function(validator)
    {
      this.assertInstance(validator, qx.ui.form.validation.Manager);
    },

    /**
     *
     */
    _addSerializers : function(controller)
    {
      this.assertInstance(controller, qx.data.controller.Object);
    },

    /**
     *
     */
    _addResetter : function(resetter)
    {
      this.assertInstance(resetter, qx.ui.form.Resetter);
    }
  }
});
