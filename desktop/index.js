import { app } from 'electron';
import initServer from './initServer.js';
import { createWindow } from './invokeWindow.js';

//Init servers
initServer();

//As soon as app ready, invoking the window
app.whenReady().then(async () => {
  await createWindow(true);
});