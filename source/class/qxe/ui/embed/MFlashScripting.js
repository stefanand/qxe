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
 * A flash scripting wrapper mixin to control flash from javascript.
 *
 * Flash functions:
 *
 * Back()
 * CallFunction(request)
 * DisableLocalSecurity()
 * EnforceLocalSecurity()
 * FlashVersion()
 * Forward()
 * SetReturnValue(value)
 *
 * http://www.adobe.com/support/flash/publishexport/scriptingwithflash/index.html
 * 
 * Flash properties: 
 * 
 * flashFE.TGetProperty("/", n);
 * flashFE.TGetPropertyAsNumber("/", n);
 * flashFE.TSetProperty("/", n, value);
 * 
 * Property        Property number    Constant        Get  Set
 * -----------------------------------------------------------
 * X POSITION (_x)      0              X_POS           ÷    ÷
 * Y POSITION (_y)      1              Y_POS           ÷    ÷
 * X SCALE              2              X_SCALE         ÷    ÷
 * Y SCALE              3              Y_SCALE         ÷    ÷
 * CURRENTFRAME         4              CURRENT_FRAME   ÷
 * TOTALFRAMES          5              TOTAL_FRAMES    ÷
 * ALPHA                6              ALPHA           ÷    ÷
 * VISIBILITY           7              VISIBLE         ÷    ÷
 * WIDTH                8              WIDTH           ÷
 * HEIGHT               9              HEIGHT          ÷
 * ROTATION            10              ROTATE          ÷    ÷
 * TARGET              11              TARGET          ÷
 * FRAMESLOADED        12              FRAMES_LOADED   ÷
 * NAME                13              NAME            ÷    ÷
 * DROPTARGET          14              DROP_TARGET     ÷
 * URL(_url)           15              URL             ÷
 * 
 * The following table shows global properties:
 * 
 * Global Property  Property number    Constant       Get  Set
 * -----------------------------------------------------------
 * HIGHQUALITY         16              HIGH_QUALITY    ÷    ÷
 * FOCUSRECT           17              FOCUS_RECT      ÷    ÷
 * SOUNDBUFTIME        18              SOUND_BUF_TIME  ÷    ÷
 *
 * Converting a .pdf file to .swf
 * -----------------------------
 * Using swftools by:
 *
 * pdf2swf -T4 -o file.swf file.pdf
 *
 * we tried version 9 by -T9 instead of -T4 because of allow access public but then an "undefined error" JScript 
 * occurred in IE8.
 *
 * Conclusion: Use -T4 and there is no access violations either.
 */
