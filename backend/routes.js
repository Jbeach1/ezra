const express = require('express');
const router = express.Router();

router.use('/organizations', require('./routes/organization'));
router.use('/locations', require('./routes/location'));
router.use('/groups', require('./routes/group'));
router.use('/members', require('./routes/member'));

module.exports = router;
