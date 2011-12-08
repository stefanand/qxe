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
 * 
 Flash functions:

  Back()
  CallFunction(request)
  DisableLocalSecurity()
  EnforceLocalSecurity()
  FlashVersion()
  Forward()
  SetReturnValue(value)

  http://www.adobe.com/support/flash/publishexport/scriptingwithflash/index.html
  
  flashFE.TGetProperty("/", n);
  flashFE.TSetProperty("/", n, value);
  
  Property        Property number    Constant        Get  Set
  -----------------------------------------------------------
  X POSITION (_x)      0              X_POS           ÷    ÷
  Y POSITION (_y)      1              Y_POS           ÷    ÷
  X SCALE              2              X_SCALE         ÷    ÷
  Y SCALE              3              Y_SCALE         ÷    ÷
  CURRENTFRAME         4              CURRENT_FRAME   ÷
  TOTALFRAMES          5              TOTAL_FRAMES    ÷
  ALPHA                6              ALPHA           ÷    ÷
  VISIBILITY           7              VISIBLE         ÷    ÷
  WIDTH                8              WIDTH           ÷
  HEIGHT               9              HEIGHT          ÷
  ROTATION            10              ROTATE          ÷    ÷
  TARGET              11              TARGET          ÷
  FRAMESLOADED        12              FRAMES_LOADED   ÷
  NAME                13              NAME            ÷    ÷
  DROPTARGET          14              DROP_TARGET     ÷
  URL(_url)           15              URL             ÷
  
  The following table shows global properties:
  
  Global Property  Property number    Constant       Get  Set
  -----------------------------------------------------------
  HIGHQUALITY         16              HIGH_QUALITY    ÷    ÷
  FOCUSRECT           17              FOCUS_RECT      ÷    ÷
  SOUNDBUFTIME        18              SOUND_BUF_TIME  ÷    ÷

  Converting a .pdf file to .swf
  -----------------------------
  Using swftools by:
 
  pdf2swf -T4 -o file.swf file.pdf
 
  we tried version 9 by -T9 instead of -T4 because of allow access public but then an "undefined error" JScript 
  occurred in IE8.
 
  Conclusion: Use -T4 and there is no access violations either.
 */
qx.Mixin.define("qxe.ui.embed.MFlashScripting",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    FLASH_ELEMENT : null,


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
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 0);
    },

    /**
     * Set the x position of the flash object.
     *
     * @param value {Number} x position
     */
    setXPos : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 0, value);
    },

    /**
     * Get the y position of the flash object.
     *
     * @return {Number} y position
     */
    getYPos : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 1);
    },

    /**
     * Set the y position of the flash object.
     *
     * @param value {Number} y position
     */
    setYPos : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 1, value);
    },

    /**
     * Get the x scale of the flash object.
     *
     * @return {Number} x scale
     */
    getXScale : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 2);
    },

    /**
     * Set the x scale of the flash object.
     *
     * @param value {Number} x scale
     */
    setXScale : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 2, value);
    },

    /**
     * Get the y scale of the flash object.
     *
     * @return {Number} y scale
     */
    getYScale : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 3);
    },

    /**
     * Set the y scale of the flash object.
     *
     * @param value {Number} y scale
     */
    setYScale : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 3, value);
    },

    /**
     * Get the current frame of the flash object.
     *
     * @return {Number} current frame
     */
    getCurrentFrame : function() {
      return (this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 4) - 1);
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
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 5);
    },

    /**
     * Get the alpha value of the flash object.
     *
     * @return {Number} alpha value
     */
    getAlpha : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 6);
    },

    /**
     * Set the alpha value of the flash object.
     *
     * @param value {Number} alpha value
     */
    setAlpha : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 6, value);
    },

    /**
     * Get the visibility of the flash object.
     *
     * @return {Number} visibility
     *                  0 = hidden
     *                  1 = visible
     */
    getVisibility : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 7);
    },

    /**
     * Set the visibility of the flash object.
     *
     * @param value {Number} visibility
     *                  0 = hidden
     *                  1 = visible
     */
    setVisibility : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 7, value);
    },

    /**
     * Get the width of the flash object.
     *
     * @return {Number} width
     */
    getWidth : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 8);
    },

    /**
     * Get the height of the flash object.
     *
     * @return {Number} height
     */
    getHeight : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 9);
    },

    /**
     * Get the degrees of rotation of the flash object.
     *
     * @return {Number} degrees of rotation
     */
    getRotation : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 10);
    },

    /**
     * Set the degrees of rotation of the flash object.
     *
     * @param value {Number} degrees of rotation
     */
    setRotation : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 10, value);
    },

    /**
     * Get the target of the flash object.
     *
     * @return {String} target
     */
    getTarget : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 11);
    },

    /**
     * Get the frames loaded of the flash object.
     *
     * @return {Number} frames loaded
     */
    getFramesLoaded : function() {
      return this.FLASH_ELEMENT.TGetPropertyAsNumber("/", 12);
    },

    /**
     * Get the name of the flash object.
     *
     * @return {String} name
     */
    getName : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 13);
    },

    /**
     * Set the name of the flash object.
     *
     * @param value {String} name
     */
    setName : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 13, value);
    },

    /**
     * Get the drop target of the flash object.
     *
     * @return {String} drop target
     */
    getDropTarget : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 14);
    },

    /**
     * Get the URL of the flash object.
     *
     * @return {String} URL
     */
    getURL : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 15);
    },

    /**
     * Get the high quality of the flash object.
     *
     * @return {String} high quality
     */
    getHighQuality : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 16);
    },

    /**
     * Set the high quality of the flash object.
     *
     * @param value {Number} high quality
     */
    setHighQuality : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 16, value);
    },

    /**
     * Display the focus rectangle of the flash object.
     *
     * @return {Number} 0 = false, 1 = true
     */
    getFocusRect : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 17);
    },

    /**
     * Display the focus rectangle of the flash object.
     *
     * @param value {Number} 0 = false, 1 = true
     */
    setFocusRect : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 17, value);
    },

    /**
     * Get the sound buffer time of the flash object.
     *
     * @return {Number} sound buffer time
     */
    getSoundBufTime : function() {
      return this.FLASH_ELEMENT.TGetProperty("/", 18);
    },

    /**
     * Set the sound buffer time of the flash object.
     *
     * @param value {Number} sound buffer time
     */
    setSoundBufTime : function(value) {
      this.FLASH_ELEMENT.TSetProperty("/", 18, value);
    },

    /*
    ---------------------------------------------------------------------------
      Functions
    ---------------------------------------------------------------------------
    */

    getVariable : function(path) {
      return this.FLASH_ELEMENT.GetVariable(path);
    },

    gotoFrame : function(num) {
      var loaded = this.getFramesLoaded();

      if(num > loaded)
      {
        return this.FLASH_ELEMENT.GotoFrame(loaded);
      }

      return this.FLASH_ELEMENT.GotoFrame(num);
    },

    isPlaying : function() {
      return this.FLASH_ELEMENT.IsPlaying();
    },

    loadMovie : function(layerNum, url) {
      return this.FLASH_ELEMENT.loadMovie(layerNum, url);
    },

    panPixels : function(hPx, vPx) {
      this.FLASH_ELEMENT.Pan(hPx, vPx, 0);
    },

    panPercent : function(hP, vP) {
      this.FLASH_ELEMENT.Pan(hP, vP, 1);
    },

    getPercentLoaded : function() {
      return this.FLASH_ELEMENT.PercentLoaded();
    },

    play : function() {
      this.FLASH_ELEMENT.Play();
    },

    rewind : function() {
      this.FLASH_ELEMENT.Rewind();
    },

    setVariable : function(path, value) {
      this.FLASH_ELEMENT.setVariable(path, value);
    },

