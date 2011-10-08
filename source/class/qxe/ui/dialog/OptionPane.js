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

  /**
   * @param message {String} The message to display
   * @param messageType {qx.core.Object} The message type definition
   */
  construct : function(message, messageType, optionType)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("pane");
/*
    if(message != null)
    {
      this.setMessage(message);
    }
*/
    this._createPane(message, messageType, optionType);
/*
    // Configure type
    if (messageType != null)
    {
      this.setMessageType(messageType);
    }
    else
    {
      this.initMessageType();
    }
*/
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
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The warning pane */
    WARN : {
      icon : "qxe/decoration/Modern/dialog/icon/16/warning.png",
      caption : qx.locale.Manager.marktr("Warning Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/warning.png",
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The error pane */
    ERR : {
      icon : "qxe/decoration/Modern/dialog/icon/16/error.png",
      caption : qx.locale.Manager.marktr("Error Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/error.png",
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The message pane */
    MSG : {
      icon : "qxe/decoration/Modern/dialog/icon/16/message.png",
      caption : qx.locale.Manager.marktr("Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/message.png",
      buttons : qxe.ui.form.ButtonPane.OK
    },

    // Predefined option types
    OK_HELP : {
      OK : qxe.ui.form.ButtonPane.OK,
      HELP : qxe.ui.form.ButtonPane.HELP
    },

    /**
     * Get an instance of a button pane by definition through json.
     *
     * The json structure looks like this:
     * {
     *   <option pane name> : {
     *     icon : "icon/16/actions/dialog-ok.png",
     *     caption : "Warning",
     *     image : qx.locale.Manager.marktr("Submit"),
     *     message : "",
     *     buttons : qxe.ui.form.ButtonPane.OK
     *   },
     *   <option pane name> : {
     *     ...
     *   },
     *   ...
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
    },

    /**
     * The message type.
     */
    messageType :
    {
      check : "Object",
      init : function() {
        return qxe.ui.dialog.OptionPane.INFO;
      },
      apply : "_applyMessageType"
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

    _createPane : function(message, messageType, optionType)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!(messageType instanceof Object))
        {
          throw new Error("No message type defined!");
        }
      }

      this.getChildControl("image").setSource(messageType.image);
      this.getChildControl("message").setValue(message || "");

      if(optionType != null)
      {
        this.getChildControl("button-pane").set(optionType);
      }
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    /**
     * Apply method for the message type.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyMessageType : function(value, old)
    {
      this.getChildControl("image").setSource(value.image);
      this.getChildControl("button-pane").setType(value.buttons);
    },


    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Setting the message.
     *
     * @param message {String} The message to set.
     */
    setMessage : function(message)
    {
//      this.getChildControl("message").setValue(message);
    }
  }
});

