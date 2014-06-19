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
 * This widget draws a separator between two instances of
 * {@link qxe.ui.navigation.Link} and is inserted into the
 * {@link qxe.ui.navigation.Breadcrumb}.
 *
 * For convenience reasons there is also
 * a method {@link qxe.ui.navigation.Breadcrumb#addSeparator} to append
 * instances of this class to the breadcrumb.
 */
qx.Class.define("qxe.ui.navigation.Separator",
{
  extend : qx.ui.core.Widget,




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
      init : "breadcrumb-separator"
    },

    // overridden
    anonymous :
    {
      refine : true,
      init : true
    }
  }
});