qx.Mixin.define("qxe.ui.embed.MFlashScripting",
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
      Properties
    ---------------------------------------------------------------------------
    */

    /**
     * Get the x position of the flash object.
     *
     * @return {Number} x position
     */
    getXPos : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 0);
    },

    /**
     * Set the x position of the flash object.
     *
     * @param value {Number} x position
     */
    setXPos : function(value) {
      this.getFlashElement().TSetProperty("/", 0, value);
    },

    /**
     * Get the y position of the flash object.
     *
     * @return {Number} y position
     */
    getYPos : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 1);
    },

    /**
     * Set the y position of the flash object.
     *
     * @param value {Number} y position
     */
    setYPos : function(value) {
      this.getFlashElement().TSetProperty("/", 1, value);
    },

    /**
     * Get the x scale of the flash object.
     *
     * @return {Number} x scale
     */
    getXScale : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 2);
    },

    /**
     * Set the x scale of the flash object.
     *
     * @param value {Number} x scale
     */
    setXScale : function(value) {
      this.getFlashElement().TSetProperty("/", 2, value);

      // Needed to refresh/update
      this.gotoFrame(this.getCurrentFrame() - 1);
    },

    /**
     * Get the y scale of the flash object.
     *
     * @return {Number} y scale
     */
    getYScale : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 3);
    },

    /**
     * Set the y scale of the flash object.
     *
     * @param value {Number} y scale
     */
    setYScale : function(value) {
      this.getFlashElement().TSetProperty("/", 3, value);

      // Needed to refresh/update
      this.gotoFrame(this.getCurrentFrame() - 1);
    },

    /**
     * Get the current frame of the flash object.
     *
     * @return {Number} current frame
     */
    getCurrentFrame : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 4);
    },

    /**
     * Get the alpha value of the flash object.
     *
     * @return {Number} alpha value
     */
    getAlpha : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 6);
    },

    /**
     * Set the alpha value of the flash object.
     *
     * @param value {Number} alpha value
     */
    setAlpha : function(value) {
      this.getFlashElement().TSetProperty("/", 6, value);
    },

    /**
     * Get the visibility of the flash object.
     *
     * @return {Number} visibility
     *                  0 = hidden
     *                  1 = visible
     */
    getFlashVisibility : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 7);
    },

    /**
     * Set the visibility of the flash object.
     *
     * @param value {Number} visibility
     *                  0 = hidden
     *                  1 = visible
     */
    setFlashVisibility : function(value) {
      this.getFlashElement().TSetProperty("/", 7, value);
    },

    /**
     * Get the width of the flash object.
     *
     * @return {Number} width
     */
    getFlashWidth : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 8);
    },

    /**
     * Get the height of the flash object.
     *
     * @return {Number} height
     */
    getFlashHeight : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 9);
    },

    /**
     * Get the degrees of rotation of the flash object.
     *
     * @return {Number} degrees of rotation
     */
    getRotation : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 10);
    },

    /**
     * Set the degrees of rotation of the flash object.
     *
     * @param value {Number} degrees of rotation
     */
    setRotation : function(value) {
      this.getFlashElement().TSetProperty("/", 10, value);

      // Needed to refresh/update
      this.gotoFrame(this.getCurrentFrame() - 1);
    },

    /**
     * Get the target of the flash object.
     *
     * @return {String} target
     */
    getTarget : function() {
      return this.getFlashElement().TGetProperty("/", 11);
    },

    /**
     * Get the frames loaded of the flash object.
     *
     * @return {Number} frames loaded
     */
    getFramesLoaded : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 12);
    },

    /**
     * Get the name of the flash object.
     *
     * @return {String} name
     */
    getName : function() {
      return this.getFlashElement().TGetProperty("/", 13);
    },

    /**
     * Set the name of the flash object.
     *
     * @param value {String} name
     */
    setName : function(value) {
      this.getFlashElement().TSetProperty("/", 13, value);
    },

    /**
     * Get the drop target of the flash object.
     *
     * @return {String} drop target
     */
    getDropTarget : function() {
      return this.getFlashElement().TGetProperty("/", 14);
    },

    /**
     * Get the URL of the flash object.
     *
     * @return {String} URL
     */
    getURL : function() {
      return this.getFlashElement().TGetProperty("/", 15);
    },

    /**
     * Get the high quality of the flash object.
     *
     * @return {String} high quality
     */
    getHighQuality : function() {
      return this.getFlashElement().TGetProperty("/", 16);
    },

    /**
     * Set the high quality of the flash object.
     *
     * @param value {Number} high quality
     */
    setHighQuality : function(value) {
      this.getFlashElement().TSetProperty("/", 16, value);
    },

    /**
     * Display the focus rectangle of the flash object.
     *
     * @return {Number} 0 = false, 1 = true
     */
    getFocusRect : function() {
      return this.getFlashElement().TGetProperty("/", 17);
    },

    /**
     * Display the focus rectangle of the flash object.
     *
     * @param value {Number} 0 = false, 1 = true
     */
    setFocusRect : function(value) {
      this.getFlashElement().TSetProperty("/", 17, value);
    },

    /**
     * Get the sound buffer time of the flash object.
     *
     * @return {Number} sound buffer time
     */
    getSoundBufTime : function() {
      return this.getFlashElement().TGetProperty("/", 18);
    },

    /**
     * Set the sound buffer time of the flash object.
     *
     * @param value {Number} sound buffer time
     */
    setSoundBufTime : function(value) {
      this.getFlashElement().TSetProperty("/", 18, value);
    },


    /*
    ---------------------------------------------------------------------------
      Flash 2.0+ Methods
    ---------------------------------------------------------------------------
    */

    /**
     * Play flash object.
     */
    play : function() {
      this.getFlashElement().Play();
    },

    /**
     * Stop playing flash object.
     */
    stop : function() {
      this.getFlashElement().StopPlay();
    },

    /**
     * Is flash playing.
     *
     * @return {Boolean} true/false
     */
    isPlaying : function() {
      return this.getFlashElement().IsPlaying();
    },

    /**
     * Go to flash frame.
     *
     * can also use:
     * flashFE.TGotoFrame("/", num);
     *
     * @param num {Number} frame number
     */
    gotoFrame : function(num) {
      var loaded = this.getFramesLoaded();

      if(num > loaded)
      {
        return this.getFlashElement().GotoFrame(loaded);
      }

      return this.getFlashElement().GotoFrame(num);
    },

    /**
     * Get the total number of the flash object.
     *
     * var flashFE = this.getChildControl("flash").getFlashElement();
     *
     * In IE it has to be called like this:
     *
     * TotalFrames = flashFE.TotalFrames;
     *
     * in Firefox it has to be called like this:
     *
     * TotalFrames = flashFE.TotalFrames();
     *
     * http://www.macromedia.com/support/flash/ts/documents/activex_script.htm
     *
     * Note!
     * Instead we use the TGetProperty which is the same for any browser.
     *
     * @return {Number} total number frames
     */
    getTotalFrames : function() {
      return this.getFlashElement().TGetPropertyAsNumber("/", 5);
    },

    /**
     * Rewind flash object.
     */
    rewind : function() {
      this.getFlashElement().Rewind();
    },

    /**
     * Zooms in on a rectangular area of the movie. The units of
     * the coordinates are in twips (1440 units per inch). To
     * calculate a rectangle in Flash, set the ruler units to
     * Points and multiply the coordinates by 20 to get twips.
     * (There are 72 points per inch.)
     *
     * @param left {Number} left position
     * @param top {Number} top position
     * @param right {Number} right position
     * @param bottom {Number} bottom position
     */
    zoomRect : function(left, top, right, bottom) {
      this.getFlashElement().SetZoomRect(left, top, right, bottom);
    },

    /**
     * Zooms the view by a relative scale factor specified by percent.
     * Zoom(50) doubles the size of the objects in the view. Zoom(200)
     * reduces the size of objects in the view by one half. Zoom(0)
     * resets the view to 100%. You cannot specify a reduction in the
     * size of objects in the view when the current view is already 100%.
     *
     * @param percent {Number} percent
     *                         0 = reset zoom
     */
    zoom : function(percent) {
      this.getFlashElement().Zoom(percent);
    },

    /**
     * Pan flash object.
     *
     * @param horiz {Number} horizontal
     * @param vert {Number} vertical
     * @param mode {Number} pan mode
     *                      0 = pixels
     *                      1 = percent
     */
    pan : function(horiz, vert, mode) {
      this.getFlashElement().Pan(horiz, vert, mode);
    },

    /**
     * Returns the current loaded state from the Flash movie.
     *
     * @return {Integer} The loaded percent value.
     */
    getPercentLoaded : function()
    {
      var flashFE = this.getFlashElement();

      // First make sure the movie is defined and has received a non-zero object id.
      if(typeof(flashFE) != "undefined" && flashFE != null)
      {
        try {
          return flashFE.PercentLoaded();
        }
        catch(err)
        {
          // Not an accessible function yet.
          return 0;
        }
      }
      else {
        return 0;
      }
    },


    /*
    ---------------------------------------------------------------------------
      Flash 3.0+ Methods
    ---------------------------------------------------------------------------
    */

    // TGotoFrame(target, framenumber)

    /**
     * Go to flash label.
     *
     * @param label {String} label
     */
    goToLabel : function(label) {
      this.getFlashElement().TGotoLabel("/", label);
    },

    // TCurrentFrame(target)

    // String TCurrentLabel(target)

    // TPlay(target)

    // TStopPlay(target)

    /**
     * Load flash movie.
     *
     * @param layerNum {Number} layer number
     * @param url {String} flash url
     */
    loadMovie : function(layerNum, url) {
      return this.getFlashElement().LoadMovie(layerNum, url);
    },


    /*
    ---------------------------------------------------------------------------
      Flash 4.0+ Methods
    ---------------------------------------------------------------------------
    */

    /**
     * Get flash variable.
     *
     * @return {String} path
     */
    getVariable : function(path) {
      return this.getFlashElement().GetVariable(path);
    },

    /**
     * Set the flash variable.
     *
     * @param path {String} path
     * @param value {String} value
     */
    setVariable : function(path, value) {
      this.getFlashElement().setVariable(path, value);
    },

    /**
     * Call and run flash frame.
     *
     * @param frame {Number} frame
     */
    callFrame : function(frame) {
      this.getFlashElement().TCallFrame("/", frame);        
    },

    /**
     * Call and run flash label.
     *
     * @param label {String} label
     */
    callLabel : function(label) {
      this.getFlashElement().TCallLabel("/", label);        
    },

    /**
     * Get current flash label.
     *
     * TCurrentLabel("/") is an alternative to get the current label.
     *
     * @return {String} label
     */
    getCurrentLabel : function() {
      return this.getFlashElement().TCallLabel("/");
    },

    /**
     * Documented but not working. Probably just a hint about adding the 
     * functionality to the flash file:
     * http://forums.adobe.com/thread/431696
     *
     * Generated as the Flash movie is downloading.
     *
     * @param percent {Number} percent loaded
     */
//    onProgress : function(percent) {
//    },

    /**
     * Documented but not working. Probably just a hint about adding the 
     * functionality to the flash file:
     * http://forums.adobe.com/thread/431696
     *
     * Generated when the ready state of the control changes.
     *
     * @param state {Number} state
     *                       0 = Loading
     *                       1 = Uninitialized
     *                       2 = Loaded
     *                       3 = Interactive
     *                       4 = Complete
     */
//    onReadyStateChange : function(state) {
//    },

    /**
     * Generated when an FSCommand action is performed in the movie with a URL
     * and the URL starts with FSCommand.
     *
     * Use this to create a response to a frame or button action in the Flash movie.
     *
     * http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000561.html
     *
     * @param command {String} command
     * @param args {Array} arguments
     */
//    FSCommand : function(command, args) {
//      this.getFlashElement().fscommand(command, args);
//    },

    /**
     * Send message to flash.
     *
     * @param data {String} message
     */
    sendMessageToFlash : function(data)
    {
      this.setVariable('/:message', data);
    },

    /**
     * Get message from flash.
     */
    getMessageFromFlash : function()
    {
      return this.getVariable('/:message');
    }
  }
});

