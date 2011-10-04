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
          padding : 1,
          backgroundColor : states.active ? "dialog-active-caption" : "dialog-inactive-caption",
          textColor : states.active ? "dialog-active-caption-text" : "dialog-inactive-caption-text"
        };
      }
    },

    "decorated-window/title" :
    {
      style : function(states)
      {
        return {
          cursor : "default",
          font : "bold",
          margin : states.rtl ? [ 0, 0, 0, 20] : [ 0, 20, 0, 0],
          alignY: "middle"
        };
      }
    },

    "decorated-window/close-button" :
    {
      include : "button",
      alias : "button",

      style : function(states)
      {
                                var rtl = states.rtl;

        return {
          margin : rtl ? [ 0, 2, 0, 0 ] : [ 0, 0, 0, 2 ],
          icon : "decoration/window/close.gif",
          padding : states.pressed || states.abandoned ? (rtl ? [ 2, 3, 0, 1] : [ 2, 1, 0, 3]) : [ 1, 2 ]
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
          contentPadding : [ 10, 10, 10, 10 ],
          backgroundColor : "background",
          decorator : states.maximized ? undefined : "outset",
          shadow : states.maximized ? undefined : "shadow-small"
        };
      }
    },

    "dialog/pane" : {},

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
          margin : states.rtl ? [ 0, 0, 0, 4] : [ 0, 4, 0, 0]
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

    "wizard" : "widget",
    "wizard-page" : "groupbox"
});

