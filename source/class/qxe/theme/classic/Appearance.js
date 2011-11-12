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

# asset(qxe/decoration/Classic/*)

************************************************************************* */

qx.Theme.define("qxe.theme.classic.Appearance",
{
  title : "qxe classic appearance theme",

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

    "wizard" : "widget",
    "wizard-page" : "groupbox"
  }
});

