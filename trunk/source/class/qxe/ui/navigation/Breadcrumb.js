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

   TODO:
     - remove link with an x-icon ?

************************************************************************ */

/**
 * A breadcrumb is a visual representation of the path to the current page
 * by links into a hierarchy. The purpose is to give users a way of keeping
 * track of their location within a website.
 * 
 * As above, breadcrumbs typically appear horizontally near the top of a web-
 * page providing links back either through each previous page in the link
 * trail of through the directory hierarchy in which the file is found.
 *
 * http://www.ajaxblender.com/xbreadcrumbs.html
 */
qx.Class.define("qxe.ui.navigation.Breadcrumb",
{
  extend : qx.ui.toolbar.ToolBar,



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Appearance of the widget */
    appearance :
    {
      refine : true,
      init : "breadcrumb"
    }
  }
});


//---------------------
/*
function breadcrumbs(home,name){
  sURL = new String;
  bits = new Object;
  var x = 0;
  var stop = 0;
  var output = "<b><font color=\"darkgreen\">You are here:\<\/font\></b>           <a href=\"http\:\/\/"+home+"\">Home</a> \<b\>→\<\/b\>  ";
  sURL = location.href;
  sURL = sURL.slice(8,sURL.length);
  chunkStart = sURL.indexOf("/");
  sURL = sURL.slice(chunkStart+1,sURL.length)

  while(!stop){
    chunkStart = sURL.indexOf("/");
    if (chunkStart != -1){
      bits[x] = sURL.slice(0,chunkStart)
      sURL = sURL.slice(chunkStart+1,sURL.length);
    }else{
      stop = 1;
    }
    x++;
  }

  for(var i in bits){
    output += "<a href=\"";
    for(y=1;y<x-i;y++){
      output += "../";
    }
    output += bits[i] + "/\">" + bits[i] + "</a>  \<b\>→\<\/b\>  ";
  }

  document.write(output + name);
}
*/

/**
 * 

<ul id="breadcrumbs">
     <li>
          <a href="#">Home</a>
          <ul>
               <li><a href="#">Servers</a></li>
               <li><a href="#">Desktop Computers</a></li>
               <li><a href="#">Laptops</a></li>
          </ul>
     </li>
     <li>
          <a href="#">Laptops</a>
          <ul>
               <li><a href="#">Dell</a></li>
               <li><a href="#">HP</a></li>
               <li><a href="#">Apple</a></li>
               <li><a href="#">IBM</a></li>
          </ul>
     </li>
     <li>
          <a href="#">Apple</a>
          <ul>
               <li><a href="#">MacBook Pro</a></li>
               <li><a href="#">MacBook Air</a></li>
          </ul>
     </li>
     <li><a href="#">MacBook Air</a></li>
</ul>
*/

/*
qx.Class.define("qxe.ui.navigation.Breadcrumb",
{
  extend : qx.ui.core.Widget,
*/


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * 
   * json
   * {
   *   fruit : {
   *     name : "Fruit",
   *     link : "fruit",
   *     items : [
   *     ]
   *   }
   * }
   */
/*
  construct : function(json)
  {
    this.base(arguments);

    this._build(json);
  },
*/
/*
  rootpath:
	  allbread += crumbsep + precrumb + "<a href="" + currenturl + "">" + displayname + "</a>" + postcrumb;

	  plugin: html, directory, path, custom
*/

  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

/*
   properties :
   {
     // overridden
     appearance :
     {
       refine : true,
       init   : "breadcrumb"
     },
*/
     /**
      * There are three main types of breadcrumb trails that can be classified as:
      * 
      * 1. path
      * 
      * It displays the actual route taken by the user to reach the current page.
      * It is dynamic in that it displays the pages the user has visited before
      * arriving on the current page.
      * 
      * 2. attribute
      * 
      * It displays information that categorizes the current page and may also
      * provide several routes by which the current page can be reached.
      * 
      * 3. location
      * 
      * This is the commonest form of breadcrumb and show the user where they are
      * in the website’s hierarchy. They are typically used for navigation schemes
      * that have multiple levels (usually more than two levels).
      */
/*
     type :
     {
       check : ["location", "path", "attribute"],
       init : "location",
       nullable : true,
       event : "changeType"
     },
*/
     /** separator: → or / or > or -> */
/*
     separator :
     {
       check : "String",
       init : "",
       nullable : true,
       event : "changeSeparator"
     },
*/
	 /** precrumb - a character before */
/*
     precrumb :
     {
       check : "String",
       init : "",
       nullable : true,
       event : "changePrecrumb"
     },
*/
     /** postcrumb - a character after */
/*
     postcrumb :
     {
       check : "String",
       init : "",
       nullable : true,
       event : "changePostcrumb"
     },
*/
     /**
      * Numeric value in milliseconds or jQuery string value ’fast’, ‘normal’, ’slow’.
      * The parameter sets speed of sub level to appear.
      * If empty then no transition is used.
      */
/*
     showSpeed :
     {
       check : ["fast", "normal", "slow"],
       init : "fast",
       nullable : true,
       event : "changeShowSpeed"
     },
*/
     /**
      * Numeric value in milliseconds or jQuery string value ’fast’, ‘normal’, ’slow’.
      * The parameter sets speed of sub level to hide.
      * If empty then no transition is used.
      */
