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
 * A page control mixin to control the scrolling of pages.
 */
qx.Mixin.define("qxe.ui.control.MPageControl",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
     * An x scroll factor.
     */
    xScrollFactor :
    {
      check : "Number",
      init : 5,
      event : "xScrollFactorChanged"
    },

    /*
     * An y scroll factor.
     */
    yScrollFactor :
    {
      check : "Number",
      init : 5,
      event : "xScrollFactorChanged"
    },

    /*
     * A flag to control if the user has scrolled to the bottom of the document.
     */
    scrolledAll :
    {
      check : "Boolean",
      init : false,
      event : "scrolledAllChanged"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Secures that the subscriber scrolls all pages and all lines of the document displayed.
     * 
     * @param e {qx.event.type.Execute} execute event
     */
    _onScrollY : function(e)
    {      
      var pane = this.getChildControl("scroll-pane").getChildControl("pane");

      if(this.getCurrentPage() == this.getTotalPages() && pane.getScrollY() == pane.getScrollMaxY())
      {
        this.setScrolledAll(true);
      }
    },

    /**
     * Catch keyboard input.
     */
    _onKeyUp : function(e)
    {
      var key = (e.isCtrlPressed() ? "Ctrl-" : "") + (e.isShiftPressed() ? "Shift-" : "") + (e.getType() !== "keyinput" ? e.getKeyIdentifier() : "");

      switch(key)
      {
        case "Home":
          this.gotoBeginLine();
          break;

        case "Ctrl-Home":
          this.gotoBeginPageDocument();
          break;

        case "End":
          this.gotoEndLine();
          break;

        case "Ctrl-End":
          this.gotoEndPageDocument();
          break;

        case "Up":
          this.goUp();
          break;

        case "Down":
          this.goDown();
          break;

        case "PageUp":
          this.goScrollPageUp();
          break;

        case "Ctrl-PageUp":
          this.goPageUp();
          break;

        case "PageDown":
          this.goScrollPageDown();
          break;

        case "Ctrl-PageDown":
          this.goPageDown();
          break;

        case "Left":
          this.scrollLeft();
          break;

        case "Ctrl-Left":
          this.scrollWindowLeft();
          break;

        case "Right":
          this.scrollRight();
          break;

        case "Ctrl-Right":
          this.scrollWindowRight();
          break;
      }
    },

    /**
     * Scroll to the left most position of the current page.
     */
    gotoBeginLine : function()
    {
      this.getChildControl("scroll-pane").scrollToX(0);
    },

    /**
     * First scroll up to the top of current page.
     * If already on top of the current page, go to top of the first page.
     */
    gotoBeginPageDocument : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");

      if(scrollPane.getChildControl("pane").getScrollY() == 0)
      {
        this.gotoPage(1);
      }
      else
      {
        scrollPane.scrollToY(0);
      }
    },

    /**
     * Scroll to the right most position of the current page.
     */
    gotoEndLine : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var maxPosition = scrollPane.getChildControl("pane").getScrollMaxX();

      scrollPane.scrollToX(maxPosition);
    },

    /**
     * First scroll down to the bottom of current page.
     * If already on bottom of the current page, go to bottom of the last page.
     */
    gotoEndPageDocument : function()
    {
      this.getChildControl("page-control").getChildControl("current-page-field").setValue("" + this.getTotalPages());

      var scrollPane = this.getChildControl("scroll-pane");
      var pane = scrollPane.getChildControl("pane");
      var maxPosition = pane.getScrollMaxY();

      if(pane.getScrollY() == maxPosition)
      {
        this.gotoPage(this.getTotalPages());
      }
      else
      {
        scrollPane.scrollToY(maxPosition);
      }

      scrollPane.scrollToX(0);
    },

    /**
     * Scroll up one line and change page if necessary.
     */
    goUp : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");

      if(scrollPane.getScrollY() == 0)
      {
        this.gotoPage(this.getCurrentPage() - 1);

        scrollPane.scrollToY(scrollPane.getChildControl("pane").getScrollMaxY());
      }
      else
      {
        scrollPane.scrollByY(-this.getYScrollFactor());
      }
    },

    /**
     * Scroll down one line and change page if necessary.
     */
    goDown : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");

      if(scrollPane.getScrollY() == scrollPane.getChildControl("pane").getScrollMaxY())
      {
        this.gotoPage(this.getCurrentPage() + 1);

        scrollPane.scrollToY(0);
      }
      else
      {
        scrollPane.scrollByY(this.getYScrollFactor());
      }
    },

    /**
     * Scroll up one view and change page if necessary.
     */
    goScrollPageUp : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var yPosition = scrollPane.getScrollY();

      if(yPosition > 0)
      {
        scrollPane.scrollToY(Math.max(0, yPosition - scrollPane.getPaneSize().height));
      }
      else
      {
        this.gotoPage(Math.max(1, this.getCurrentPage() - 1));
        scrollPane.scrollToY(scrollPane.getChildControl("pane").getScrollMaxY());
      }
    },

    /**
     * Scroll up one page.
     */
    goPageUp : function()
    {
      this.gotoPage(this.getCurrentPage() - 1);
    },

    /**
     * Scroll down one view and change page if necessary.
     */
    goScrollPageDown : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var yPosition = scrollPane.getScrollY();
      var maxPosition = scrollPane.getChildControl("pane").getScrollMaxY();

      if(yPosition < maxPosition)
      {
        scrollPane.scrollToY(Math.min(maxPosition, yPosition + scrollPane.getPaneSize().height));
      }
      else
      {
        this.gotoPage(Math.min(this.getTotalPages(), this.getCurrentPage() + 1));
        scrollPane.scrollToY(0);
      }
    },

    /**
     * Scroll down one page.
     */
    goPageDown : function()
    {
      this.gotoPage(this.getCurrentPage() + 1);
    },

    /**
     * Scroll left.
     */
    scrollLeft : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");

      scrollPane.scrollToX(Math.max(0, scrollPane.getScrollX() - this.getXScrollFactor()));
    },

    /**
     * Scroll one window left.
     */
    scrollWindowLeft : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var newPosition = scrollPane.getScrollX() - scrollPane.getInnerSize().width;

      scrollPane.scrollToX(Math.max(0, newPosition));
    },

    /**
     * Scroll right.
     */
    scrollRight : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var maxPosition = scrollPane.getChildControl("pane").getScrollMaxX();

      scrollPane.scrollToX(Math.min(maxPosition, scrollPane.getScrollX() + this.getXScrollFactor()));
    },

    /**
     * Scroll one window right.
     */
    scrollWindowRight : function()
    {
      var scrollPane = this.getChildControl("scroll-pane");
      var maxPosition = scrollPane.getChildControl("pane").getScrollMaxX();
      var paneWidth = scrollPane.getInnerSize().width;

      scrollPane.scrollToX(Math.min(maxPosition, scrollPane.getScrollX() + paneWidth));
    }
  }
});

