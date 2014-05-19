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

/**
 * @asset(qx/icon/Oxygen/16/actions/collapse.png)
 * @asset(qx/icon/Oxygen/16/actions/expand.png)
 *
 * @asset(qx/decoration/Classic/arrows/down.png)
 * @asset(qx/decoration/Classic/arrows/up.png)
 * 
 * @asset(qxe/decoration/Classic/*)
 *
 */
qx.Theme.define("qxe.theme.classic.Appearance",
{
  title : "qxe classic appearance theme",

  extend : qx.theme.classic.Appearance,

  appearances :
  {
   /*
    ---------------------------------------------------------------------------
      ACCORDION
    ---------------------------------------------------------------------------
    */

    "accordion" :
    {
      alias : "scrollarea",

      style : function(states)
      {
        var backgroundColor;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (invalid && !disabled) {
            backgroundColor = "background-invalid";
          } else if (focused && !invalid && !disabled) {
            backgroundColor = "background-focused";
          } else if (disabled) {
            backgroundColor = "background-disabled";
          } else {
            backgroundColor = "white";
          }

          return {
            decorator       : states.focused ? "focused-inset" : "inset",
            backgroundColor : backgroundColor
          };
        }
      },
/*
      "accordionitem" :
      {
        alias : "atom",

        style : function(states)
        {
          return {
            gap             : 4,
            padding         : states.lead ? [ 2, 4 ] : [ 3, 5 ],
            backgroundColor : states.selected ? "background-selected" : undefined,
            textColor       : states.selected ? "text-selected" : undefined,
            decorator       : states.lead ? "lead-item" : undefined
          };
        }
      },
*/
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
      CALENDAR
    ---------------------------------------------------------------------------
    */

    "calendar" :
    {
      style : function(states)
      {
        return {
          decorator       : "datechooser-date-pane",
          backgroundColor : "date-chooser"
        };
      }
    },

    "calendar/weekday" :
    {
      style : function(states)
      {
        return {
          decorator       : "datechooser-weekday",
          font            : "bold",
          textAlign       : "center",
          textColor       : states.disabled ? "text-disabled" : states.weekend ? "date-chooser-title" : "date-chooser",
          backgroundColor : states.weekend ? "date-chooser" : "date-chooser-title"
        };
      }
    },

    "calendar/week" :
    {
      style : function(states)
      {
        return {
          textAlign : "center",
          textColor : "date-chooser-title",
          padding   : [ 2, 4 ],
          decorator : states.header ? "datechooser-week-header" : "datechooser-week"
        };
      }
    },

    "calendar/day" :
    {
      style : function(states)
      {
        return {
          textAlign       : "center",
          decorator       : states.today ? "main" : undefined,
          textColor       : states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-disabled" : undefined,
          backgroundColor : states.disabled ? undefined : states.selected ? "date-chooser-selected" : undefined,
          padding         : [ 2, 4 ]
        };
      }
    },

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
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */

    "datechooser/date-pane" : "calendar",

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

    /*
    ---------------------------------------------------------------------------
      FRAME
    ---------------------------------------------------------------------------
    */

    "frame" :
    {
      include : "window",
      alias : "window",

      style : function(states)
      {
        return {
          decorator : states.maximized ? undefined : "window"
        };
      }
    },
    
    "frame/minimize-button" : "window/minimize-button",

    "frame/restore-button" : "window/restore-button",

    "frame/maximize-button" : "window/maximize-button",

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
      PICK LIST
    ---------------------------------------------------------------------------
    */

    "pick-list" : "widget",

    "pick-list/source-list" : "list",

    "pick-list/target-list" : "list",

    "pick-list/add-button" : "button",

    "pick-list/remove-button" : "button",

    "pick-list/add-all-button" : "button",

    "pick-list/remove-all-button" : "button",

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
        return {
          decorator : "inset-thin",
          padding : [ 2, 6 ]
        };
      }
    },

    "statusbar/message" : "label",

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
      TITLEPANE
    ---------------------------------------------------------------------------
    */

    "title-pane" :
    {
      style : function(states)
      {
        return {
          contentPadding : [ 10, 10, 10, 10 ],
          backgroundColor : "background",
          decorator : !states.collapsed ? undefined : "title-pane"
        };
      }
    },

    "title-pane/pane" : {},

    "title-pane/captionbar" :
    {
      style : function(states)
      {
        return {
          padding : 1
        };
      }
    },

    "title-pane/collapse-atom" :
    {
      include : "image",

      style : function(states)
      {
        return {
          source : states.hovered ? states.collapsed ? "decoration/arrows/down.png" :
                                                         "decoration/arrows/up.png" :
                                                           null,
          alignY : "middle"
        };
      }
    },

    "title-pane/title" :
    {
      style : function(states)
      {
        return {
          cursor : "default",
          font : "bold",
          marginRight : 20,
          alignY: "middle"
        };
      }
    },


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
      WINDOW
    ---------------------------------------------------------------------------
    */

    // Overrides qx.ui.window.Window theme definition
    "window" :
    {
      style : function(states)
      {
        return {
          contentPadding : [ 10, 10, 10, 10 ],
          backgroundColor : "background"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      WIZARD
    ---------------------------------------------------------------------------
    */

    "wizard" : "widget",

    "wizard-page" : "groupbox"
  }
});
