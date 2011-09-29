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

qx.Class.define("qxe.demo.widget.Wizard",
{
  extend : qx.application.Standalone,

  members :
  {
    main: function()
    {
      this.base(arguments);

      var layout = new qx.ui.layout.Basic();

      var container = new qx.ui.container.Composite(layout);
      container.setPadding(10);
      this.getRoot().add(container);

      this.addWizard(container);
    },

    addWizard : function(container)
    {
      var wizard = new qxe.ui.wizard.Wizard();

      // The pages of the wizard
      var pageOne   = qxe.ui.wizard.Page();
      var pageTwo   = qxe.ui.wizard.Page();
      var pageThree = qxe.ui.wizard.Page();
      var pageFour  = qxe.ui.wizard.Page();
      var pageFive  = qxe.ui.wizard.Page();
      var pageSix   = qxe.ui.wizard.Page();

      container.add(pageOne);
      container.add(pageTwo);
      container.add(pageThree);
      container.add(pageFour);
      container.add(pageFive);
      container.add(pageSix);
    }
  }
});

