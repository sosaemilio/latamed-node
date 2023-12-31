const router = require('express').Router()
const patients = require('../controllers/patients')
const { getValidationRules, validateGet, deleteValidationRules, validateDelete, postValidationRules, validatePost } = require('../middleware/patientsValidator')

// router.get('/patient/{patientId}/appointments') // GET /patient/{patientId}/appointments || FROM APPOINTMENTS
// router.get('/patient/{patientId}/treatment') // GET /patient/{patientId}/treatment || FROM TREATMENT
// router.post('/patient/{patientId}/appointments') // POST /patient/{patientId}/appointments ||  FROM APPOINTMENTS

router.get('/', patients.getAllPatients)
router.get('/:id', getValidationRules(), validateGet, patients.getPatientById) // GET /patient/{patientId}
router.post('/', postValidationRules(), validatePost, patients.createPatient) // POST /patient
router.put('/:id', patients.updatePatient) // PUT /patient/{patientId}
router.delete('/:id', deleteValidationRules(), validateDelete, patients.deletePatient) // DELETE /patient/{patientId}

module.exports = router
