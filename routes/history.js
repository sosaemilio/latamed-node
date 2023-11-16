const router = require('express').Router()
const historyController = require('../controllers/history')

router.post('/history') // POST /history/
router.get('/history/{patientId}') // GET /history/{patientId}
router.get('/history/{doctorId}') // GET /history/{doctorId}
router.get('/history/{historyId}') // GET /history/{historyId}
router.put('/history/{historyId}') // PUT /history/{historyId}
router.delete('/history/{historyId}') // DELETE /history/{historyId}

module.exports = router
