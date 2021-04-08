const router = require('express').Router();
const controller = require('../controllers/storage-controller');
const fileMiddleware = require('../middlewares/file-middleware');

router.post('', fileMiddleware.process, fileMiddleware.upload, fileMiddleware.deleteTempFile, controller.addFile);

module.exports = router;
