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

qx.Theme.define("qxe.theme.modern.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    /*
    ---------------------------------------------------------------------------
      CALENDAR
    ---------------------------------------------------------------------------
    */

    "calendar" :
    {
      style :
      {
        backgroundColor : "calendar-background"
      }
    },

    /*
    ---------------------------------------------------------------------------
      DECORATED WINDOW
    ---------------------------------------------------------------------------
    */

    "decorated-window-captionbar-active" :
    {
      style : {
        baseImage : "decoration/window/captionbar-active.png"
      }
    },

    "decorated-window-captionbar-inactive" :
    {
      style : {
        baseImage : "decoration/window/captionbar-inactive.png"
      }
    },

    /*
    ---------------------------------------------------------------------------
      DIALOG
    ---------------------------------------------------------------------------
    */

    "dialog" :
    {
      style :
      {
        backgroundColor : "background-pane",

        width : 1,
        color : "border-main",
        widthTop : 0
      }
    },

    /*
    ---------------------------------------------------------------------------
      DOCUMENTVIEWER
    ---------------------------------------------------------------------------
    */

    "visual-pane" :
    {
      style :
      {
        backgroundColor : "visual-pane-background",
        widthTop : 1,
        colorTop : "border-main",
        style    : "solid"
      }
    },

    /*
    ---------------------------------------------------------------------------
      WEBDESKTOP
    ---------------------------------------------------------------------------
    */

    "webdesktop" :
    {
      style :
      {
        backgroundColor : "webdesktop-background"
      }
    }
  }
});

