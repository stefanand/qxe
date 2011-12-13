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
      ANALOG CLOCK
    ---------------------------------------------------------------------------
    */

    "analog-clock" : "widget",

    /*
    ---------------------------------------------------------------------------
      BINARY CLOCK
    ---------------------------------------------------------------------------
    */

    "binary-clock" : "widget",

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
      CLOCK
    ---------------------------------------------------------------------------
    */

    "clock" : "widget",

    /*
    ---------------------------------------------------------------------------
      COUNTER
    ---------------------------------------------------------------------------
    */

    "counter" : "widget",

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
      DIGITAL CLOCK
    ---------------------------------------------------------------------------
    */

    "digital-clock" : "widget",

    /*
    ---------------------------------------------------------------------------
      DOCUMENTVIEWER
    ---------------------------------------------------------------------------
    */

    "document-viewer" :
    {
      style : function(states)
      {
        return {
          decorator : "main",
          allowGrowY : true
        };
      }
    },

    "document-viewer/visual-pane" :
    {
      style : function(states)
      {
        return {
          decorator : "visual-pane"
        };
      }
    },

    "document-viewer/fit-pane" : "toolbar/part",
    "document-viewer/zoom-pane" : "toolbar/part",
    "document-viewer/orientation-pane" : "toolbar/part",
    "document-viewer/location-pane" : "toolbar/part",
    "document-viewer/tool-pane" : "toolbar/part",
    "document-viewer/search-pane" : "toolbar/part",
    "document-viewer/scroll-pane" : "scrollarea",
    "document-viewer/scroll-pane/pane" :
    {
      style : function(states)
      {
        return {
          margin : 5
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      FRAME
    ---------------------------------------------------------------------------
    */

    "frame" : "window",
    "frame/minimize-button" : "window/minimize-button",
    "frame/restore-button" : "window/restore-button",
    "frame/maximize-button" : "window/maximize-button",
    "frame/statusbar/message" : "statusbar/message",

    /*
    ---------------------------------------------------------------------------
      INTERNET CLOCK
    ---------------------------------------------------------------------------
    */

    "internet-clock" : "widget",

    /*
    ---------------------------------------------------------------------------
      LED CLOCK
    ---------------------------------------------------------------------------
    */

    "led-clock" : "widget",

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
      PAGE CONTROL
    ---------------------------------------------------------------------------
    */

    "page-control" : "widget",

    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */

    "progressbar/status" : "label",

    /*
    ---------------------------------------------------------------------------
      STATUSBAR
    ---------------------------------------------------------------------------
    */

    "statusbar" :
    {
      style : function(states)
      {
        var useCSS = qx.core.Environment.get("css.borderradius") &&
          qx.core.Environment.get("css.gradients") &&
          qx.core.Environment.get("css.boxshadow");
        return {
          padding   : [ 2, 6 ],
          decorator : useCSS ? "window-statusbar-css" : "window-statusbar",
          minHeight : 18
        };
      }
    },

    "statusbar/message" :
    {
      style : function(states)
      {
        return {
          font : "small"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "table/statusbar/message" : "statusbar/message",

    /*
    ---------------------------------------------------------------------------
      TASKBAR
    ---------------------------------------------------------------------------
    */

    "taskbar" : "toolbar",

    /*
    ---------------------------------------------------------------------------
      WEBDESKTOP
    ---------------------------------------------------------------------------
    */

    "webdesktop" :
    {
      style : function(states)
      {
        return {
          decorator : "webdesktop"
//,
//          allowGrowY : true,
//          allowGrowX : true
        };
      }
    },

    "webdesktop/pane" : "desktop",
    "webdesktop/object" : "hover-button",
/*    {
      alias : "atom",
      include : "atom",

      style : function(states)
      {
        return {
          center : true,
          iconPosition : "top"
        };
      }
    },
*/
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

