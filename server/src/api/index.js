const express = require('express');
const router = express.Router();

router.use('/api/users', require('./users'));
router.use('/api/users/:id/stats', require('./stats'));
router.use('/api/user/:id', require('./user'));

module.exports = router;
