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

#asset(qx/icon/${qx.icontheme}/16/actions/view-refresh.png)

#asset(qxe/icon/ui/control/text.png)
#asset(qxe/icon/ui/control/audio-volume-high.png)
#asset(qxe/icon/ui/control/help-browser.png)

************************************************************************ */

qx.Class.define("qxe.ui.control.Captcha",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

		this._setLayout(new qx.ui.layout.VBox(5));

    this._createChildControl("captcha-box");
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
      init : "captcha"
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
      INTERNAL API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;
			var layout;
			var widget;
			var tooltip;

      switch(id)
      {
				case "captcha-box" :
					control = new qx.ui.groupbox.GroupBox(this.tr("Captcha"));
					control.setLayout(new qx.ui.layout.VBox(5));
			    control.setAllowGrowX(false);
			    control.add(this._createChildControl("captcha-control"));
			    control.add(this._createChildControl("input"));

					this._add(control);
					break;

				case "captcha-control" :
					layout = new qx.ui.layout.HBox(5);

					control = new qx.ui.container.Composite(layout);
			    control.add(this._createChildControl("captcha-view"));
			    control.add(this._createChildControl("captcha-buttons"));
					break;

				case "captcha-view" :
					control = new qx.ui.container.Stack(new qx.ui.layout.Canvas());
			    control.add(this._createChildControl("captcha-image"));
//			    control.add(this._createChildControl("captcha-vu-meter"));
					break;

				case "captcha-image" :
					tooltip = new qx.ui.tooltip.ToolTip(this.tr("The captcha code generated."));

		      control = new qx.ui.basic.Image();
		      control.setHeight(100);
		      control.setWidth(200);
		      control.setBackgroundColor("#ffffff");
		      control.addListenerOnce("appear", this._onAppearCaptchaImage, this);
		      control.addListener("changeSource", this._onSourceChange, this);
		      control.addListener("loaded", this._onLoaded, this);
    		  control.addListener("loadingFailed", this._onLoadingFailed, this);
					control.setToolTip(tooltip);
					break;

				case "captcha-vu-meter" :
					tooltip = new qx.ui.tooltip.ToolTip(this.tr("The captcha VU meter."));

//		      control = new qxe.ui.indicator.VUMeter();
//		      control.setHeight(100);
//		      control.setWidth(200);
//		      control.setBackgroundColor("#ffffff");
//		      control.addListenerOnce("appear", this._onAppearCaptchaImage, this);
//		      control.addListener("changeSource", this._onSourceChange, this);
//		      control.addListener("loaded", this._onLoaded, this);
//    		  control.addListener("loadingFailed", this._onLoadingFailed, this);
//					control.setToolTip(tooltip);
					break;

				case "captcha-buttons" :
		      control = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));

					control.add(this._createChildControl("update-button"));
					control.add(this._createChildControl("sound-button"));
					control.add(this._createChildControl("help-button"));
					break;

				case "update-button" :
					tooltip = new qx.ui.tooltip.ToolTip(this.tr("Get a new captcha code."));

      		control = new qx.ui.form.Button(null, "icon/16/actions/view-refresh.png");
		      control.addListener("execute", this._onExecuteUpdate, this);
					control.setToolTip(tooltip);
					break;

				case "sound-button" :
      		control = new qxe.ui.form.MultiStateButton();
					control.add(null, "qxe/icon/ui/control/text.png", this.tr("Read the captcha code generated."));
			    control.add(null, "qxe/icon/ui/control/audio-volume-high.png", this.tr("Listen to the captcha code generated."));
		      control.addListener("execute", this._onExecuteSound, this);

					control.setEnabled(false);
					break;

				case "help-button" :
					tooltip = new qx.ui.tooltip.ToolTip(this.tr("Context sensitive help."));

      		control = new qx.ui.form.Button(null, "qxe/icon/ui/control/help-browser.png");
		      control.addListener("execute", this._onExecuteHelp, this);
					control.setToolTip(tooltip);
					break;

        case "input":
					layout = new qx.ui.layout.HBox(5);

		      var control = new qx.ui.container.Composite(layout);
					widget = this._createChildControl("captcha-textfield");
		      control.add(this._createChildControl("captcha-label"));
		      control.add(widget);

					this._add(control);
					break;

				case "captcha-label" :
		      control = new qx.ui.basic.Label(this.tr("Type the word"));
		      control.setAlignY("middle");
		      control.setBuddy(this.getChildControl("captcha-textfield"));
					break;

				case "captcha-textfield":
					tooltip = new qx.ui.tooltip.ToolTip(this.tr("Type in the captcha code you can see to the left."));

		      control = new qx.ui.form.TextField();
		      control.setPlaceholder(this.tr("Code"));
		      control.setRequired(true);
		      control.setEnabled(false);
		      control.setWidth(60);
      		control.addListener("input", this._onInput, this);
					control.setToolTip(tooltip);
					break;
			}

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      BASIC EVENT HANDLERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listens to the "appear" event to display the received captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
		_onAppearCaptchaImage : function(e)
		{
			// Get the first captcha when the widget is appearing
			this.getChildControl("update-button").fireEvent("execute");
		},

    /**
     * Listens to the "source" event to display the new captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
    _onSourceChange : function(e)
    {
      this.debug("Captcha image changed.");

      this.getChildControl("captcha-textfield").setEnabled(false);
      this.getChildControl("update-button").setEnabled(false);
      this.getChildControl("sound-button").setEnabled(true);

      this.getChildControl("captcha-textfield").setValue(null);
    },

    /**
     * Listens to the "loaded" event to display the loaded captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
    _onLoaded : function(e)
    {
	    this.debug("Captcha image loaded.");

      this.getChildControl("captcha-textfield").setEnabled(true);
      this.getChildControl("update-button").setEnabled(true);
      this.getChildControl("sound-button").setEnabled(true);

      this.getChildControl("captcha-textfield").setValue(null);
    },

    /**
     * Listens to the "loadingFailed" event to act on failed loading of captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
    _onLoadingFailed : function(e)
    {
	    this.debug("Failed loading captcha image.");

      this.getChildControl("captcha-textfield").setEnabled(false);
      this.getChildControl("update-button").setEnabled(true);
      this.getChildControl("sound-button").setEnabled(false);

      this.getChildControl("captcha-textfield").setValue(null);
    },

    /**
     * Listens to the "input" event on input of captcha code.
     *
     * @param e {qx.event.type.Appear} focus event
     */
		_onInput : function(e)
		{
		},

    /**
     * Listens to the "appear" event to display the received captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
    _onExecuteUpdate : function(e)
    {
			// validate
			// Set buttons
    },

    /**
     * Listens to the "appear" event to display the received captcha image.
     *
     * @param e {qx.event.type.Appear} focus event
     */
		_onExecuteSound : function(e)
		{
			var soundB = this.getChildControl("sound-button");

			if(this.hasState("mute"))
			{
				soundB.replaceState("mute", "low");
			}
			else if(this.hasState("low"))
			{
				soundB.replaceState("low", "medium");
			}
			else if(this.hasState("medium"))
			{
				soundB.replaceState("medium", "high");
			}
			else if(this.hasState("high"))
			{
				soundB.replaceState("high", "mute");
			}

			// Put sound system here
		},

    /**
     * Listens to the "execute" event to display help.
     *
     * @param e {qx.event.type.Execute} execute event
     */
		_onExecuteHelp : function(e)
		{
			// Put help system in here
		}
  }
});

