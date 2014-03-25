/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2014 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/**
 * This is a title pane.
 */
qx.Class.define("qxe.ui.form.TitlePane",
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

  /**
   * @param caption {String} The caption.
   */
  construct : function(caption)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    // force creation of captionbar
    this._createChildControl("captionbar");
    this._createChildControl("pane");

    if (caption != null) {
      this.setCaption(caption);
    }

    // Update captionbar
    this._updateCaptionBar();
  },


  /*
   *****************************************************************************
      EVENTS
   *****************************************************************************
   */

  events :
  {
   /**
     * Fired before the title pane is collapsed.
     *
     * The collapse action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeCollapse" : "qx.event.type.Event",

    /** Fired if the title pane is collapsed */
    "collapse" : "qx.event.type.Event",

    /**
     * Fired before the title pane is expanded.
     *
     * The expand action can be prevented by calling
     * {@link qx.event.type.Event#preventDefault} on the event object
     */
    "beforeExpand" : "qx.event.type.Event",

    /** Fired if the title pane is expanded */
    "expand" : "qx.event.type.Event"
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "title-pane"
    },
  
    /** The text of the caption */
    caption :
    {
      apply : "_applyCaptionBarChange",
      event : "changeCaption",
      nullable : true
    },

    /** Should the collapse button be shown. */
    showCollapse :
    {
      check : "Boolean",
      init : true,
      apply : "_applyCaptionBarChange",
      themeable : true
    },

    /** Allow the title pane to collapse. */
    allowCollapse :
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
      'collapsed' : true
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

        case "captionbar":
          // captionbar
          var layout = new qx.ui.layout.Grid();
          layout.setRowFlex(0, 1);
          layout.setColumnFlex(1, 1);
          control = new qx.ui.container.Composite(layout);
          this._add(control);

          // captionbar events
          control.addListener("dblclick", this._onCaptionMouseDblClick, this);
          break;

        case "collapse-button":
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.addListener("execute", this._onCollapseButtonClick, this);

          this.getChildControl("captionbar").add(control, {row: 0, column: 0});
          break;

        case "title":
          control = new qx.ui.basic.Label(this.getCaption());
          control.setWidth(0);
          control.setAllowGrowX(true);

          this.getChildControl("captionbar").add(control, {row: 0, column: 1});
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

      if (this.getShowCollapse())
      {
        this._showChildControl("collapse-button");

        btn = this.getChildControl("collapse-button");
        this.getAllowCollapse() ? btn.resetEnabled() : btn.setEnabled(false);
      }
      else
      {
        this._excludeChildControl("collapse-button");
      }

      var caption = this.getCaption();

      if (caption)
      {
        this.getChildControl("title").setValue(caption);
        this._showChildControl("title");
      }
      else
      {
        this._excludeChildControl("title");
      }
    },


    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */

    /**
     * Collapses the title pane.
     * Technically calls the {@link qx.ui.core.Widget#hide} method.
     */
    collapse : function()
    {
      if (this.fireNonBubblingEvent("beforeCollapse", qx.event.type.Event, [false, true]))
      {
        this.getChildControl("pane").hide();

        // Add state
        this.addState("collapsed");

        // Update captionbar
        this._updateCaptionBar();

        this.fireEvent("collapse");
      }
    },

    /**
     * Expands the title pane.
     */
    expand : function()
    {
      if (this.fireNonBubblingEvent("beforeExpand", qx.event.type.Event, [false, true]))
      {
        this.getChildControl("pane").show();

        // Remove state
        this.removeState("collapsed");

        // Update captionbar
        this._updateCaptionBar();

        this.fireEvent("expand");
      }
    },

    /**
     * Return <code>true</code> if the title pane is in collapsed state.
     *
     * @return {Boolean} <code>true</code> if the title pane is collapsed,
     *   <code>false</code> otherwise.
     */
    isCollapsed : function()
    {
      return this.hasState("collapsed");
    },

    
    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getChildControl("pane");
    },

    // property apply
    _applyCaptionBarChange : function(value, old) {
      this._updateCaptionBar();
    },
 

    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Collapses the title pane or expands it, if it is already
     * collapsed.
     *
     * @param e {qx.event.type.Mouse} double click event
     */
    _onCaptionMouseDblClick : function(e)
    {
      if (this.getAllowCollapse()) {
        this.isCollapsed() ? this.expand() : this.collapse();
      }
    },

  
    /*
    ---------------------------------------------------------------------------
      EVENTS FOR CAPTIONBAR BUTTONS
    ---------------------------------------------------------------------------
    */

    /**
     * Collapses the title pane, removes all states from the collapse button and
     * stops the further propagation of the event (calling {@link qx.event.type.Event#stopPropagation}).
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onCollapseButtonClick : function(e)
    {
      this.collapse();
      this.getChildControl("collapse-button").reset();
    }
  }
});
