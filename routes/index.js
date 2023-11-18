const router = require('express').Router();

router.use('/patients', require('./patients'));
router.use('/history', require('./history'));
router.use('/appointments', require('./appointments'));
router.use('/doctors', require('./doctors'));
router.use('/api-docs', require('./swagger'));

module.exports = router;
