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

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe WebDesktop"
 */
qx.Class.define("qxe.demo.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Document is the application root
      var doc = this.getRoot();

      this.createCommands();

      var webDesktop = new qxe.ui.webdesktop.WebDesktop(this.createMenuBar(), this.createTaskBar(), this.createBackground());

      doc.add(webDesktop, {edge: 0});
    },

    createCommands : function()
    {
      this.__newCommand = new qx.ui.core.Command("Ctrl+N");
      this.__newCommand.addListener("execute", this.debugCommand);

      this.__openCommand = new qx.ui.core.Command("Ctrl+O");
      this.__openCommand.addListener("execute", this.debugCommand);

      this.__saveCommand = new qx.ui.core.Command("Ctrl+S");
      this.__saveCommand.addListener("execute", this.debugCommand);
    },

    debugRadio : function(e) {
      this.debug("Change selection: " + e.getData()[0].getLabel());
    },

    debugCommand : function(e) {
      this.debug("Execute command: " + this.getShortcut());
    },

    debugButton : function(e) {
      this.debug("Execute button: " + this.getLabel());
    },

    debugCheckBox : function(e) {
      this.debug("Change checked: " + this.getLabel() + " = " + e.getData());
    },

    createMenuBar : function()
    {
      var toolbar = new qx.ui.toolbar.ToolBar;
//      toolbar.setWidth(600);

      var basicPart = new qx.ui.toolbar.Part;
      var menuPart = new qx.ui.toolbar.Part;
      var helpPart = new qx.ui.toolbar.Part;

      toolbar.add(basicPart);
      toolbar.add(menuPart);
      toolbar.addSpacer();
      toolbar.add(helpPart);

      var newButton = new qx.ui.toolbar.Button("New", "icon/16/actions/document-new.png", this.__newCommand);
      var openButton = new qx.ui.toolbar.Button("Open", "icon/16/actions/document-open.png", this.__openCommand);
      var saveButton = new qx.ui.toolbar.Button("Save", "icon/16/actions/document-save.png", this.__saveCommand);

      newButton.addListener("execute", this.debugButton);
      openButton.addListener("execute", this.debugButton);
      saveButton.addListener("execute", this.debugButton);

      basicPart.add(newButton);
      basicPart.add(openButton);
      basicPart.add(saveButton);

      basicPart.setShow("icon");


      var fileMenu = new qx.ui.toolbar.MenuButton("File");
      var editMenu = new qx.ui.toolbar.MenuButton("Edit");
      var searchMenu = new qx.ui.toolbar.MenuButton("Search");
      var viewMenu = new qx.ui.toolbar.MenuButton("View");
      var formatMenu = new qx.ui.toolbar.MenuButton("Format");

      fileMenu.setMenu(this.getFileMenu());
      editMenu.setMenu(this.getEditMenu());
      searchMenu.setMenu(this.getSearchMenu());
      viewMenu.setMenu(this.getViewMenu());
      formatMenu.setMenu(this.getFormatMenu());

      menuPart.add(fileMenu);
      menuPart.add(editMenu);
      menuPart.add(searchMenu);
      menuPart.add(viewMenu);
      menuPart.add(formatMenu);


      var helpMenu = new qx.ui.toolbar.MenuButton("Help");
      helpMenu.setMenu(this.getHelpMenu());
      helpPart.add(helpMenu);

      return toolbar;
    },

    getFileMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var newButton = new qx.ui.menu.Button("New", "icon/16/actions/document-new.png", this.__newCommand);
      var openButton = new qx.ui.menu.Button("Open", "icon/16/actions/document-open.png", this.__openCommand);
      var closeButton = new qx.ui.menu.Button("Close");
      var saveButton = new qx.ui.menu.Button("Save", "icon/16/actions/document-save.png", this.__saveCommand);
      var saveAsButton = new qx.ui.menu.Button("Save as...", "icon/16/actions/document-save-as.png");
      var printButton = new qx.ui.menu.Button("Print", "icon/16/actions/document-print.png");
      var exitButton = new qx.ui.menu.Button("Exit", "icon/16/actions/application-exit.png");

      newButton.addListener("execute", this.debugButton);
      openButton.addListener("execute", this.debugButton);
      closeButton.addListener("execute", this.debugButton);
      saveButton.addListener("execute", this.debugButton);
      saveAsButton.addListener("execute", this.debugButton);
      printButton.addListener("execute", this.debugButton);
      exitButton.addListener("execute", this.debugButton);

      menu.add(newButton);
      menu.add(openButton);
      menu.add(closeButton);
      menu.add(saveButton);
      menu.add(saveAsButton);
      menu.add(printButton);
      menu.add(exitButton);

      return menu;
    },

    getEditMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var undoButton = new qx.ui.menu.Button("Undo", "icon/16/actions/edit-undo.png", this.__undoCommand);
      var redoButton = new qx.ui.menu.Button("Redo", "icon/16/actions/edit-redo.png", this.__redoCommand);
      var cutButton = new qx.ui.menu.Button("Cut", "icon/16/actions/edit-cut.png", this.__cutCommand);
      var copyButton = new qx.ui.menu.Button("Copy", "icon/16/actions/edit-copy.png", this.__copyCommand);
      var pasteButton = new qx.ui.menu.Button("Paste", "icon/16/actions/edit-paste.png", this.__pasteCommand);

      undoButton.addListener("execute", this.debugButton);
      redoButton.addListener("execute", this.debugButton);
      cutButton.addListener("execute", this.debugButton);
      copyButton.addListener("execute", this.debugButton);
      pasteButton.addListener("execute", this.debugButton);

      menu.add(undoButton);
      menu.add(redoButton);
      menu.addSeparator();
      menu.add(cutButton);
      menu.add(copyButton);
      menu.add(pasteButton);

      return menu;
    },

    getSearchMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var searchButton = new qx.ui.menu.Button("Search...", "icon/16/actions/system-search.png");
      var nextButton = new qx.ui.menu.Button("Search next...");
      var previousButton = new qx.ui.menu.Button("Search previous...");
      var replaceButton = new qx.ui.menu.Button("Replace");
      var searchFilesButton = new qx.ui.menu.Button("Search in files", "icon/16/actions/system-search.png");
      var replaceFilesButton = new qx.ui.menu.Button("Replace in files");

      previousButton.setEnabled(false);

      searchButton.addListener("execute", this.debugButton);
      nextButton.addListener("execute", this.debugButton);
      previousButton.addListener("execute", this.debugButton);
      replaceButton.addListener("execute", this.debugButton);
      searchFilesButton.addListener("execute", this.debugButton);
      replaceFilesButton.addListener("execute", this.debugButton);

      menu.add(searchButton);
      menu.add(nextButton);
      menu.add(previousButton);
      menu.add(replaceButton);
      menu.addSeparator();
      menu.add(searchFilesButton);
      menu.add(replaceFilesButton);

      return menu;
    },

    getViewMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var panesButton = new qx.ui.menu.Button("Panes", null, null, this.getPanesMenu());
      var syntaxButton = new qx.ui.menu.Button("Syntax", null, null, this.getSyntaxMenu());
      var rulerButton = new qx.ui.menu.CheckBox("Show ruler");
      var numbersButton = new qx.ui.menu.CheckBox("Show line numbers");
      var asciiButton = new qx.ui.menu.Button("ASCII table");

      rulerButton.addListener("changeValue", this.debugCheckBox);
      numbersButton.addListener("changeValue", this.debugCheckBox);
      asciiButton.addListener("execute", this.debugButton);

      menu.add(panesButton);
      menu.add(syntaxButton);
      menu.addSeparator();
      menu.add(rulerButton);
      menu.add(numbersButton);
      menu.addSeparator();
      menu.add(asciiButton);

      return menu;
    },

    getPanesMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var tabsCheckbox = new qx.ui.menu.CheckBox("Show tabs");
      var statusCheckbox = new qx.ui.menu.CheckBox("Show status bar");

      var treeCheckbox = new qx.ui.menu.CheckBox("Show tree");
      var macroCheckbox = new qx.ui.menu.CheckBox("Show macros");
      var tagCheckbox = new qx.ui.menu.CheckBox("Show tags");
      var consoleCheckbox = new qx.ui.menu.CheckBox("Show console");

      tabsCheckbox.setValue(true);
      statusCheckbox.setValue(true);
      macroCheckbox.setValue(true);

      tabsCheckbox.addListener("changeValue", this.debugCheckBox);
      statusCheckbox.addListener("changeValue", this.debugCheckBox);
      treeCheckbox.addListener("changeValue", this.debugCheckBox);
      macroCheckbox.addListener("changeValue", this.debugCheckBox);
      tagCheckbox.addListener("changeValue", this.debugCheckBox);
      consoleCheckbox.addListener("changeValue", this.debugCheckBox);

      menu.add(statusCheckbox);
      menu.add(tabsCheckbox);
      menu.addSeparator();
      menu.add(treeCheckbox);
      menu.add(macroCheckbox);
      menu.add(tagCheckbox);
      menu.add(consoleCheckbox);

      return menu;
    },

    getSyntaxMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var htmlButton = new qx.ui.menu.RadioButton("HTML");
      var xmlButton = new qx.ui.menu.RadioButton("XML");
      var jsButton = new qx.ui.menu.RadioButton("JavaScript");
      var cdialectButton = new qx.ui.menu.Button("C Dialect", null, null, this.getSyntaxCMenu());
      var perlButton = new qx.ui.menu.RadioButton("Perl");
      var pythonButton = new qx.ui.menu.RadioButton("Python");

      menu.add(htmlButton);
      menu.add(xmlButton);
      menu.add(jsButton);
      menu.add(cdialectButton);
      menu.add(perlButton);
      menu.add(pythonButton);

      // Configure and fill radio group
      var langGroup = new qx.ui.form.RadioGroup;
      langGroup.add(htmlButton, xmlButton, jsButton, perlButton, pythonButton);
      langGroup.add.apply(langGroup, cdialectButton.getMenu().getChildren());

      langGroup.addListener("changeSelection", this.debugRadio);

      return menu;
    },

    getSyntaxCMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var cButton = new qx.ui.menu.RadioButton("C");
      var csharpButton = new qx.ui.menu.RadioButton("C Sharp");
      var objcButton = new qx.ui.menu.RadioButton("Objective C");
      var cplusButton = new qx.ui.menu.RadioButton("C Plus Plus");

      menu.add(cButton);
      menu.add(csharpButton);
      menu.add(objcButton);
      menu.add(cplusButton);

      return menu;
    },

    getFormatMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var paragraphButton = new qx.ui.menu.Button("Paragraph", null, null, this.getParagraphMenu());
      var spacesButton = new qx.ui.menu.Button("Tabs to spaces");
      var tabsButton = new qx.ui.menu.Button("Spaces to tabs");
      var upperButton = new qx.ui.menu.Button("Uppercase");
      var lowerButton = new qx.ui.menu.Button("Lowercase");
      var capitalsButton = new qx.ui.menu.Button("Capitals");
      var ansiButton = new qx.ui.menu.Button("OEM to ANSI");
      var oemButton = new qx.ui.menu.Button("ANSI to OEM");

      spacesButton.addListener("execute", this.debugButton);
      tabsButton.addListener("execute", this.debugButton);
      upperButton.addListener("execute", this.debugButton);
      lowerButton.addListener("execute", this.debugButton);
      capitalsButton.addListener("execute", this.debugButton);
      ansiButton.addListener("execute", this.debugButton);
      oemButton.addListener("execute", this.debugButton);

      menu.add(paragraphButton)
      menu.add(spacesButton);
      menu.add(tabsButton);
      menu.addSeparator();
      menu.add(upperButton);
      menu.add(lowerButton);
      menu.add(capitalsButton);
      menu.addSeparator();
      menu.add(ansiButton);
      menu.add(oemButton);

      return menu;
    },

    getParagraphMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var leftButton = new qx.ui.menu.Button("Left aligned", "icon/16/actions/format-justify-left.png");
      var rightButton = new qx.ui.menu.Button("Right aligned", "icon/16/actions/format-justify-right.png");
      var centeredButton = new qx.ui.menu.Button("Centered", "icon/16/actions/format-justify-center.png");
      var justifyButton = new qx.ui.menu.Button("Justified", "icon/16/actions/format-justify-fill.png");

      leftButton.addListener("execute", this.debugButton);
      rightButton.addListener("execute", this.debugButton);
      centeredButton.addListener("execute", this.debugButton);
      justifyButton.addListener("execute", this.debugButton);

      menu.add(leftButton);
      menu.add(rightButton);
      menu.add(centeredButton);
      menu.add(justifyButton);

      return menu;
    },

    getHelpMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var topicsButton = new qx.ui.menu.Button("Topics", "icon/16/apps/utilities-help.png");
      var quickButton = new qx.ui.menu.Button("Quickstart");
      var onlineButton = new qx.ui.menu.Button("Online Forum");
      var infoButton = new qx.ui.menu.Button("Info...");

      topicsButton.addListener("execute", this.debugButton);
      quickButton.addListener("execute", this.debugButton);
      onlineButton.addListener("execute", this.debugButton);
      infoButton.addListener("execute", this.debugButton);

      menu.add(topicsButton);
      menu.add(quickButton);
      menu.addSeparator();
      menu.add(onlineButton);
      menu.addSeparator();
      menu.add(infoButton);

      return menu;
    },

    createTaskBar : function()
    {
      return null;
    },

    createBackground : function()
    {
      var bg = new qx.ui.decoration.Background();
      bg.setBackgroundImage("qxe/demo/logo.gif");
      bg.setBackgroundColor("#134275");
      bg.setBackgroundRepeat("no-repeat");
      bg.setBackgroundPosition("center", "center");

      return bg;
    }
  }
});

