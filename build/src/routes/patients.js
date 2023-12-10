"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patients_1 = __importDefault(require("../controllers/patients"));
const patientsValidator_1 = require("../middleware/patientsValidator");
const router = (0, express_1.Router)();
// router.get('/patient/{patientId}/appointments') // GET /patient/{patientId}/appointments || FROM APPOINTMENTS
// router.get('/patient/{patientId}/treatment') // GET /patient/{patientId}/treatment || FROM TREATMENT
// router.post('/patient/{patientId}/appointments') // POST /patient/{patientId}/appointments ||  FROM APPOINTMENTS
router.get('/', patients_1.default.getAllPatients);
router.get('/:id', (0, patientsValidator_1.getValidationRules)(), patientsValidator_1.validateGet, patients_1.default.getPatientById); // GET /patient/{patientId}
router.post('/', (0, patientsValidator_1.postValidationRules)(), patientsValidator_1.validatePost, patients_1.default.createPatient); // POST /patient
router.put('/:id', patients_1.default.updatePatient); // PUT /patient/{patientId}
router.delete('/:id', (0, patientsValidator_1.deleteValidationRules)(), patientsValidator_1.validateDelete, patients_1.default.deletePatient); // DELETE /patient/{patientId}
exports.default = router;
//# sourceMappingURL=patients.js.map