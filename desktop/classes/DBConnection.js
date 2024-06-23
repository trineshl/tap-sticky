import sqlite3 from 'sqlite3';
import constants from '../constants.js';
import path from 'path';
import isDev from 'electron-is-dev';

const sqlite3_verbose = sqlite3.verbose();

const LDBFilePath = isDev ? constants.dirname : process.resourcesPath;

const LDbPath = path.resolve(LDBFilePath, 'db/data.db');

// open the database
const DBConnection = new sqlite3_verbose.Database(LDbPath);

export default DBConnection;