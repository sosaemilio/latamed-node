const router = require('express').Router();
const appointmentsController = require('../controllers/appointments');

router.post('/appointments'); // POST /appointments/
router.get('/appointments/{patientId}'); // GET /appointments/{patientId}
router.get('/appointments/{doctorId}'); // GET /appointments/{doctorId}
router.get('/appointments/{appointmentsId}'); // GET /appointments/{appointmentsId}
router.put('/appointments/{appointmentsId}'); // PUT /appointments/{appointmentsId}
router.delete('/appointments/{appointmentsId}'); // DELETE /appointments/{appointmentsId}

module.exports = router;
