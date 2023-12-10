"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
const mongodb_1 = require("mongodb");
const doctorUsernameValidator_1 = require("../middleware/doctorUsernameValidator");
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield connect_1.default.getDb().db('latammed').collection('doctors').find({});
        doctors.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const getDoctorByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // REMINDER: Needs to add a 404 error when it is not found
    const doctorUsername = req.params.username;
    const doctor = yield connect_1.default
        .getDb()
        .db('latammed')
        .collection('doctors')
        .find({ username: doctorUsername });
    doctor.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
});
const addDoctor = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.parameters['body'] = {
            in: 'body',
            '@schema': {
                "required": ["username"],
                "properties": {
                  "firstName": {
                    "type": "string",
                  },
                  "lastName": {
                    "type": "string",
                  },
                  "email": {
                    "type": "string",
                  },
                  "username": {
                    "type": "string",
                  }
                }
            }
        } */
        const newDoctor = req.body;
        if (newDoctor.username) {
            (0, doctorUsernameValidator_1.usernameExists)(newDoctor.username).then((result) => {
                console.log(result);
                if (result) {
                    res.status(500).send('User exist');
                }
            });
        }
        const result = yield connect_1.default
            .getDb()
            .db('latammed')
            .collection('doctors')
            .insertOne(newDoctor, (err) => {
            if (err)
                res.status(500).send(err);
        });
        if (result)
            res.status(201).json(result);
    });
};
const updateDoctorById = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* #swagger.parameters['body'] = {
            in: 'body',
            '@schema': {
                "required": ["username"],
                "properties": {
                  "firstName": {
                    "type": "string",
                  },
                  "lastName": {
                    "type": "string",
                  },
                  "email": {
                    "type": "string",
                  },
                  "username": {
                    "type": "string",
                  }
                }
            }
        } */
        const doctorId = new mongodb_1.ObjectId(req.params.id);
        const data = req.body;
        const result = yield connect_1.default
            .getDb()
            .db('latammed')
            .collection('doctors')
            .updateOne({ _id: doctorId }, { $set: data });
        if (result)
            res.status(204).json(result);
    });
};
const deleteDoctor = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const doctorId = new mongodb_1.ObjectId(req.params.id);
        const result = yield connect_1.default
            .getDb()
            .db('latammed')
            .collection('doctors')
            .deleteOne({ _id: doctorId });
        if (result)
            res.status(200).json(result);
    });
};
exports.default = {
    getDoctors,
    getDoctorByName,
    addDoctor,
    updateDoctorById,
    deleteDoctor
};
//# sourceMappingURL=doctors.js.map