//Zooms in on a rectangular area of the movie. The units of the coordinates are in twips (1440 units per inch). To calculate a rectangle in Flash, set the ruler units to Points and multiply the coordinates by 20 to get twips. (There are 72 points per inch.) The argument type for all arguments is integer. 
    zoomRect : function(left, top, right, bottom) {
      this.FLASH_ELEMENT.SetZoomRect(left, top, right, bottom);
    },

    stop : function() {
      this.FLASH_ELEMENT.StopPlay();
    },

//Zooms the view by a relative scale factor specified by percent. Zoom(50) doubles the size of the objects in the view. Zoom(200) reduces the size of objects in the view by one half. Zoom(0) resets the view to 100%. You cannot specify a reduction in the size of objects in the view when the current view is already 100%. The argument type is integer. 
    zoom : function(percent) {
      this.FLASH_ELEMENT.Zoom(percent);
    },

    zoomReset : function() {
      this.FLASH_ELEMENT.Zoom(0);
    },

    callFrame : function(frame) {
      this.FLASH_ELEMENT.TCallFrame("/", frame);        
    },

    callLabel : function(label) {
      this.FLASH_ELEMENT.TCallLabel("/", label);        
    },

    // TCurrentLabel("/")
    currentLabel : function() {
      return this.FLASH_ELEMENT.TCallLabel("/");
    },

    goToFrame : function(num) {
      this.FLASH_ELEMENT.TGotoFrame("/", num);
    },

    goToLabel : function(label) {
      this.FLASH_ELEMENT.TGotoLabel("/", label);
    }

    /**
     * Generated as the Flash movie is downloading.
     *
     * @param percent {Number} percent loaded
     */
//    OnProgress : function(percent) {
//    },

    /**
     * Generated when the ready state of the control changes.
     *
     * @param state {Number} state
     *                       0 = Loading
     *                       1 = Uninitialized
     *                       2 = Loaded
     *                       3 = Interactive
     *                       4 = Complete
     */
//    OnReadyStateChange : function(state) {
//    },

    /**
     * Generated when an FSCommand action is performed in the movie with a URL
     * and the URL starts with FSCommand.
     *
     * Use this to create a response to a frame or button action in the Flash movie.
     *
     * @param command {String} command
     * @param args {Array} arguments
     */
//    FSCommand : function(command, args) {
//    }        
  }
});

