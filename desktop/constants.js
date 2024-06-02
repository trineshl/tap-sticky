import { fileURLToPath } from 'url';
import path from 'path';

//The __dirname variable is typically available in Node.js, 
//but it might not be available in certain contexts within Electron. 
//When using Electron with modules and newer versions of Node.js, 
//you might need to define __dirname manually or use an alternative approach.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const constants = {
  USER_CACHE_FOLDER: 'cache',
  WINDOW_STATE_FILE_NAME: 'window-state.json',

  PORTs: {
    HTTP: 5000
  },

  dirname: __dirname
};

export default constants;