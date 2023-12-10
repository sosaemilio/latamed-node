"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointments_1 = require("../controllers/appointments");
const appointmentsValidator_1 = require("../middleware/appointmentsValidator");
const router = (0, express_1.Router)();
router.post('/', appointmentsValidator_1.appointmentval, appointments_1.addAppointment); // POST /appointments/
router.get('/:id', appointments_1.getAppointmentById); // GET /appointments/{appointmentsId}
router.get('/:patientId', appointments_1.getAppointmentsByPatientId); // GET /appointments/{patientId}
router.get('/:doctorId', appointments_1.getAppointmentsByDoctorId); // GET /appointments/{doctorId}
router.put('/:id', appointments_1.updateAppointmentById); // PUT /appointments/{appointmentsId}
router.delete('/:id', appointments_1.deleteAppointment); // DELETE /appointments/{appointmentsId}
exports.default = router;
//# sourceMappingURL=appointments.js.map