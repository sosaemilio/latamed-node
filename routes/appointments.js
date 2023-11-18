const router = require('express').Router()
const appointmentsController = require('../controllers/appointments')

router.post('/', appointmentsController.addAppointment) // POST /appointments/
router.get('/:patientId', appointmentsController.getAppointmentsByPatientId) // GET /appointments/{patientId}
router.get('/:doctorId', appointmentsController.getAppointmentsByDoctorId) // GET /appointments/{doctorId}
router.get('/:id', appointmentsController.getAppointmentById) // GET /appointments/{appointmentsId}
router.put('/:id', appointmentsController.updateAppointmentById) // PUT /appointments/{appointmentsId}
router.delete('/:id', appointmentsController.deleteAppointment) // DELETE /appointments/{appointmentsId}

module.exports = router
