"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_1 = __importDefault(require("../controllers/history"));
const router = (0, express_1.Router)();
// Rutas para el historial
router.post('/history', history_1.default.createNewinformation); // POST /history/
router.get('/:patientId', history_1.default.getHistory); // GET /history/patient/{patientId}
router.get('/:doctorId', history_1.default.getSingleHistory); // GET /history/doctor/{doctorId}
router.get('/:historyId', history_1.default.getSingleHistory); // GET /history/{historyId}
router.put('/:historyId', history_1.default.updateNewinformation); // PUT /history/{historyId}
router.delete('/:historyId', history_1.default.deleteNewinformation); // DELETE /history/{historyId}
exports.default = router;
//# sourceMappingURL=history.js.map