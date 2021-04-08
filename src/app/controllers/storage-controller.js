const service = require('../services/storage-service');

module.exports = {
  async addFile(req, res) {
    const body = {
      ...req.body,
      file_url: req.file_url
    }
    return await service.addFile(body)
        .then(resolve => res.status(resolve.status_code || 200).json(resolve.response))
        .catch(reject => res.status(reject.status_code || 400).json(reject.response));
  },

};
