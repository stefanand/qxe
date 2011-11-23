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

  extend : qx.theme.modern.Appearance,

  appearances :
  {
    /*
    ---------------------------------------------------------------------------
      BUSY INDICATOR
    ---------------------------------------------------------------------------
    */

    "busy-indicator" : "widget",

    /*
    ---------------------------------------------------------------------------
      BUTTON PANE
    ---------------------------------------------------------------------------
    */

    "button-pane" : "widget",

    /*
    ---------------------------------------------------------------------------
      CAPTCHA
    ---------------------------------------------------------------------------
    */

    "captcha" : "widget",
    "captcha/captcha-box" : "groupbox",

    /*
    ---------------------------------------------------------------------------
      DECORATED WINDOW
    ---------------------------------------------------------------------------
    */

    "decorated-window" : "window",
    "decorated-window/captionbar" : "window/captionbar",
    "decorated-window/icon" : "window/icon",
    "decorated-window/title" : "window/title",
    "decorated-window/close-button" : "window/close-button",

    /*
    ---------------------------------------------------------------------------
      DIALOG
    ---------------------------------------------------------------------------
    */

    "dialog" : "window",

    /*
    ---------------------------------------------------------------------------
      FRAME
    ---------------------------------------------------------------------------
    */

    "frame" : "window",
    "frame/minimize-button" : "window/minimize-button",
    "frame/restore-button" : "window/restore-button",
    "frame/maximize-button" : "window/maximize-button",

    /*
    ---------------------------------------------------------------------------
      MULTI STATE BUTTON
    ---------------------------------------------------------------------------
    */

    "multi-state-button" : "button",

    /*
    ---------------------------------------------------------------------------
      OPTION PANE
    ---------------------------------------------------------------------------
    */

    "option-pane" : "widget",

    /*
    ---------------------------------------------------------------------------
      OPTION DIALOG
    ---------------------------------------------------------------------------
    */

    "option-dialog" : "dialog",

    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */

    "progressbar/status" : "label",

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

