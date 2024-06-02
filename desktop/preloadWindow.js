const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {

  // ipcRenderer: ipcRenderer,
  onInit: (callback) => {

    return ipcRenderer.on('init', (event, p_intWindowId, p_objLastSetting, p_boolIsMainWindow) =>
      callback(p_intWindowId, p_objLastSetting, p_boolIsMainWindow));
  },

  onUpdateData: (callback) => {

    return ipcRenderer.on('onUpdateData', (event, p_intWindowId, p_objUpdatedNoteData) =>
      callback(p_intWindowId, p_objUpdatedNoteData));
  }
});