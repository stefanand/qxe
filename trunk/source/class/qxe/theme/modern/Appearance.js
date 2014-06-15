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
 *
 * @asset(qx/icon/Tango/16/actions/dialog-cancel.png)
 * @asset(qx/icon/Tango/16/actions/dialog-ok.png)
 *
 * @asset(qx/decoration/Modern/arrows/down.png)
 * @asset(qx/decoration/Modern/arrows/up.png)
 *
 * @asset(qx/decoration/Modern/*)
 *
 */
qx.Theme.define("qxe.theme.modern.Appearance",
{
  title : "qxe modern appearance theme",

  extend : qx.theme.modern.Appearance,

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
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
            decorator = "input-focused-invalid";
          } else if (focused && !invalid && !disabled) {
            decorator = "input-focused";
          } else if (disabled) {
            decorator = "input-disabled";
          } else if (!focused && invalid && !disabled) {
            decorator = "border-invalid";
          } else {
            decorator = "input";
          }

          return {
            backgroundColor : "background-light",
            decorator : decorator
          };
        }
      },

      "accordion/pane" : "widget",
/*
      "listitem" :
      {
        alias : "atom",

        style : function(states)
        {
          return {
            padding   : states.dragover ? [4, 4, 2, 4] : 4,
            textColor : states.selected ? "text-selected" : undefined,
            decorator : states.selected ? "selected" : undefined
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
      BREADCRUMB
    ---------------------------------------------------------------------------
    */

   "breadcrumb" :
   {
     style : function(states)
     {
       return {
         decorator : "breadcrumb"
       };
     }
   },

   "breadcrumb-link" :
   {
     alias : "atom",

     style : function(states)
     {
       var decorator = (states.pressed || states.hovered) && !states.disabled ? "selected" : undefined;

       return {
         decorator : decorator,
         textColor : states.pressed || states.hovered ? "text-selected" : undefined,
         padding   : [ 3, 8 ]
       };
     }
   },

    "breadcrumb-separator" :
    {
      style : function(states)
      {
        return {
          height : 0,
          decorator : "breadcrumb-separator",
          margin    : [ 4, 2 ]
        };
      }
    },

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
          textColor: states.disabled ? "text-disabled" : undefined,
          marginTop : 2
        };
      }
    },

    "calendar/weekday" :
    {
      style : function(states)
      {
        return {
          textColor : states.disabled ? "text-disabled" : states.weekend ? "text-light" : undefined,
          textAlign : "center",
          paddingTop : 2,
          backgroundColor : "background-medium"
        };
      }
    },

    "calendar/week" :
    {
      style : function(states)
      {
        return {
          textAlign : "center",
          padding   : [ 2, 4 ],
          backgroundColor : "background-medium"
        };
      }
    },

    "calendar/day" :
    {
      style : function(states)
      {
        var decorator = states.disabled ? undefined : states.selected ? "selected" : undefined;

        return {
          textAlign : "center",
          decorator : decorator,
          textColor : states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-light" : undefined,
          font      : states.today ? "bold" : undefined,
          padding   : [ 2, 4 ]
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

    "datechooser/previous-year-button-tooltip" : "tooltip",
    "datechooser/previous-month-button-tooltip" : "tooltip",

    "datechooser/previous-year-button" : "datechooser/nav-button",
    "datechooser/previous-month-button" : "datechooser/nav-button",

    /*
    ---------------------------------------------------------------------------
      DAY
    ---------------------------------------------------------------------------
    */

    "day" : "datechooser",

    "day/previous-day-button-tooltip" : "tooltip",
    "day/next-day-button-tooltip" : "tooltip",

    "day/previous-day-button"  : "datechooser/button",
    "day/next-day-button"  : "datechooser/button",

    "day/day-pane/activity" :
    {
      style : function(states)
      {
        return {
          backgroundColor: states.selected ?
            "table-row-background-selected" :
            "table-row-background-even",
          textColor: states.selected ? "text-selected" : "text",
          padding: [3, 6]
        }
      }
    },
 
    /*
    ---------------------------------------------------------------------------
      DECORATED WINDOW
    ---------------------------------------------------------------------------
    */

    "decorated-window" : "window",

    "decorated-window-resize-frame" : "window-resize-frame",

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

    "frame" :
    {
      include : "decorated-window",
      alias : "decorated-window",

      style : function(states)
      {
        return {
          decorator : states.showStatusbar ? "window-incl-statusbar" : "window",
          margin : states.maximized ? 0 : [0, 5, 5, 0]
        };
      }
    },

    "frame/minimize-button" : "window/minimize-button",

    "frame/restore-button" : "window/restore-button",

    "frame/maximize-button" : "window/maximize-button",

    "frame/statusbar" : "statusbar",

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
      MENUATOM
    ---------------------------------------------------------------------------
    */

    "menuatom" : "atom",

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
          padding   : [ 2, 6 ],
          decorator : "window-statusbar",
          minHeight : 18
        };
      }
    },

    "statusbar/message" : {},

    "statusbar/message/text" :
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
      TITLEPANE
    ---------------------------------------------------------------------------
    */

    "title-pane" :
    {
      style : function(states)
      {
        return {
          contentPadding : [ 10, 10, 10, 10 ],
          margin : !states.collapsed ? 0 : [0, 5, 5, 0]
        };
      }
    },

    "title-pane/captionbar" :
    {
      style : function(states)
      {
        return {
          decorator : (states.active ? "title-pane-captionbar-active" :
            "title-pane-captionbar-inactive"),
          textColor : states.active ? "title-pane-caption-active-text" : "text-gray",
          minHeight : 26,
          paddingRight : 2
        };
      }
    },

    "title-pane/collapse-image" :
    {
      alias : "image",

      style : function(states)
      {
        return {
          source : states.hovered ? states.collapsed ? "decoration/arrows/down.png" :
                                                  "decoration/arrows/up.png" :
                                                  null,
          margin : [ 4, 8, 2, 0 ],
          alignY : "middle"
        };
      }
    },

    "title-pane/title" :
    {
      style : function(states)
      {
        return {
          alignY      : "middle",
          font        : "bold",
          marginLeft  : 6,
          marginRight : 12
        };
      }
    },

    "title-pane/pane" :
    {
      style : function(states)
      {
        return {
          decorator : "title-pane"
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
          decorator : "window",
          contentPadding : [ 10, 10, 10, 10 ],
          margin : [0, 5, 5, 0]
        };
      }
    },

    "window/pane" :
    {
      style : function(states)
      {
        return {
          decorator : "window-pane"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      WIZARD
    ---------------------------------------------------------------------------
    */

    // Inherits from respective parent
    "wizard" : "widget",

    "wizard-page" : "groupbox",

  
    /*
    ---------------------------------------------------------------------------
      YEAR
    ---------------------------------------------------------------------------
    */

    "year" : "datechooser"
  }
});
