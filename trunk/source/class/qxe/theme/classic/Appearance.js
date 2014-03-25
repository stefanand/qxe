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
          decorator : "outset"
        };
      }
    },

    "calendar/navigation-bar" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "calendar",
          textColor : states.disabled ? "text-disabled" : states.invalid ? "invalid" : undefined,
          padding : [2, 10]
        };
      }
    },

    "calendar/previous-button-tooltip" : "tooltip",

    "calendar/next-button-tooltip" : "tooltip",

    "calendar/previous-button"  : "calendar/button",

    "calendar/next-button" : "calendar/button",

    "calendar/button/icon" : {},

    "calendar/button" :
    {
      style : function(states)
      {
        var result = {
          width  : 17,
          show   : "icon"
        };

        if (states.previous) {
          result.icon = "decoration/arrows/left.gif";
        } else if (states.next) {
          result.icon = "decoration/arrows/right.gif";
        }

        if (states.pressed || states.checked || states.abandoned) {
            result.decorator = "inset-thin";
          } else if (states.hovered) {
            result.decorator = "outset-thin";
          } else {
            result.decorator = undefined;
          }

          if (states.pressed || states.checked || states.abandoned) {
            result.padding = [ 2, 0, 0, 2 ];
          } else if (states.hovered) {
            result.padding = 1;
          } else {
            result.padding = 2;
          }

          return result;
        }
      },

      "calendar/label" :
      {
        style : function(states)
        {
          return {
            font          : "bold",
            textAlign     : "center"
          };
        }
      },

      "calendar/date-pane" :
      {
        style : function(states)
        {
          return {
            decorator       : "calendar-date-pane",
            backgroundColor : "calendar"
          };
        }
      },

      "month-pane/weekday" :
      {
        style : function(states)
        {
          return {
            decorator       : "calendar-weekday",
            font            : "bold",
            textAlign       : "center",
            textColor       : states.disabled ? "text-disabled" : states.weekend ? "date-chooser-title" : "date-chooser",
            backgroundColor : states.weekend ? "calendar" : "calendar-title"
          };
        }
      },

      "month-pane/day" :
      {
        style : function(states)
        {
          return {
            textAlign       : "center",
            decorator       : states.today ? "main" : undefined,
            textColor       : states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-disabled" : undefined,
            backgroundColor : states.disabled ? undefined : states.selected ? "calendar-selected" : undefined,
            padding         : [ 2, 4 ]
          };
        }
      },

      "month-pane/week" :
      {
        style : function(states)
        {
          return {
            textAlign : "center",
            textColor : "calendar-title",
            padding   : [ 2, 4 ],
            decorator : states.header ? "month-pane-week-header" : "month-pane-week"
          };
        }
      },

    /*
    ---------------------------------------------------------------------------
      CALENDAR DAYS
    ---------------------------------------------------------------------------
    */

    "calendar-day" : "calendar/date-pane",

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

    "title-pane/collapse-button" :
    {
      include : "button",
      alias : "button",

      style : function(states)
      {
        return {
          icon : "decoration/window/collapse.gif",
          padding : states.pressed || states.abandoned ? [ 2, 1, 0, 3] : [ 1, 2 ]
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
