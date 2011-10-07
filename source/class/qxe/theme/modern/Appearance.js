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
      BUTTON PANE
    ---------------------------------------------------------------------------
    */

    "button-pane" : "widget",

    /*
    ---------------------------------------------------------------------------
      DECORATED WINDOW
    ---------------------------------------------------------------------------
    */

    "decorated-window/captionbar" :
    {
      style : function(states)
      {
        return {
          decorator : states.active ? "decorated-window-captionbar-active" : "decorated-window-captionbar-inactive",
          textColor : states.active ? "white" : "text-gray",
          minHeight : 26,
          padding   : states.rtl ? [ 0, 0, 0, 2 ] : [ 0, 2, 0, 0 ]
        };
      }
    },

    "decorated-window/title" :
    {
      style : function(states)
      {
        return {
          alignY : "middle",
          font   : "bold",
          margin : states.rtl ? [ 0, 6, 0, 12] : [ 0, 12, 0, 6]
        };
      }
    },

    "decorated-window/close-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "decoration/window/close-active-hovered.png" :
                                                  "decoration/window/close-active.png" :
                                                  "decoration/window/close-inactive.png",
          margin : states.rtl ? [ 4, 0, 2, 8 ] : [ 4, 8, 2, 0 ]
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      DIALOG
    ---------------------------------------------------------------------------
    */

    "dialog" :
    {
      style : function(states)
      {
        return {
          shadow : "shadow-window",
          contentPadding : [ 10, 10, 10, 10 ]
        };
      }
    },

    "dialog/pane" :
    {
      style : function(states)
      {
        return {
          decorator : "dialog"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      FRAME
    ---------------------------------------------------------------------------
    */

    "frame/icon" :
    {
      style : function(states)
      {
        return {
          margin : states.rtl ? [ 5, 6, 3, 0 ] : [ 5, 0, 3, 6 ]
        };
      }
    },

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

