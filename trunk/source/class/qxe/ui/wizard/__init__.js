/**
 * The wizard stacks several pages above each other and allows to switch
 * between them by previous and next navigation buttons, and the step field.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   var wizard = new qxe.ui.wizard.Wizard();
 *
 *   var page1 = new qxe.ui.wizard.Page("First step", "icon/16/apps/utilities-terminal.png");
 *   page1.setLayout(new qx.ui.layout.VBox());
 *   page1.add(new qx.ui.basic.Label("Page Content"));
 *   wizard.add(page1);
 *
 *   var page2 = new qxe.ui.wizard.Page("Second step", "icon/16/apps/utilities-notes.png");
 *   wizard.add(page2);
 *
 *   this.getRoot().add(wizard);
 * </pre>
 *
 * This example builds a wizard with two pages called "First step" and "Second step".
 * Each page is a container widget, which can contain any other widget. Note
 * that the pages need layout to render their children.
 *
 * *External Documentation*
 *
 * <a href='http://contrib.qooxdoo.org/project/qxe/trunk/manual
http://manual.qooxdoo.org/1.6/pages/widget/wizard.html' target='_blank'>
 * Documentation of this widget in the qooxdoo extension manual.</a>
 */
