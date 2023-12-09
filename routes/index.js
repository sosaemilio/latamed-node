const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');


router.use('/api-docs', require('./swagger'));
router.use('/patients', requiresAuth(), require('./patients'));
router.use('/history', requiresAuth(), require('./history'));
router.use('/appointments', requiresAuth(), require('./appointments'));
router.use('/doctors', requiresAuth(), require('./doctors'));



module.exports = router;
