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
 * @state active Whether the window is activated
 *
 * @childControl pane {qx.ui.container.Composite} window pane which holds the content
 */
qx.Class.define("qxe.ui.window.Window",
{
  extend : qx.ui.core.Widget,

  include :
  [
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.core.MRemoteLayoutHandling,
    qx.ui.core.MContentPadding
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("pane");

    // Activation listener
    this.addListener("mousedown", this._onWindowMouseDown, this, true);

    // Focusout listener
    this.addListener("focusout", this._onWindowFocusOut, this);

    // Automatically add to application root.
    qx.core.Init.getApplication().getRoot().add(this);

    // Initialize visibiltiy
    this.initVisibility();

    // Register as root for the focus handler
    qx.ui.core.FocusHandler.getInstance().addRoot(this);
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /** {Class} The default window manager class. */
    DEFAULT_MANAGER_CLASS : qx.ui.window.Manager
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  events :
  {
    /**
     * Fired before the window is closed.
     *
     * The close action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeClose" : "qx.event.type.Event",

    /** Fired if the window is closed */
    "close" : "qx.event.type.Event"
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
      init : "window"
    },


    // overridden
    visibility :
    {
      refine : true,
      init : "excluded"
    },


    // overridden
    focusable :
    {
      refine : true,
      init : true
    },


    /**
     * If the window is active, only one window in a single qx.ui.window.Manager could
     *  have set this to true at the same time.
     */
    active :
    {
      check : "Boolean",
      init : false,
      apply : "_applyActive",
      event : "changeActive"
    },


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

    /**
     * The children container needed by the {@link qx.ui.core.MRemoteChildrenHandling}
     * mixin
     *
     * @return {qx.ui.container.Composite} pane sub widget
     */
    getChildrenContainer : function() {
      return this.getChildControl("pane");
    },


    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      active : true
    },


    // overridden
    setLayoutParent : function(parent)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        parent && this.assertInterface(
          parent, qx.ui.window.IDesktop,
          "Windows can only be added to widgets, which implement the interface "+
          "qx.ui.window.IDesktop. All root widgets implement this interface."
        );
      }
      this.base(arguments, parent);
    },


    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch(id)
      {
        case "pane":
          control = new qx.ui.container.Composite();
          this._add(control, {flex: 1});
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Closes the current window instance.
     * Technically calls the {@link qx.ui.core.Widget#hide} method.
     */
    close : function()
    {
      if (!this.isVisible()) {
        return;
      }

      if (this.fireNonBubblingEvent("beforeClose", qx.event.type.Event, [false, true]))
      {
        this.hide();
        this.fireEvent("close");
      }
    },


    /**
     * Opens the window.
     */
    open : function()
    {
      this.show();
      this.setActive(true);
      this.focus();
    },


    /**
     * Centers the window to the parent.
     *
     * This call works with the size of the parent widget and the size of
     * the window as calculated in the last layout flush. It is best to call
     * this method just after rendering the window in the "resize" event:
     * <pre class='javascript'>
     *   win.addListenerOnce("resize", this.center, this);
     * </pre>
     */
    center : function(e)
    {
			var parent;
			var bounds;

			if(e instanceof qx.event.type.Data)
			{
      	parent = this.getLayoutParent();
			}
			else
			{
				parent = e;
			}

      if (parent)
      {
        var location = parent.getContainerLocation("padding");

        if (location)
        {
          var hint = this.getSizeHint();
          var left = Math.round(location.left + (location.right - location.left - hint.width) / 2);
          var top = Math.round(location.top + (location.bottom - location.top - hint.height) / 2);

          if (top < 0) {
            top = 0;
          }

          this.moveTo(left, top);

          return;
        }
      }

      if (qx.core.Environment.get("qx.debug"))
      {
        this.warn("Centering depends on parent bounds!");
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
      this.setLayoutProperties({
        left : left,
        top : top
      });
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyActive : function(value, old)
    {
      if (old) {
        this.removeState("active");
      } else {
        this.addState("active");
      }
    },


    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getChildControl("pane");
    },


    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Stops every event
     *
     * @param e {qx.event.type.Event} any event
     */
    _onWindowEventStop : function(e) {
      e.stopPropagation();
    },


    /**
     * Focuses the window instance.
     *
     * @param e {qx.event.type.Mouse} mouse down event
     */
    _onWindowMouseDown : function(e) {
      this.setActive(true);
    },


    /**
     * Listens to the "focusout" event to deactivate the window (if the
     * currently focused widget is not a child of the window)
     *
     * @param e {qx.event.type.Focus} focus event
     */
    _onWindowFocusOut : function(e) {
      // get the current focused widget and check if it is a child
      var current = e.getRelatedTarget();
      if (current != null && !qx.ui.core.Widget.contains(this, current))
      {
        this.setActive(false);
      }
    }
  }
});

