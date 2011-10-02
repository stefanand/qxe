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

#asset(qx/icon/Tango/16/actions/dialog-cancel.png)
#asset(qx/icon/Tango/16/actions/dialog-ok.png)

# asset(qx/decoration/Modern/*)

************************************************************************* */

qx.Theme.define("qxe.theme.modern.Appearance",
{
  title : "qxe modern appearance theme",

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
  }
});

