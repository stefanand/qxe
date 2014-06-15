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
      BREADCRUMB
    ---------------------------------------------------------------------------
    */

    "breadcrumb" :
    {
      style :
      {
        gradientStart : ["menubar-start", 0],
        gradientEnd : ["menu-end", 100],

        width : 1,
        color : "border-separator"
      }
    },

    "breadcrumb-separator" :
    {
      style :
      {
        widthTop    : 1,
        colorTop    : "menu-separator-top",

        widthBottom : 1,
        colorBottom : "menu-separator-bottom"
      }
    },

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

    "decorated-window-resize-frame" : "window-resize-frame",

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
    },

    /*
    ---------------------------------------------------------------------------
      TITLEPANE
    ---------------------------------------------------------------------------
    */

    "title-pane" :
    {
      style : {
        radius : [5, 5, 0, 0],
        shadowBlurRadius : 4,
        shadowLength : 2,
        shadowColor : "shadow"
      }
    },

    "title-pane-captionbar-active" :
    {
      style : {
        width : 1,
        color : "window-border",
        colorBottom : "window-border-caption",
        radius : [5, 5, 0, 0],
        gradientStart : ["window-caption-active-start", 30],
        gradientEnd : ["window-caption-active-end", 70]
      }
    },

    "title-pane-captionbar-inactive" :
    {
      include : "title-pane-captionbar-active",
      style : {
        gradientStart : ["window-caption-inactive-start", 30],
        gradientEnd : ["window-caption-inactive-end", 70]
      }
    },

    "title-pane" :
    {
      style :
      {
        backgroundColor : "background-pane",
        width : 1,
        color : "window-border",
        widthTop : 0
      }
    },

    /*
    ---------------------------------------------------------------------------
       WINDOW
    ---------------------------------------------------------------------------
    */

    "window" :
    {
      style : {
        shadowLength : 2,
        shadowColor : "shadow"
      }
    },

    "window-pane" :
    {
      style :
      {
        backgroundColor : "background-pane",
        width : 1,
        color : "window-border"
      }
    }
  }
});
