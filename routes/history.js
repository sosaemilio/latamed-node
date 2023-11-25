const router = require('express').Router();
const historyController = require('../controllers/history');

// Rutas para el historial
router.post('/history', historyController.createNewinformation); // POST /history/
router.get('/:patientId', historyController.getHistory); // GET /history/patient/{patientId}
router.get('/:doctorId', historyController.getSingleHistory); // GET /history/doctor/{doctorId}
router.get('/:historyId', historyController.getSingleHistory); // GET /history/{historyId}
router.put('/:historyId', historyController.updateNewinformation); // PUT /history/{historyId}
router.delete('/:historyId', historyController.deleteNewinformation); // DELETE /history/{historyId}

module.exports = router;
