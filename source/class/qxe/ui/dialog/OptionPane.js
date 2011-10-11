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

#asset(qxe/decoration/Modern/dialog/icon/16/information.png)
#asset(qxe/decoration/Modern/dialog/icon/48/information.png)
#asset(qxe/decoration/Modern/dialog/icon/16/warning.png)
#asset(qxe/decoration/Modern/dialog/icon/48/warning.png)
#asset(qxe/decoration/Modern/dialog/icon/16/error.png)
#asset(qxe/decoration/Modern/dialog/icon/48/error.png)
#asset(qxe/decoration/Modern/dialog/icon/16/message.png)
#asset(qxe/decoration/Modern/dialog/icon/48/message.png)

************************************************************************ */

/**
 * An option pane is an easy way of popping up a message.
 *
 * The following features are included in the option pane:
 * - predefined panes; information, warning, error and message.
 * - predefined buttons can be added.
 * - customize icon, label, image, message and buttons easily.
 *
 * @childControl pane {qx.ui.container.Composite} a pane which holds the content
 * @childControl image {qx.ui.basic.Image} an image for the pane
 * @childControl message {qx.ui.form.Label} a message for the pane
 * @childControl button-pane {qxe.ui.form.ButtonPane} a button pane for the pane
 */
qx.Class.define("qxe.ui.dialog.OptionPane",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param message {String} The message to display
   * @param messageType {qx.core.Object} The message type definition
   */
  construct : function(message, image, buttonPane)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("pane");

    this._create(message, image, buttonPane);
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    // Predefined message types
    /** The information pane */
    INFO : {
      icon : "qxe/decoration/Modern/dialog/icon/16/information.png",
      caption : qx.locale.Manager.marktr("Information Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/information.png",
      buttons : { buttons : { OK : qxe.ui.form.ButtonPane.OK } }
    },

    /** The warning pane */
    WARN : {
      icon : "qxe/decoration/Modern/dialog/icon/16/warning.png",
      caption : qx.locale.Manager.marktr("Warning Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/warning.png",
      buttons : { buttons : { OK : qxe.ui.form.ButtonPane.OK } }
    },

    /** The error pane */
    ERR : {
      icon : "qxe/decoration/Modern/dialog/icon/16/error.png",
      caption : qx.locale.Manager.marktr("Error Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/error.png",
      buttons : { buttons : { OK : qxe.ui.form.ButtonPane.OK } }
    },

    /** The message pane */
    MSG : {
      icon : "qxe/decoration/Modern/dialog/icon/16/message.png",
      caption : qx.locale.Manager.marktr("Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/message.png",
      buttons : { buttons : { OK : qxe.ui.form.ButtonPane.OK } }
    },

    // Predefined option types
    OK : {
      buttons : {
        OK : qxe.ui.form.ButtonPane.OK
      }
    },

    OK_HELP : {
      buttons : {
        OK : qxe.ui.form.ButtonPane.OK,
        HELP : qxe.ui.form.ButtonPane.HELP
      }
    },

    /**
     * Get an instance of an option pane by definition through json.
     *
     * The json structure looks like this:
     * {
     *   <option pane name> : {
     *     // The option dialog properties
     *     icon : "icon/16/actions/dialog-ok.png",
     *     caption : "Warning",
     *     // The option pane properties
     *     image : qx.locale.Manager.marktr("Submit"),
     *     message : "",
     *     buttons : { OK : qxe.ui.form.ButtonPane.OK }
     *   }
     * }
     *
     * @param json {object} The new value.
     * @return {qxe.ui.dialog.OptionPane} The newly created option pane.
     */
    getInstance : function(json)
    {
      var optionPane = new qxe.ui.dialog.OptionPane();
      optionPane.set(json);

      return optionPane;
    }
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
      init : "option-pane"
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
    _createChildControlImpl : function(id)
    {
      var control;
      var layout;
      var widget;
//rtl      var rtl = (qx.locale.Manager.getInstance().getDirection() == "right-to-left");

      switch(id)
      {
        case "pane":
          layout = new qx.ui.layout.HBox();
//rtl          layout.setReversed(rtl);

          control = new qx.ui.container.Composite(layout);

          widget = this.getChildControl("image");
          control.add(widget);

          widget = this.getChildControl("message");
          control.add(widget);

          this._add(control, {flex: 1});

          widget = this.getChildControl("button-pane");

          this._add(widget, {flex: 1});
          break;

        case "image":
          control = new qx.ui.basic.Image();
          control.setAlignY("middle");
          control.setMargin(10);
          break;

        case "message":
          control = new qx.ui.basic.Label();
          control.setRich(true);
          control.setAlignY("middle");
          control.setMargin(5);
          break;

        case "button-pane":
          control = new qxe.ui.form.ButtonPane();
          control.setMargin(5);
          control._getLayout().setAlignX("center");
          break;
      }

      return control || this.base(arguments, id);
    },


    /*
    ---------------------------------------------------------------------------
      INTERNAL ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Create option pane.
     *
     * @param message {string} The message.
     * @param image {string} The image.
     * @param buttonPane {qxe.ui.form.ButtonPane} The button pane.
     */
    _create : function(message, image, buttonPane)
    {
      this.getChildControl("image").setSource(image || null);
      this.getChildControl("message").setValue(message || null);

      if(buttonPane != null)
      {
        this.getChildControl("button-pane").set(buttonPane);
      }
    },


    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Setting the icon of the OptionDialog.
     *
     * @param value {String} The icon of the option dialog used.
     */
    setIcon : function(value)
    {
      var parent = this.getLayoutParent();

      if(parent instanceof qxe.ui.window.DecoratedWindow && (!(parent instanceof qxe.ui.dialog.OptionDialog)))
      {
        parent.setIcon(value);
      }
    },

    /**
     * Setting the caption of the OptionDialog.
     *
     * @param caption {String} The caption of the option dialog used.
     */
    setCaption : function(value)
    {
      var parent = this.getLayoutParent();

      if(parent instanceof qxe.ui.window.DecoratedWindow)
      {
        parent.setCaption(value);
      }
    },

    /**
     * Setting the image.
     *
     * @param image {String} The image used.
     */
    setImage : function(value)
    {
      this.getChildControl("image").setSource(value);
    },

    /**
     * Setting the message.
     *
     * @param message {String} The message to display.
     */
    setMessage : function(value)
    {
      this.getChildControl("message").setValue(value || "");
    },

    /**
     * Setting the message.
     *
     * @param optionType {Object} The json object of buttons for a button pane.
     */
    setButtons : function(value)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(value instanceof Object))
        {
          throw new Error("Incompatible child for ButtonPane: " + value);
        }
      }

      this.getChildControl("button-pane").set(value);
    }
  }
});

