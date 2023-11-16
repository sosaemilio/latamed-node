const router = require('express').Router();
const patientsController = require('../controllers/patients');

router.post('/patient'); // POST /patient
router.put('/patient/{patientId}'); // PUT /patient/{patientId}
router.get('/patient/{patientId}/appointments'); // GET /patient/{patientId}/appointments
router.get('/patient/{patientId}/treatment'); // GET /patient/{patientId}/treatment
router.get('/patient/{patientId}'); // GET /patient/{patientId}
router.post('/patient/{patientId}'); // POST /patient/{patientId}
router.post('/patient/{patientId}/appointments'); // POST /patient/{patientId}/appointments
router.delete('/patient/{patientId}'); // DELETE /patient/{patientId}

module.exports = router;
