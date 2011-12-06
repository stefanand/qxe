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

/**
 * A page control mixin to control the scrolling between pages.
 */
qx.Mixin.define("qxe.ui.control.MPageControl",
{
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
/*    gotoPage : function(page)
    {

//			this.getChildControl("scroll-pane").scrollToY(0);
    },

    gotoPreviousPage : function()
    {
      this.gotoRelativePage(-1);

//      this.getChildControl("scroll-pane").scrollToY(0);
    },

    gotoNextPage : function()
    {
//      this.gotoRelativePage(1);

//      this.getChildControl("scroll-pane").scrollToY(0);
    },
*/
    /**
     * 1. go to top of current page
     * 2. go to top of first page
     */
/*    gotoPageTop : function()
    {
    },
*/
    /**
     * 1. go to bottom of current page
     * 2. go to bottom of last page
     */
/*    gotoPageBottom : function()
    {
    },

    gotoLast : function()
    {
    },

    goUp : function()
    {
    },

    goDown : function()
    {
    },
*/
    /**
     *
     * fieldChange to prevent reentrance to the textfield of current page
     *
     */
/*    gotoRelativePage : function(relativeFrame, fieldChange)
    {
    },
*/
    /**
     *
     * fieldChange to prevent reentrance to the textfield of current page
     *
     */
/*    gotoPage : function(absoluteFrame, fieldChange)
    {
    },

    goPageUp : function()
    {
    },

    goPageDown : function()
    {
    },
*/

    _onKeyUp : function(e)
    {
      var key = (e.isCtrlPressed() ? "Ctrl-" : "") + (e.isShiftPressed() ? "Shift-" : "") + (e.getType() !== "keyinput" ? e.getKeyIdentifier() : "");

      switch(key)
      {
        case "Home":
//          this.getChildControl("scroll-pane").scrollToY(0);
          break;

        case "Ctrl-Home":
          this.gotoPageTop();
          break;

        case "Ctrl-Shift-Home":
          this.gotoPage(1);
          break;

        case "End":
//          var flashS = this.getChildControl("scroll-pane");
//          var maxPosition = flashS.getChildControl("pane").getScrollMaxY();

//          flashS.scrollToY(maxPosition);
          break;

        case "Ctrl-End":
          this.gotoPageBottom();
          break;

        case "Ctrl-Shift-End":
          this.gotoLast();
          break;

        case "Up":
          this.goUp();
          break;

        case "Down":
          this.goDown();
          break;

        case "PageUp":
          this.goPageUp();
          break;

        case "Ctrl-PageUp":
          this.gotoRelativePage(-1);
          break;

        case "PageDown":
          this.goPageDown();
          break;

        case "Ctrl-PageDown":
          this.gotoRelativePage(1);
          break;
      }
    }
  }
});

