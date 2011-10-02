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

/* ************************************************************************

#asset(qx/icon/Oxygen/16/actions/dialog-cancel.png)
#asset(qx/icon/Oxygen/16/actions/dialog-ok.png)

# asset(qxe/decoration/Classic/*)

************************************************************************* */

qx.Theme.define("qxe.theme.classic.Appearance",
{
  title : "qxe classic appearance theme",

  appearances :
  {
    /*
    ---------------------------------------------------------------------------
      BUTTON PANE
    ---------------------------------------------------------------------------
    */

		"button-pane" : "widget",

    /*
    ---------------------------------------------------------------------------
      OPTION PANE
    ---------------------------------------------------------------------------
    */

		"option-pane" : "widget",

    /*
    ---------------------------------------------------------------------------
      WIZARD
    ---------------------------------------------------------------------------
    */

    // Inherits from respective parent
    "wizard" : "widget",
    "wizard-page" : "groupbox"
});

