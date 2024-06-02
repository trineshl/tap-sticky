import express from 'express';
import cors from 'cors';
import Routes from './routes/Routes.js';
import constants from './constants.js';

function initServer() {

  const expressApp = express();
  expressApp.use(cors());
  expressApp.use(express.json());

  Routes(expressApp);

  expressApp.listen(constants.PORTs.HTTP, () =>
    console.log('Server running on Port: ' + constants.PORTs.HTTP));
}

export default initServer;