const constants = require('../constants');
const blockController = require('../controllers/blockController');
const express = require('express');
const router = express.Router();

router.post(constants.HTTP.CHECK_BLOCK_ROUTE, blockController.checkBlock);
router.post(constants.HTTP.ACCEPT_BLOCK_ROUTE, blockController.acceptBlock);
router.post(constants.HTTP.REFUSE_BLOCK_ROUTE, blockController.refuseBlock);

module.exports = router;