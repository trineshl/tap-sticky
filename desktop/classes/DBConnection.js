import sqlite3 from 'sqlite3';
import constants from '../constants.js';
import path from 'path';

const sqlite3_verbose = sqlite3.verbose();

const LDbPath = path.resolve(constants.dirname, 'db/data.db');

// open the database
const DBConnection = new sqlite3_verbose.Database(LDbPath);

export default DBConnection;