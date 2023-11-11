const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const aboutController = require('../controllers/aboutController');

router.route('/').get(catchAsync(aboutController.index));

module.exports = router;
