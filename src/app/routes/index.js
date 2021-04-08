const router = require('express').Router();
const storageRouter = require('./storage-router');

router.use('/storage', storageRouter);

module.exports = router;
