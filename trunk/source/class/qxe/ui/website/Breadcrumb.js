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
 * A row of links used to navigate a website. The links can be right- or
 * left-aligned, or they can be justified, i.e. they will be stretched
 * to fill the available width.
 *
 * <h2>Markup</h2>
 * Each breadcrumb widget contains an unordered list element (<code>ul</code>), which
 * will be created if not already present.
 * The breadcrumb are list items (<code>li</code>). Each breadcrumb link can contain
 * a link with a <code>menu</code> data attribute where the value is a
 * CSS selector string identifying the corresponding menu. Headers and menus
 * will not be created automatically. They can be predefined in the DOM before
 * the <code>q().breadcrumb()</code> factory method is called, or added programmatically.
 *
 * <h2>CSS Classes</h2>
 * <table>
 *   <thead>
 *     <tr>
 *       <td>Class Name</td>
 *       <td>Applied to</td>
 *       <td>Description</td>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>qx-breadcrumb</code></td>
 *       <td>Container element</td>
 *       <td>Identifies the Breadcrumb widget</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-flex-justify-end</code></td>
 *       <td>Breadcrumb container (<code>ul</code>)</td>
 *       <td>Browsers with flexbox support only: Styles the breadcrumb links when they are right-aligned</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-breadcrumb-justify</code></td>
 *       <td>Container element</td>
 *       <td>Internet Explorer < 10 only: Styles the breadcrumb links when they are stretched to fill out the available width</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-breadcrumb-right</code></td>
 *       <td>Container element</td>
 *       <td>Internet Explorer < 10 only: Styles the breadcrumb links when they are right-aligned</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-breadcrumb-link</code></td>
 *       <td>Breadcrumb (<code>li</code>)</td>
 *       <td>Identifies and styles the breadcrumb</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-breadcrumb-link-active</code></td>
 *       <td>Breadcrumb (<code>li</code>)</td>
 *       <td>Identifies and styles the current link. Applied in addition to <code>qx-breadcrumb-link</code></td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-flex-1</code></td>
 *       <td>Tab (<code>li</code>)</td>
 *       <td>Browsers with flexbox support only: Styles the breadcrumb links when they are stretched to fill out the available width</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h2 class="widget-markup">Generated DOM Structure</h2>
 *
 * @require(qx.module.Template)
 *
 * @group (Widget)
 */
