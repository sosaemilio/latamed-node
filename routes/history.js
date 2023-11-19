const router = require('express').Router();
const historyController = require('../controllers/history');

// Rutas para el historial
router.post('/history', historyController.createNewinformation); // POST /history/
router.get('/history/patient/:patientId', historyController.getHistory); // GET /history/patient/{patientId}
router.get('/history/doctor/:doctorId', historyController.getSingleHistory); // GET /history/doctor/{doctorId}
router.get('/history/:historyId', historyController.getSingleHistory); // GET /history/{historyId}
router.put('/history/:historyId', historyController.updateNewinformation); // PUT /history/{historyId}
router.delete('/history/:historyId', historyController.deleteNewinformation); // DELETE /history/{historyId}

module.exports = router;
