const {Storage} = require('@google-cloud/storage');

const {STORAGE_FILE_PATH, STORAGE_PROJECT_ID, STORAGE_NAME} = require('./env.config');

console.log(STORAGE_FILE_PATH, STORAGE_PROJECT_ID, STORAGE_NAME);

const gc = new Storage({
  keyFilename: STORAGE_FILE_PATH,
  projectId: STORAGE_PROJECT_ID
});

const bucket = gc.bucket(STORAGE_NAME);

module.exports = bucket;
