/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)
     * Christian Hagendorn (chris_schmidt)

   Revision: 28835->
     * Stefan Andersson (sand)
       - removed status text
       - added functionality for a real statusbar, which can be added
       - removed DEFAULT_WINDOW_MANAGER to Desktop to make Desktop independent 
         Window and open up for different window manager classes.
       ! Try to remove Table's dependence on Window
       -----
       - Window class split into two classes; Window and a superclass of Frame,
         and a creation of a new class Dialog.

************************************************************************ */

/**
 * A window widget
 *
 * More information can be found in the package description {@link qxe.ui.window}.
 *
 * @state maximized Whether the window is maximized
 *
 * @childControl minimize-button {qx.ui.form.Button} button to minimize the window
 * @childControl restore-button {qx.ui.form.Button} button to restore the window
 * @childControl maximize-button {qx.ui.form.Button} button to maximize the window
 * @childControl statusbar {qx.ui.container.Composite} statusbar container which shows the statusbar text
 */
qx.Class.define("qxe.ui.window.Frame",
{
  extend : qxe.ui.window.DecoratedWindow,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param caption {String} The caption text
   * @param icon {String} The URL of the caption bar icon
   * @param statusbar {qxe.ui.statusbar.StatusBar} The statusbar of the Frame
   */
  construct : function(caption, icon, statusbar)
  {
    this.base(arguments, caption, icon);

    // captionbar events
    this.getChildControl("captionbar").addListener("dblclick", this._onCaptionMouseDblClick, this);

//    this._createChildControl("statusbar");

    if (statusbar != null) {
//      this.setStatusBar(statusbar);
    }

    // Update statusbar
//    this._updateStatusBar();
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  events :
  {
    /**
     * Fired before the window is minimize.
     *
     * The minimize action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeMinimize" : "qx.event.type.Event",

    /** Fired if the window is minimized */
    "minimize" : "qx.event.type.Event",

    /**
     * Fired before the window is maximize.
     *
     * The maximize action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeMaximize" : "qx.event.type.Event",

    /** Fired if the window is maximized */
    "maximize" : "qx.event.type.Event",

    /**
     * Fired before the window is restored from a minimized or maximized state.
     *
     * The restored action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeRestore" : "qx.event.type.Event",

    /** Fired if the window is restored from a minimized or maximized state */
    "restore" : "qx.event.type.Event"
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      INTERNAL OPTIONS
    ---------------------------------------------------------------------------
    */

    // overridden
    appearance :
    {
      refine : true,
      init : "frame"
    },


    /*
    ---------------------------------------------------------------------------
      HIDE CAPTIONBAR FEATURES
    ---------------------------------------------------------------------------
    */

    /** Should the maximize button be shown */
    showMaximize :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange",
      themeable : true
    },


    /** Should the minimize button be shown */
    showMinimize :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange",
      themeable : true
    },


    /*
    ---------------------------------------------------------------------------
      DISABLE CAPTIONBAR FEATURES
    ---------------------------------------------------------------------------
    */

    /** Should the user have the ability to maximize the window */
    allowMaximize :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange"
    },


    /** Should the user have the ability to minimize the window */
    allowMinimize :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange"
    },


    /*
    ---------------------------------------------------------------------------
      STATUSBAR CONFIG
    ---------------------------------------------------------------------------
    */

    /** Should the statusbar be shown */
    showStatusbar :
    {
      check : "Boolean",
      init : false,
      apply : "_applyShowStatusbar"
    },

    statusBar :
    {
      check : "qxe.ui.statusbar.StatusBar",
      apply : "_applyStatusBarChange",
      event : "changeStatusBar",
      nullable : true
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** {Integer} Original top value before maximation had occoured */
    __restoredTop : null,

    /** {Integer} Original left value before maximation had occoured */
    __restoredLeft : null,

    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      maximized : true,
      showStatusbar : true
    },

    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "statusbar":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          control.add(this.getStatusBar(), {flex: 1});
          this._add(control);
          break;

        case "minimize-button":
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.addListener("execute", this._onMinimizeButtonClick, this);

          this.getChildControl("captionbar").add(control, {row: 0, column: 2});
          break;

        case "restore-button":
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.addListener("execute", this._onRestoreButtonClick, this);

          this.getChildControl("captionbar").add(control, {row: 0, column: 3});
          break;

        case "maximize-button":
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.addListener("execute", this._onMaximizeButtonClick, this);

          this.getChildControl("captionbar").add(control, {row: 0, column: 4});
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      CAPTIONBAR INTERNALS
    ---------------------------------------------------------------------------
    */

    /**
     * Updates the status and the visibility of each element of the captionbar.
     */
    _updateCaptionBar : function()
    {
      var btn;

      this.base(arguments);

      if (this.getShowMinimize())
      {
        this._showChildControl("minimize-button");

        btn = this.getChildControl("minimize-button");
        this.getAllowMinimize() ? btn.resetEnabled() : btn.setEnabled(false);
      }
      else
      {
        this._excludeChildControl("minimize-button");
      }

      if (this.getShowMaximize())
      {
        if (this.isMaximized())
        {
          this._showChildControl("restore-button");
          this._excludeChildControl("maximize-button");
        }
        else
        {
          this._showChildControl("maximize-button");
          this._excludeChildControl("restore-button");
        }

        btn = this.getChildControl("maximize-button");
        this.getAllowMaximize() ? btn.resetEnabled() : btn.setEnabled(false);
      }
      else
      {
        this._excludeChildControl("maximize-button");
        this._excludeChildControl("restore-button");
      }
    },

    _updateStatusBar : function()
    {
      // store the state if the status bar is shown
      var resizeFrame = this._getResizeFrame();

      if (value) {
        this.addState("showStatusbar");
        resizeFrame.addState("showStatusbar");
      } else {
        this.removeState("showStatusbar");
        resizeFrame.removeState("showStatusbar");
      }

      var statusbar = this.getStatusBar();

      if (statusbar) {
        this._showChildControl("statusbar");
      } else {
        this._excludeChildControl("statusbar");
      }
    },

    /**
     * Set the window's position relative to its parent
     *
     * @param left {Integer} The left position
     * @param top {Integer} The top position
     */
    moveTo : function(left, top)
    {
      if (this.isMaximized()) {
        return;
      }

      this.base(arguments, left, top);
    },

    /**
     * Return <code>true</code> if the window is in maximized state,
     * but note that the window in maximized state could also be invisible, this
     * is equivalent to minimized. So use the {@link qx.ui.window.Window#getMode}
     * to get the window mode.
     *
     * @return {Boolean} <code>true</code> if the window is maximized,
     *   <code>false</code> otherwise.
     */
    isMaximized : function()
    {
      return this.hasState("maximized");
    },

    /**
     * Return the window mode as <code>String</code>:
     * <code>"maximized"</code>, <code>"normal"</code> or <code>"minimized"</code>.
     *
     * @return {String} The window mode as <code>String</code> value.
     */
    getMode : function()
    {
      if(!this.isVisible()) {
        return "minimized";
      } else {
        if(this.isMaximized()) {
          return "maximized";
        } else {
          return "normal";
        }
      }
    },

    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyShowStatusbar : function(value, old)
    {
      // store the state if the status bar is shown
      var resizeFrame = this._getResizeFrame();

      if (value) {
        this.addState("showStatusbar");
        resizeFrame.addState("showStatusbar");
      } else {
        this.removeState("showStatusbar");
        resizeFrame.removeState("showStatusbar");
      }

      if (value) {
        this._showChildControl("statusbar");
      } else {
        this._excludeChildControl("statusbar");
      }
    },

    // property apply
    _applyStatusBarChange : function(value, old)
    {
      this._updateStatusBar();
    },


    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Maximizes the window or restores it if it is already
     * maximized.
     *
     * @param e {qx.event.type.Mouse} double click event
     */
    _onCaptionMouseDblClick : function(e)
    {
      if (this.getAllowMaximize()) {
        this.isMaximized() ? this.restore() : this.maximize();
      }
    },

    /*
    ---------------------------------------------------------------------------
      EVENTS FOR CAPTIONBAR BUTTONS
    ---------------------------------------------------------------------------
    */

    /**
     * Minimizes the window, removes all states from the minimize button and
     * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onMinimizeButtonClick : function(e)
    {
      this.minimize();
      this.getChildControl("minimize-button").reset();
    },


    /**
     * Restores the window, removes all states from the restore button and
     * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onRestoreButtonClick : function(e)
    {
      this.restore();
      this.getChildControl("restore-button").reset();
    },


    /**
     * Maximizes the window, removes all states from the maximize button and
     * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onMaximizeButtonClick : function(e)
    {
      this.maximize();
      this.getChildControl("maximize-button").reset();
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Maximize the window.
     */
    maximize : function()
    {
      // If the window is already maximized -> return
      if (this.isMaximized()) {
        return;
      }

      // First check if the parent uses a canvas layout
      // Otherwise maximize() is not possible
      var parent = this.getLayoutParent();
      if (parent != null && parent.supportsMaximize())
      {
        if (this.fireNonBubblingEvent("beforeMaximize", qx.event.type.Event, [false, true]))
        {
          if (!this.isVisible()) {
            this.open();
          }

          // store current dimension and location
          var props = this.getLayoutProperties();
          this.__restoredLeft = props.left === undefined ? 0 : props.left;
          this.__restoredTop = props.top === undefined ? 0 : props.top;

          // Update layout properties
          this.setLayoutProperties({
            left: null,
            top: null,
            edge: 0
          });

          // Add state
          this.addState("maximized");

          // Update captionbar
          this._updateCaptionBar();

          // Fire user event
          this.fireEvent("maximize");
        }
      }
    },

    /**
     * Minimized the window.
     */
    minimize : function()
    {
      if (!this.isVisible()) {
        return;
      }

      if (this.fireNonBubblingEvent("beforeMinimize", qx.event.type.Event, [false, true]))
      {
        // store current dimension and location
        var props = this.getLayoutProperties();
        this.__restoredLeft = props.left === undefined ? 0 : props.left;
        this.__restoredTop = props.top === undefined ? 0 : props.top;

        this.removeState("maximized");
        this.hide();
        this.fireEvent("minimize");
      }
    },


    /**
     * Restore the window to <code>"normal"</code>, if it is
     * <code>"maximized"</code> or <code>"minimized"</code>.
     */
    restore : function()
    {
      if (this.getMode() === "normal") {
        return;
      }

      if (this.fireNonBubblingEvent("beforeRestore", qx.event.type.Event, [false, true]))
      {
        if (!this.isVisible()) {
          this.open();
        }

        // Restore old properties
        var left = this.__restoredLeft;
        var top = this.__restoredTop;
        this.setLayoutProperties({
          edge : null,
          left : left,
          top : top
        });

        // Remove maximized state
        this.removeState("maximized");

        // Update captionbar
        this._updateCaptionBar();

        // Fire user event
        this.fireEvent("restore");
      }
    }
  }
});