/*
     hideSpeed :
     {
       check : ["fast", "normal", "slow"],
       init : "",
       nullable : true,
       event : "changeHideSpeed"
     },
*/
     /** Parameters enables collapsing of upper levels. */
     /*
     collapsible :
     {
       check : "Boolean",
       init : false,
       nullable : false,
       event : "changeCollapsible"
     },
*/
     /** Width of collapsed level. */
     /*
     collapseWidth :
     {
       check : "Integer",
       init : 10,
       nullable : true,
       event : "changeCollapseWidth"
     },
*/
     /** Multi-level is where the path items have subitems. */
/*
     multiLevel :
     {
       check : "Boolean",
       init : false,
       nullable : false,
       event : "changeMultiLevel"
     }
   },
*/

  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
/*
  members :
  {
    _build : function()
    {
        var html1 = "<div style='background-color: white; text-align: center;'>" +
        "<i style='color: red;'><b>H</b></i>" +
        "<b>T</b>" +
        "<u>M</u>" +
        "<i>L</i>" +
        " Text" +
      "</div>";
var embed1 = new qx.ui.embed.Html(html1);
embed1.setWidth(300);
embed1.setHeight(20);
embed1.setDecorator("main");
container.add(embed1);

      if(this.isCollapsible())
      {
        var sz = element.children('LI').length;
        element.children('LI').children('A').css('white-space', 'nowrap').css('float', 'left');
        element.children('LI').children('A').each(function(i, el) {
          if(i != sz - 1)
          {
            $(this).css('overflow', 'hidden');
            $(this).attr('init-width', $(this).width());
            $(this).width(this.getCollapsedWidth());
          }
        });
      }

      element.children('LI').addListener("pointerenter", this._onPointerEnter, this);
      element.children('LI').addListener("pointerleave", this._onPointerLeave, this);
    },

    _onPointerEnter : function()
    {
      if($(this).hasClass('hover'))
      {
        return;
      }

      _hideAllSubLevels();

      if(!_subLevelExists($(this)))
      {
        return;
      }

      // Show sub-level
      var subLevel = $(this).children('UL');
      _showHideSubLevel(subLevel, true);

      if(this.isCollapsible() && !$(this).hasClass('current'))
      {
        var initWidth = $(this).children('A').attr('init-width');
        $(this).children('A').animate({width: initWidth}, 'normal');
      }
    },

    _onPointerLeave : function()
    {
      var subLevel = $(this).children('UL');
      _showHideSubLevel(subLevel, false);

      if(this.isCollapsible() && !$(this).hasClass('current'))
      {
        $(this).children('A').animate({width: this.getCollapsedWidth()}, 'fast');
      }
    },

    _hideAllSubLevels : function()
    {
      element.children('LI').children('UL').each(function() {
        $(this).hide();
        $(this).parent().removeClass('hover');
      });
    },

    _showHideSubLevel : function(subLevel, isShow)
    {
      if(isShow)
      {
        subLevel.parent().addClass('hover');

        if($.browser.msie)
        {
          var pos = subLevel.parent().position();
          subLevel.css('left', parseInt(pos['left']));
        }

        if(this.getShowSpeed() != '')
        {
          subLevel.fadeIn(this.getShowSpeed());
        }
        else
        {
          subLevel.show();
        }
      }
      else
      {
        subLevel.parent().removeClass('hover');
 
        if(this.getHideSpeed() != '')
        {
          subLevel.fadeOut(this.getHideSpeed());
        }
        else
        {
          subLevel.hide();
        }
      }
    },

    _subLevelExists : function(obj)
    {
      return obj.children('UL').length > 0;
    },

    getRootname : function()
    {
    }
  }
});
*/ 

/*
.xbreadcrumbs {
position: relative;
z-index: 1000;
}
.xbreadcrumbs LI UL {
position: absolute;
float: left;
}
.xbreadcrumbs, .xbreadcrumbs LI, .xbreadcrumbs UL, .xbreadcrumbs UL LI {
list-style: none;
margin: 0;
padding: 0;
}
.xbreadcrumbs { clear: both; }
.xbreadcrumbs, .xbreadcrumbs LI {
float: left;
}
.xbreadcrumbs UL {
display: none;
}
*/
/* Base style of xBreadcrumbs */
/* Top Level */
/*
.xbreadcrumbs {
background: #F0F0F0;
width: 100%;
}
.xbreadcrumbs LI {
padding: 5px;
border-right: 1px solid #CECECE;
height: 16px;
}
.xbreadcrumbs LI.current {
border-right: none;
}
.xbreadcrumbs LI A {
font-size: 11px;
color: #666666;
text-decoration: none;
}
.xbreadcrumbs LI A:HOVER, .xbreadcrumbs LI.hover A {
color: #0A8ECC;
}
*/
/* Top Level - Current Page */
/*
.xbreadcrumbs LI.current A {
color: #333333;
font-weight: bold;
}
*/
/* Sub-level */
/*
.xbreadcrumbs LI UL {
padding: 3px;
background: #333333;
font-size: 11px;
width: 180px;
top: 25px;
}
.xbreadcrumbs LI UL LI {
float: left;
width: 100%;
border-right: none;
height: auto;
}
.xbreadcrumbs LI UL LI A {
text-decoration: none;
color: #CCCCCC !important;
display: block;
padding: 4px;
border-bottom: 1px dotted #666666;
}
.xbreadcrumbs LI UL LI:last-child A {
border-bottom: none;
}
.xbreadcrumbs LI UL LI A:HOVER {
background: #444444;
}
*/
