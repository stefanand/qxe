/* ****************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

**************************************************************************** */

/* ****************************************************************************

**************************************************************************** */

/**
 * A status bar pane.
 */
qx.Class.define("qxe.ui.statusbar.Pane",
{
  extend : qx.ui.core.Widget,
  implement : qxe.ui.statusbar.IPane,
  type : "abstract",


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
      init : "statusbar-pane"
    }
  }
});

