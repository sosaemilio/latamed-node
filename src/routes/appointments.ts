import { Router } from 'express'
import { addAppointment, getAppointmentById, getAppointmentsByPatientId, getAppointmentsByDoctorId, updateAppointmentById, deleteAppointment } from '../controllers/appointments'
import { appointmentval } from '../middleware/appointmentsValidator'

const router = Router()

router.post('/', appointmentval, addAppointment) // POST /appointments/
router.get('/:id', getAppointmentById) // GET /appointments/{appointmentsId}
router.get('/:patientId', getAppointmentsByPatientId) // GET /appointments/{patientId}
router.get('/:doctorId', getAppointmentsByDoctorId) // GET /appointments/{doctorId}
router.put('/:id', updateAppointmentById) // PUT /appointments/{appointmentsId}
router.delete('/:id', deleteAppointment) // DELETE /appointments/{appointmentsId}

export default router
