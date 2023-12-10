"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctors_1 = __importDefault(require("../controllers/doctors"));
const router = (0, express_1.Router)();
router.post('/', doctors_1.default.addDoctor); // POST /doctor
router.get('/', doctors_1.default.getDoctors); // GET /doctors
router.get('/:username', doctors_1.default.getDoctorByName); // GET /doctor/{username}
router.put('/:id', doctors_1.default.updateDoctorById); // PUT /doctor/{username}
router.delete('/:id', doctors_1.default.deleteDoctor); // DELETE /doctor/{username}
exports.default = router;
//# sourceMappingURL=doctors.js.map