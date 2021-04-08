const {} = require('../../config/env.config');

const {
  default_language,
  buildSuccessResponse,
  buildErrorResponse,
  buildMessage,
} = require('../../utils');

const {SUCCESS} = require('../../utils/codes');

module.exports = {
  async addFile(body, options = defOptions) {
    return await new Promise(async (resolve, reject) => {
      try {
        // todo finish

        const response = buildSuccessResponse({
          body: {file_url: body.file_url},
          status_code: 201,
          message: buildMessage(SUCCESS, options.language),
        });

        return resolve(response);
      } catch (err) {
        const response = buildErrorResponse({
          log: err.message,
        });
        return reject(response);
      }
    });
  },
}

const defOptions = {language: default_language}
