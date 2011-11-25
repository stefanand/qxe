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
 * A formatter and parser for strings.
 */
qx.Class.define("qx.util.format.StringFormat",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Fills a number with leading zeros ("25" -> "0025").
     *
     * @param number {Integer} the number to fill.
     * @param minSize {Integer} the minimum size the returned string should have.
     * @return {String} the filled number as string.
     */
    padZeros : function(number, minSize)
    {
      var str = "" + (number < 0 ? ((-1) * number) : number);

      while (str.length < minSize) {
        str = "0" + str;
      }

      return number < 0 ? "-" + str : str;
    }
  }
});
