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
 * More information can be found in the package description {@link qx.ui.window}.
 *
 * @state active Whether the window is activated
 *
 * @childControl captionbar {qx.ui.container.Composite} Container for all widgets inside the captionbar
 * @childControl title {qx.ui.basic.Label} caption of the window
 * @childControl close-button {qx.ui.form.Button} button to close the window
 */
qx.Class.define("qxe.ui.window.DecoratedWindow",
{
  extend : qxe.ui.window.Window,

  include :
  [
    qx.ui.core.MResizable,
    qx.ui.core.MMovable
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param caption {String} The caption text
   * @param icon {String} The URL of the caption bar icon
   */
  construct : function(caption, icon)
  {
    this.base(arguments);

    // force creation of captionbar
    this._createChildControl("captionbar");
    this._createChildControl("pane");

    // apply constructor parameters
    if (icon != null) {
      this.setIcon(icon);
    }

    if (caption != null) {
      this.setCaption(caption);
    }

    // Update captionbar
    this._updateCaptionBar();

    // change the reszie frames appearance
    this._getResizeFrame().setAppearance("window-resize-frame");
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
      BASIC OPTIONS
    ---------------------------------------------------------------------------
    */

    /** Should the window be always on top */
    alwaysOnTop :
    {
      check : "Boolean",
      init : false,
      event : "changeAlwaysOnTop"
    },

    /** The text of the caption */
    caption :
    {
      apply : "_applyCaptionBarChange",
      event : "changeCaption",
      nullable : true
    },

    /** The icon of the caption */
    icon :
    {
      check : "String",
      nullable : true,
      apply : "_applyCaptionBarChange",
      event : "changeIcon",
      themeable : true
    },


    /*
    ---------------------------------------------------------------------------
      HIDE CAPTIONBAR FEATURES
    ---------------------------------------------------------------------------
    */

    /** Should the close button be shown */
    showClose :
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

    /** Should the user have the ability to close the window */
    allowClose :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "captionbar":
          // captionbar
          var layout = new qx.ui.layout.Grid();
          layout.setRowFlex(0, 1);
          layout.setColumnFlex(1, 1);
          control = new qx.ui.container.Composite(layout);
          this._add(control);

          // captionbar events
          control.addListener("dblclick", this._onCaptionMouseDblClick, this);

          // register as move handle
          this._activateMoveHandle(control);
          break;

        case "title":
          control = new qx.ui.basic.Label(this.getCaption());
          control.setWidth(0);
          control.setAllowGrowX(true);

          var captionBar = this.getChildControl("captionbar");
          captionBar.add(control, {row: 0, column:1});
          break;

        case "close-button":
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.addListener("execute", this._onCloseButtonClick, this);

          this.getChildControl("captionbar").add(control, {row: 0, column:6});
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

      var caption = this.getCaption()
      if (caption) {
        this.getChildControl("title").setValue(caption);
        this._showChildControl("title");
      } else {
        this._excludeChildControl("title");
      }

      if (this.getShowClose())
      {
        this._showChildControl("close-button");

        btn = this.getChildControl("close-button");
        this.getAllowClose() ? btn.resetEnabled() : btn.setEnabled(false);
      }
      else
      {
        this._excludeChildControl("close-button");
      }
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
     * Closes the window, removes all states from the close button and
     * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onCloseButtonClick : function(e)
    {
      this.close();
      this.getChildControl("close-button").reset();
    }
  }
});