qx.Bootstrap.define("qxe.ui.website.Breadcrumb", {
  extend : qx.ui.website.Widget,

  statics : {
    /**
     * Factory method which converts the current collection into a breadcrumb
     * widget.
     *
     * @attach{qxWeb}
     * @param align {String?} Breadrcrumb link alignment. Default: <code>left</code>
     * @param preselected {Integer?} The (zero-based) index of the link that
     * should initially be selected. Default: <code>0</code>
     * @return {qxe.ui.website.Breadcrumb}
     */
    breadcrumb : function(align, preselected) {
      var breadcrumb =  new qxe.ui.website.Breadcrumb(this);
      if (typeof preselected == "number") {
        breadcrumb.setConfig("preselected", preselected);
      }

      breadcrumb.init();
      if (align) {
        breadcrumb.setConfig("align", align);
        breadcrumb.render();
      }

      return breadcrumb;
    },


    /**
     * *link*
     *
     * Template used by {@link #addLink} to create a new link.
     *
     * Default value: <pre><li><link>{{{content}}}</link></li></pre>
     */
    _templates : {
      button : "<li><link>{{{content}}}</link></li>"
    },

    /**
     * *preselected*
     * 
     * The index of the menu that should be opened after initial
     * rendering, or <code>null</code> if no menu should be opened.
     *
     * Default value: <pre>0</pre>
     *
     * *align*
     *
     * Configuration for the alignment of the breadcrumb links. This possible
     * values are <code>left</code>, <code>justify</code> and
     * <code>right</code>
     *
     * Default value: <pre>left</pre>
     *
     */
    _config : {
      preselected : 0,
      align : "left"
    }
  },


  construct : function(selector, context) {
    this.base(arguments, selector, context);
  },


  events : {
    /**
     * Fired when the selected menu has changed. The value is
     * the newly selected menu's index
     */
    "changeSelected" : "Number"
  },


  members : {
    init : function() {
      if (!this.base(arguments)) {
        return false;
      }

      this._forEachElementWrapped(function(breadcrumb) {
        var cssPrefix = this.getCssPrefix();

        if (breadcrumb.getChildren("ul").length === 0) {
          var list = qxWeb.create("<ul/>");
          var content = breadcrumb.getChildren();
          if (content.length > 0) {
            list.insertBefore(content.eq(0));
          } else {
            breadcrumb.append(list);
          }
        }

        var links = breadcrumb.getChildren("ul").getFirst()
          .getChildren("li").not("." + cssPrefix + "-menu");
        links._forEachElementWrapped(function(link) {
          var menuSelector = link.getData(cssPrefix + "-menu");
          if (!menuSelector) {
            return;
          }
          link.addClass(cssPrefix + "-link")
            .$onFirstCollection("tap", this._onTap, breadcrumb);

          var menu = breadcrumb._getMenu(link);
          if (menu.length > 0) {
            menu.addClass(cssPrefix + "-menu");
          }

          this._showMenu(null, link);
        }.bind(this));

        // ignore pageless buttons
        links = links.filter("." + cssPrefix + "-link");

        if (this.getConfig("align") == "right" &&
          q.env.get("engine.name") == "mshtml" &&
          q.env.get("browser.documentmode") < 10)
        {
          links.remove();
          for (var i=links.length - 1; i>=0; i--) {
            breadcrumb.find("> ul").append(links[i]);
          }
        }

        var active = links.filter("." + cssPrefix + "-link-active");
        var preselected = this.getConfig("preselected");
        if (active.length === 0 && typeof preselected == "number") {
          active = links.eq(preselected).addClass(cssPrefix + "-link-active");
        }

        if (active.length > 0) {
          this._showMenu(active, null);
        }

//        breadcrumb.getChildren("ul").getFirst().$onFirstCollection("keydown", this._onKeyDown, this);

        this._applyAlignment(breadcrumb);
      }.bind(this));

      return true;
    },


    render : function() {
      var cssPrefix = this.getCssPrefix();
      this._forEachElementWrapped(function(breadcrumb) {
        var content = [];
        var menus= [];
        var selected = null;
        breadcrumb.find("> ul > ." + cssPrefix + "-link")._forEachElementWrapped(function(li) {
          li.$offFirstCollection("tap", breadcrumb._onTap, breadcrumb);
          menus.push(li.getData(cssPrefix + "-menu"));
          content.push(li.find("> link").getHtml());
          if (li.hasClass(cssPrefix + "-link-active")) {
            selected = content.length - 1;
          }
        });

        breadcrumb.find("> ul").setHtml("");

        if (q.env.get("engine.name") == "mshtml" && q.env.get("browser.documentmode") < 10) {
          var toRight = this.getConfig("align") == "right" && !breadcrumb.find("> ul").hasClass(cssPrefix + "-right");
          var fromRight = this.getConfig("align") != "right" && breadcrumb.find("> ul").hasClass(cssPrefix + "-right");
          if (toRight || fromRight) {
            content.reverse();
            menus.reverse();
            selected = content.length - 1 - selected;
          }
        }


        breadcrumb.find("> ul").removeClasses([cssPrefix + "-justify", cssPrefix + "-right"]);

        content.forEach(function(content, i) {
          breadcrumb.addLink(content, menus[i]);
          var menu = breadcrumb._getMenu(breadcrumb.find("> ul > ." + cssPrefix + "-link:last-child"));
          if (i == selected) {
            breadcrumb.find("> ul > ." + cssPrefix + "-link:first-child").removeClass(cssPrefix + "-link-active");
            breadcrumb.find("> ul > ." + cssPrefix + "-link:last-child").addClass(cssPrefix + "-link-active");
            breadcrumb._switchMenus(null, menu);
          } else {
            breadcrumb._switchMenus(menu, null);
          }
        });

        this._applyAlignment(breadcrumb);
        this.setEnabled(this.getEnabled());
      });

      return this;
    },


    /**
     * Adds a new breadcrumb link
     *
     * @param label {String} The link's content. Can include markup.
     * @param pageSelector {String} CSS Selector that identifies the associated page
     * @return {qxe.ui.website.Breadcrumb} The collection for chaining
     */
    addLink : function(label, menuSelector) {
      var cssPrefix = this.getCssPrefix();
      this._forEachElementWrapped(function(item) {

        var link = qxWeb.create(
          qxWeb.template.render(
            item.getTemplate("link"),
            {content: label}
          )
        ).addClass(cssPrefix + "-link");
        var list = item.find("> ul");
        var links = list.getChildren("li");
        if (list.hasClass(cssPrefix + "-right") && links.length > 0) {
          link.insertBefore(links.getFirst());
        } else {
          link.appendTo(list);
        }

        link.$onFirstCollection("tap", this._onTap, item)
        .addClass(cssPrefix + "-link");
        if (item.find("> ul ." + cssPrefix + "-link").length === 1) {
          link.addClass(cssPrefix + "-link-active");
        }

        if (menuSelector) {
          link.setData(cssPrefix + "-menu", menuSelector);
          var menu = this._getMenu(link);
          menu.addClass(cssPrefix + "-menu");
          if (link.hasClass(cssPrefix + "-link-active")) {
            this._switchMenus(null, menu);
          } else {
            this._switchMenus(menu, null);
          }
        }
      }, this);

      return this;
    },


    /**
     * Selects a breadcrumb link
     *
     * @param index {Integer} index of the link to select
     * @return {qxe.ui.website.Breadcrumb} The collection for chaining
     */
    select : function(index) {
      var cssPrefix = this.getCssPrefix();
      this._forEachElementWrapped(function(breadcrumb) {
        var links = breadcrumb.find("> ul > ." + cssPrefix + "-link");
        var oldLink = breadcrumb.find("> ul > ." + cssPrefix + "-link-active").removeClass(cssPrefix + "-link-active");
        if (this.getConfig("align") == "right") {
          index = links.length -1 - index;
        }
        var newLink = links.eq(index).addClass(cssPrefix + "-link-active");
        breadcrumb._showMenu(newLink, oldLink);
        breadcrumb.emit("changeSelected", index);
      });

      return this;
    },


    /**
     * Initiates the menu switch when a link was clicked/tapped
     *
     * @param e {Event} Tap event
     */
    _onTap : function(e) {
      if (!this.getEnabled()) {
        return;
      }
      var tappedLink = e.getCurrentTarget();
      var cssPrefix = this.getCssPrefix();
      this._forEachElementWrapped(function(breadcrumb) {
        var oldLink = breadcrumb.find("> ul > ." + cssPrefix + "-link-active");
        if (oldLink[0] == tappedLink) {
          return;
        }
        oldLink.removeClass(cssPrefix + "-link-active");

        var newLink = null;
        var links = breadcrumb.find("> ul > ." + cssPrefix + "-link")
          ._forEachElementWrapped(function(link) {
          if (tappedLink === link[0]) {
            newLink = link;
          }
        });
        breadcrumb._showMenu(newLink, oldLink);
        newLink.addClass(cssPrefix + "-link-active");
        var index = links.indexOf(newLink[0]);
        if (this.getConfig("align") == "right") {
          index = links.length - 1 - index;
        }
        breadcrumb.emit("changeSelected", index);
      });
    },


    /**
     * Initiates the menu switch if a breadcrumb link is selected
     *
     * @param newLink {qxWeb} selected link
     * @param oldLink {qxWeb} previously active link
     */
    _showMenu : function(newLink, oldLink) {
      var oldMenu = this._getMenu(oldLink);
      var newMenu = this._getMenu(newLink);
      if (oldMenu[0] == newMenu[0]) {
        return;
      }

      this._switchMenus(oldMenu, newMenu);
    },


    /**
     * Executes a menu switch
     *
     * @param oldMenu {qxWeb} the previously selected menu
     * @param newMenu {qxWeb} the newly selected menu
     */
    _switchMenus : function(oldMenu, newMenu) {
      if (oldMenu) {
        oldMenu.hide();
      }

      if (newMenu) {
        newMenu.show();
      }
    },


    /**
     * Returns the breadcrumb menu associated with the given link
     *
     * @param link {qxWeb} breadcrumb link
     * @return {qxWeb} breadcrumb menu
     */
    _getMenu : function(link) {
      var menuSelector = null;
      if (link) {
        menuSelector = link.getData(this.getCssPrefix() + "-menu");
      }
      return qxWeb(menuSelector);
    },


    /**
     * Apply the CSS classes for the alignment
     *
     * @param tabs {qx.ui.website.Tabs[]} tabs collection
     */
    _applyAlignment : function(tabs) {
      var align = breadcrumb.getConfig("align");
      var cssPrefix = this.getCssPrefix();
      var links = breadcrumb.find("ul > li");

      if (q.env.get("engine.name") == "mshtml" && q.env.get("browser.documentmode") < 10) {
    	breadcrumb.addClass(cssPrefix + "-float");

        if (align == "justify") {
          breadcrumb.addClass(cssPrefix + "-justify");
        } else {
          breadcrumb.removeClass(cssPrefix + "-justify");
        }

        if (align == "right") {
          breadcrumb.addClass(cssPrefix + "-right");
        } else {
          breadcrumb.removeClass(cssPrefix + "-right");
        }
      } else {
        links
          .getChildren("li").not("." + cssPrefix + "-menu")
          .filter("." + cssPrefix + "-link");

        breadcrumb.addClass("qx-flex-ready").find("> ul").addClass("qx-hbox");
        if (align == "justify") {
          links.addClass("qx-flex1");
        } else {
          links.removeClass("qx-flex1");
        }

        if (align == "right") {
          breadcrumb.find("> ul").addClass("qx-flex-justify-end");
        } else {
          breadcrumb.find("> ul").removeClass("qx-flex-justify-end");
        }
      }
    },


    dispose : function() {
      var cssPrefix = this.getCssPrefix();
      this._forEachElementWrapped(function(breadcrumb) {
        breadcrumb.find("." + cssPrefix + "-link").$offFirstCollection("tap", breadcrumb._onTap, breadcrumb);
        breadcrumb.getChildren("ul").getFirst().$offFirstCollection("keydown", breadcrumb._onKeyDown, breadcrumb)
        .setHtml("");
      });

      this.setHtml("").removeClass(cssPrefix);

      return this.base(arguments);
    }
  },


  defer : function(statics) {
    qxWeb.$attach({
      breadcrumb : statics.breadcrumb
    });
  }
});
