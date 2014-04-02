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
 * An idle manager keeping track on mouse, screen and keyboard activity.
 * Three available states: active, idle, away or logout.
 * 
 * TODO: how can the number of events fired at activity calling this.reset
 *       be minimized? with a threshold level to restart the timer?
 *       or is internal timer changes necessary with a new timer.
 *       
 *       threshold property - the lowest level of restarting timer at activity
 */
qx.Class.define("qxe.util.IdleManager",
{
  extend : qx.core.Object,
  type   : "singleton",


  /*
   *****************************************************************************
      CONSTRUCTOR
   *****************************************************************************
   */

  construct : function()
  {
    this.base(arguments);

    this.__timer = qx.util.TimerManager.getInstance();

    var root = window.document.documentElement;

    // All keyboard events
    qx.event.Registration.addListener(root, "keydown", this.reset, this);

    root = window.document;

    // All mouse events
    qx.event.Registration.addListener(root, "click", this.reset, this);
    qx.event.Registration.addListener(root, "dblclick", this.reset, this);
    qx.event.Registration.addListener(root, "mousemove", this.reset, this);
    qx.event.Registration.addListener(root, "mousewheel", this.reset, this);

    // All touch events
    qx.event.Registration.addListener(root, "tap", this.reset, this);
    qx.event.Registration.addListener(root, "longtap", this.reset, this);
    qx.event.Registration.addListener(root, "swipe", this.reset, this);

    this.start();
  },


  /*
   *****************************************************************************
      EVENTS
   *****************************************************************************
   */

  events :
  {
	/** Event fired when active. */
    "active" : "qx.event.type.Data",

	/** Event fired when idle. */
    "idle" : "qx.event.type.Data",

	/** Event fired when away. */
    "away" : "qx.event.type.Data",

  	/** Event fired when automatic logout. */
    "logout" : "qx.event.type.Data"
  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

  properties :
  {
    /** The idle timeout */
    idleTimeout :
    {
      check : "Integer",
      init : 6000,
      apply : "_applyIdleTimeout",
      event : "changeIdleTimeout"
    },

    /** The away timeout */
    awayTimeout :
    {
      check : "Integer",
      init : 30000,
      apply : "_applyAwayTimeout",
      event : "changeAvayTimeout"
    },

    /** The automatic logout timeout */
    logoutTimeout :
    {
      check : "Integer",
      init : null,
      nullable : true,
      apply : "_applyLogoutTimeout",
      event : "changeLogoutTimeout"
    }
  },


  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  members :
  {
    __timer : null,
    __timerId : null,
    __lastActiveTime : null,

	/**
     * Start a new timer
     */
    start : function()
    {
      var time = (new Date()).getTime();

      var userData = {
        state : "idle",
        startTime : time
      };

      // One shot timer
      this.__timerId = this.__timer.start(this._timeout, 0, this, userData, this.getIdleTimeout());

      var data = {
        timeout : 0
      };

      this.fireDataEvent("active", data);
    },

    /**
	* Store remaining time, stop timer
	* You can pause from an away, idle OR active state
	*/
    pause : function()
    {
    },

    /**
	* Start timer with remaining value.
	*/
    resume : function()
    {
    },

    /**
     * 
     */
    _timeout : function(userData, timerId)
    {
      if(this.__timerId == timerId)
      {
      	var idleTimeout = this.getIdleTimeout();
    	var awayTimeout = this.getAwayTimeout();
    	var logoutTimeout = this.getLogoutTimeout();

        var timer = this.__timer;

        timer.stop(timerId);

        switch(userData.state)
        {
          case "idle":
            var data = {
              timeout : idleTimeout
            };

            this.fireDataEvent("idle", data);

            // One shot timer
            this.__timerId = timer.start(this._timeout, 0, this, {state : "away"}, awayTimeout - idleTimeout);
            break;

          case "away":
            var data = {
              timeout : awayTimeout
            };

            this.fireDataEvent("away", data);

            if(logoutTimeout != null)
            {
              // One shot timer
              this.__timerId = timer.start(this._timeout, 0, this, {state : "logout"}, awayTimeout - idleTimeout - logoutTimeout);
            }
            break;

          case "logout":
            var data = {
              timeout : logoutTimeout
            };

            this.fireDataEvent("logout", data);
            break;
        }
      }
    },

    /**
	 * Restore initial settings and restart timer
	 * 
	 * @param e {qx.event.type.Event} the event data.
	 */
    reset : function(e)
    {
      this.__timer.stop(this.__timerId);
      
      this.start();
    },

    /**
     * Stop a running timer
     *
     * @param timerId {Integer}
     *   A timer id previously returned by start()
     */
    stop : function(timerId)
    {
      this.__timer.stop(timerId);
    },


    /**
     * Returns the state
     */
    getState : function()
    {
      var time = 0;

      if(time >= this.getAwayTimeout())
      {
        return "away";
      }
      else if(time >= this.getIdleTimeout())
      {
        return "idle";
      }
      else
      {
        return "active";
      }
    },

    /**
     * The last time state changed.
     */
    getPreviousTimeChange : function()
    {
    },

    /**
     * The elapsed time since previous state change.
     */
    getElapsedTime : function()
    {
      var time = 0;
      return time;
    },

    /**
     * Returns the time until becoming idle.
     */
    getRemainingTime : function()
    {
      var time = 0;
      var remaining = this.getIdleTimeout() - time;

      if(remaining <= 0)
      {
        return 0;
      }
      else
      {
        return this.getIdleTimeout() - time;
      }
    },

    /**
     * The last time timer was active.
     */
    getLastActiveTime : function()
    {
      return this.__lastActiveTime;
    },


    _applyIdleTimeout : function(value, old)
    {
    },

    _applyAwayTimeout : function(value, old)
    {
    },

    _applyLogoutTimeout : function(value, old)
    {
    }
  }
});
