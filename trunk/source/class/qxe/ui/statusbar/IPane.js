/* ****************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

**************************************************************************** */

/**
 * A status bar pane.
 */
qx.Interface.define("qxe.ui.statusbar.IPane",
{
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      USER API
    ---------------------------------------------------------------------------
    */
 
    /**
     * Sets the value of the statusbar.
     *
     * @param required {Object} An object value to set.
     */
    setValue : function(obj)
    {
      return arguments.length == 1;
    }
  }
});

