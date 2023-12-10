"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_openid_connect_1 = require("express-openid-connect");
const patients_1 = __importDefault(require("./patients"));
const history_1 = __importDefault(require("./history"));
const appointments_1 = __importDefault(require("./appointments"));
const doctors_1 = __importDefault(require("./doctors"));
const swagger_1 = __importDefault(require("./swagger"));
const router = (0, express_1.Router)();
router.use('/patients', (0, express_openid_connect_1.requiresAuth)(), patients_1.default);
router.use('/history', (0, express_openid_connect_1.requiresAuth)(), history_1.default);
router.use('/appointments', (0, express_openid_connect_1.requiresAuth)(), appointments_1.default);
router.use('/doctors', (0, express_openid_connect_1.requiresAuth)(), doctors_1.default);
router.use('/api-docs', swagger_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map