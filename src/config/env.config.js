require('dotenv').config();

const path = require('path');
const fs = require('fs');

// DIR For temp files
const TEMP_DIR = path.join(__dirname, "../../temp");

// Creating folders if not exist
fs.existsSync(TEMP_DIR) || fs.mkdirSync(TEMP_DIR);

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 4000,
  SERVER_IP: process.env.SERVER_IP || '127.0.0.1',
  SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:4000',
  JWT_SECRET: process.env.JWT_SECRET || 'sec_123abc$S',
  JWT_EXP: process.env.JWT_EXP || '10m',

  TEMP_DIR: TEMP_DIR,
  STORAGE_FILE_PATH: process.env.STORAGE_FILE_PATH,
  STORAGE_PROJECT_ID: process.env.STORAGE_PROJECT_ID,
  STORAGE_NAME: process.env.STORAGE_NAME,

}
