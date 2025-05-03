import { app, BrowserWindow, screen } from 'electron';
import fs from 'fs';
import path from 'path';
import constants from './constants.js';
import { getNoteById, updateNoteById } from './classes/Notes.js';
import isDev from 'electron-is-dev';

const LResourcePath = isDev ? constants.dirname : process.resourcesPath;

//getting the last saved or for saving the last setting cached file path.
const FWindowConfigPath = path.join(LResourcePath,
  `${constants.USER_CACHE_FOLDER}/${constants.WINDOW_STATE_FILE_NAME}`);

//this will hold all the opened windows reference by key, where key is unique id..
export const OpenedWindowRefs = {};

const holdReferenceWindow = (p_objWindow, p_intWindowId, p_boolIsMainWindow) => {

  let LWindowId = p_intWindowId;

  if (!LWindowId || p_boolIsMainWindow) {
    //Incrementing the window key id, so that it will be unique
    LWindowId = 'mainWindow';
  }

  if (LWindowId in OpenedWindowRefs) {

    //close the existing window 
    const LWindow = OpenedWindowRefs[LWindowId];

    if (LWindow && LWindow.isDestroyed() === false)
      LWindow.close();

    delete OpenedWindowRefs[LWindowId];
  }
  else {
    console.warn("Existing window not found for windowId: " + LWindowId);
  }

  //Holding the window pointer at new location
  OpenedWindowRefs[LWindowId] = p_objWindow;

  //appending the window key in window object as well..
  p_objWindow.customWindowKey = LWindowId;

  return LWindowId;
};

// const removeWindowReference = (p_objWindow) => {

//   const LKey = p_objWindow.customWindowKey;
//   if (!LKey) {
//     return;
//   }

//   //remove the window reference from our local cached, as its destroyed now..
//   delete OpenedWindowRefs[LKey];
// };

/**
 * @method getDefaultWindowPositionAndSize
 * This method will returns the default window size and position.
 * The default window position is bottom-right. 
 * 
 * @returns {Object} - default window size and position
 */
const getDefaultWindowPositionAndSize = (p_boolIsMainWindow) => {

  const LWindowWidth = 320; // Set your desired window width
  const LWindowHeight = 320;//; // Set your desired window height

  if (p_boolIsMainWindow) {
    return {
      width: 400,
      height: 600
    };
  }

  // Get the primary display's work area size
  const LPrimaryDisplay = screen.getPrimaryDisplay();
  const { width: LWidth, height: LHeight } = LPrimaryDisplay.workAreaSize;

  // Calculate the position for bottom-right corner
  const x = LWidth - LWindowWidth;
  const y = LHeight - LWindowHeight;

  //returning the bottom-right corner.
  return {
    width: LWindowWidth,
    height: LWindowHeight,
    x: x,
    y: y,
  };
};

/**
 * @method getLastSetting
 * This method will loads the last setting object if any and return, 
 * if last setting object not exists then returns the default config.
 *  
 * @returns {Object}
 */
const getLastSetting = async (p_boolIsMainWindow, p_intWindowId) => {

  //gets the default position and size of window.
  const LDefaultPositionAndSize = getDefaultWindowPositionAndSize(p_boolIsMainWindow);

  if (!p_boolIsMainWindow) {
    //here means, this is stick note, so last setting is at db level..

    if (!p_intWindowId || p_intWindowId <= 0) {
      return LDefaultPositionAndSize;
    }

    try {

      //getting the note's window config from DB level..
      const LNote = await getNoteById(p_intWindowId) || {},
        LConfig = LNote.window_config || '';

      return JSON.parse(LConfig);

    } catch (error) {
      return LDefaultPositionAndSize;
    }
  }

  // Load saved window state if available
  if (!fs.existsSync(FWindowConfigPath)) {
    return LDefaultPositionAndSize;
  }

  try {

    //read file
    const LFileData = fs.readFileSync(FWindowConfigPath, 'utf-8');

    //here might be an exception if file contains not valid data..
    const LSavedWindowState = JSON.parse(LFileData);

    return LSavedWindowState;
  }
  catch (p_error) {
    //here means, the file not contains the valid data..
    return LDefaultPositionAndSize;
  }
};

/**
 * @method saveLastSettings
 * This method will save the last setting object in local file.
 */
const saveLastSettings = async (p_windowRef, p_intWindowId, p_boolIsMainWindow) => {

  //this will returns all the main UI configs - like position, size, etc.
  const LBounds = p_windowRef.getBounds(),

    //Check if the window is always on top
    LIsAlwaysOnTop = p_windowRef.isAlwaysOnTop(),

    LLastSetting = { ...LBounds, alwaysOnTop: LIsAlwaysOnTop },

    LRawData = JSON.stringify(LLastSetting);

  if (p_boolIsMainWindow || p_intWindowId <= 0) {

    //write the file
    fs.writeFileSync(FWindowConfigPath, LRawData, {
      encoding: "utf8",
    });
    return;
  }

  //here means, this is the note window..
  await updateNoteById(p_intWindowId, {
    window_config: LRawData
  });
};

/**
 * @method createWindow
 * This method will create the window and load the client data.
 */
export const createWindow = async (p_boolIsMainWindow, p_intWindowId) => {

  p_boolIsMainWindow = p_boolIsMainWindow === true;

  //getting the last setting...
  const LLastSetting = await getLastSetting(p_boolIsMainWindow, p_intWindowId);

  //Create window reference..
  const LWindow = new BrowserWindow({
    ...LLastSetting,

    icon: constants.dirname + '/img/icon.png',
    frame: false, // Hide the title bar
    webPreferences: {
      preload: path.join(constants.dirname, 'preloadWindow.js')
    }
  });

  //loads the entry point on client.
  // LWindow.loadFile('client/index.html');
  LWindow.loadURL('http://localhost:5000/');

  // Open the DevTools.
  // LWindow.webContents.openDevTools();

  const LKey = holdReferenceWindow(LWindow, p_intWindowId, p_boolIsMainWindow);

  //on window close, getting the
  LWindow.on('close', async () => {

    //on each window close, save its setting
    await saveLastSettings(LWindow, p_intWindowId, p_boolIsMainWindow);

    //remove the active window reference from our Global variable.
    // removeWindowReference(LWindow);
  });

  //Inform web about the window Id.
  LWindow.webContents.once('did-finish-load', () => {
    LWindow.webContents.send('init', LKey, LLastSetting, p_boolIsMainWindow); // Send the unique ID to the renderer
  });

  return LWindow;
};

//when all windows are closed, quitting the application.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});