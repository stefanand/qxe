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
 * - customize label, icon message and buttons easily.
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
  construct : function(message, messageType)
  {
    this.base(arguments);

    // configure internal layout
    this._setLayout(new qx.ui.layout.VBox());

    this._createChildControl("pane");

    if(message != null)
    {
      this.setMessage(message);
    }

    // Configure type
    if (messageType != null)
    {
      this.setMessageType(messageType);
    }
    else
    {
      this.initMessageType();
    }
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    // Panes
    /** The information pane */
    INFO : {
      icon : "qxe/decoration/Modern/dialog/icon/16/information.png",
      caption : qx.locale.Manager.marktr("Information Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/information.png",
      message : null,
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The warning pane */
    WARN : {
      icon : "qxe/decoration/Modern/dialog/icon/16/warning.png",
      caption : qx.locale.Manager.marktr("Warning Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/warning.png",
      message : null,
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The error pane */
    ERR : {
      icon : "qxe/decoration/Modern/dialog/icon/16/error.png",
      caption : qx.locale.Manager.marktr("Error Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/error.png",
      message : null,
      buttons : qxe.ui.form.ButtonPane.OK
    },

    /** The message pane */
    MSG : {
      icon : "qxe/decoration/Modern/dialog/icon/16/message.png",
      caption : qx.locale.Manager.marktr("Message"),
      image : "qxe/decoration/Modern/dialog/icon/48/message.png",
      message : null,
      buttons : qxe.ui.form.ButtonPane.OK
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
      var rtl = (qx.locale.Manager.getInstance().getDirection() == "right-to-left");

      switch(id)
      {
        case "pane":
          layout = new qx.ui.layout.HBox();
          layout.setReversed(rtl);

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
          control = new qxe.ui.form.ButtonPane(qxe.ui.form.ButtonPane.CUSTOM);
          control.setMargin(5);
          control._getLayout().setAlignX("center");
          break;
      }

      return control || this.base(arguments, id);
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
      this.getChildControl("buttons").setType(value.buttons);
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
      this.getChildControl("message").setValue(message);
    }
  }
});

