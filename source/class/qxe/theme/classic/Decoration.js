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

qx.Theme.define("qxe.theme.classic.Decoration",
{
  decorations :
  {
    /*
    ---------------------------------------------------------------------------
      DOCUMENTVIEWER
    ---------------------------------------------------------------------------
    */

    "visual-pane" :
    {
      decorator: qx.ui.decoration.Single,

      style :
      {
        backgroundColor : "visual-pane-background",
        widthTop : 1,
        colorTop : "border-main",
        style    : "solid"
      }
    }
  }
});

