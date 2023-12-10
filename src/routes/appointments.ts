const router = require('express').Router()
const appointmentsController = require('../controllers/appointments')
const appointmentsValidate = require('../middleware/appointmentsValidator')

router.post('/', appointmentsValidate.appointmentval, appointmentsController.addAppointment) // POST /appointments/
router.get('/:id', appointmentsController.getAppointmentById) // GET /appointments/{appointmentsId}
router.get('/:patientId', appointmentsController.getAppointmentsByPatientId) // GET /appointments/{patientId}
router.get('/:doctorId', appointmentsController.getAppointmentsByDoctorId) // GET /appointments/{doctorId}
router.put('/:id', appointmentsController.updateAppointmentById) // PUT /appointments/{appointmentsId}
router.delete('/:id', appointmentsController.deleteAppointment) // DELETE /appointments/{appointmentsId}

module.exports = router
