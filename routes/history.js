const express = require('express');
const historyController = require('../controllers/history');
const { historyAuthenticated } = require('../middleware/historyValidator');
const router = express.Router();

// Rutas protegidas con autenticación
router.post('/history', historyAuthenticated, historyController.createNewinformation); // POST /history/
router.get('/:patientId', historyAuthenticated, historyController.getHistory); // GET /history/patient/{patientId}
router.get('/:doctorId', historyAuthenticated, historyController.getSingleHistory); // GET /history/doctor/{doctorId}
router.get('/:historyId', historyAuthenticated, historyController.getSingleHistory); // GET /history/{historyId}
router.put('/:historyId', historyAuthenticated, historyController.updateNewinformation); // PUT /history/{historyId}
router.delete('/:historyId', historyAuthenticated, historyController.deleteNewinformation); // DELETE /history/{historyId}

module.exports = router;