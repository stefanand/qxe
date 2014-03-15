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
      CALENDAR
    ---------------------------------------------------------------------------
    */

    "calendar-date-pane" :
    {
      style :
      {
        widthTop: 1,
        colorTop : "gray",
        style : "solid"
      }
    },

    "month-pane-weekday" :
    {
      style :
      {
        widthBottom: 1,
        colorBottom : "gray",
        style : "solid"
      }
    },

    "month-pane-week" :
    {
      style :
      {
        widthRight: 1,
        colorRight : "gray",
        style : "solid"
      }
    },

    "month-pane-week-header" :
    {
      style :
      {
        widthBottom : 1,
        colorBottom : "gray",
        widthRight: 1,
        colorRight : "gray",

        style : "solid"
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
    }
  }
});

