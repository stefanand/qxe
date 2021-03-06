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
 * A page control interface to control the scrolling between pages.
 */
qx.Interface.define("qxe.ui.control.IPageControl",
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
/*
    gotoFirstPage : function()
    {
    },

    gotoPreviousPage : function()
    {
      this.gotoRelativePage(-1);
    },

    gotoNextPage : function()
    {
      this.gotoRelativePage(1);
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
     * Go to page in the document.
     *
     * @param num {Number} page number
     */
    gotoPage : function(num)
    {
      this.assertInteger(num);
    },
/*
    goPageUp : function()
    {
    },

    goPageDown : function()
    {
    },
*/
    /**
     * Get the current page of the document.
     *
     * @return {Number} current page
     */
    getCurrentPage : function()
    {
    },

    /**
     * Get the total number of pages of the document.
     *
     * @return {Number} total number of pages
     */
    getTotalPages : function()
    {
    }
  }
});

