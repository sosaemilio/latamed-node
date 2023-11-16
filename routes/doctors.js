const router = require('express').Router()
const doctorsController = require('../controllers/doctors')

router.post('/doctor') // POST /doctor
router.post('/doctor/login') // GET /doctor/login
router.post('/doctor/logout') // GET /doctor/logout
router.get('/doctor/{username}') // GET /doctor/{username}
router.put('/doctor/{username}') // PUT /doctor/{username}
router.delete('/doctor/{username}') // DELETE /doctor/{username}

module.exports = router
