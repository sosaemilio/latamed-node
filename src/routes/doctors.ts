import { Router } from 'express'
import doctorsController from '../controllers/doctors'

const router = Router()

router.post('/', doctorsController.addDoctor) // POST /doctor
router.get('/', doctorsController.getDoctors) // GET /doctors
router.get('/:username', doctorsController.getDoctorByName) // GET /doctor/{username}
router.put('/:id', doctorsController.updateDoctorById) // PUT /doctor/{username}
router.delete('/:id', doctorsController.deleteDoctor) // DELETE /doctor/{username}

export default router
