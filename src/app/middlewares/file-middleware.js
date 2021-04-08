const formidable = require('formidable');
const fs = require('fs');

const {TEMP_DIR} = require('../../config/env.config');
const {buildErrorResponse, buildMessage} = require('../../utils');
const {FIL_PRO, FIL_UPL} = require('../../utils/codes');

const bucket = require('../../config/gcloud.config');

module.exports = {
  async process(req, res, next) {
    try {
      const form = await formidable.IncomingForm();

      form.keepExtensions = true;
      form.uploadDir = TEMP_DIR;

      await form.parse(req, async (err, fields, files) => {
        if (err)
          return res.status(400).json(buildErrorResponse({
            log: err.message,
            message: buildMessage(FIL_PRO)
          }));

        const file = Object.entries(files)[0];
        if (!file)
          return res.status(400).json(buildErrorResponse({
            log: 'file is undefined or null.',
            message: FIL_PRO
          }));

        req.file_path = file[1]['path'];

        next();
      });
    } catch (err) {
      return res.status(400).json(buildErrorResponse({
        log: err.message,
        message: FIL_PRO
      }));
    }
  },

  async upload(req, res, next) {
    try {
      await bucket.upload(req.file_path)
          .then(response => {
            req.file_url = getPublicUrl(response[0].metadata.bucket, response[0].metadata.name);

            next();
          })
    } catch (err) {
      deleteLocalTemp(req.file_path);

      return res.status(400).json(buildErrorResponse({
        log: err.message,
        message: FIL_UPL
      }));
    }
  },

  async deleteTempFile(req, res, next) {
    deleteLocalTemp(req.file_path);

    next();
  }
}

const getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

const deleteLocalTemp = (temp_path) => {
  fs.unlinkSync(temp_path);

  console.log('Deleted temp file. path: ' + temp_path);
}