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
const collectionName = 'patients';
/**
 * Retrieves all patients from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved patients.
 */
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDB();
        const patients = yield db.collection(collectionName).find().toArray();
        res.status(200).json(patients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * Retrieves a patient by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient is retrieved.
 */
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patiendId = new mongodb_1.ObjectId(id);
    try {
        const db = yield getDB();
        const patient = yield db.collection(collectionName).findOne({ _id: patiendId });
        res.status(200).json(patient);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * Creates a new patient.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient is created.
 */
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'birthDate',
        'address',
        'city'
    ];
    for (const field of requiredFields) {
        if (!Object.hasOwnProperty.call(req.body, field)) {
            res.status(400).json({
                error: `Missing '${field}' in request body`
            });
            return;
        }
    }
    try {
        const db = yield getDB();
        const newPatient = yield db.collection(collectionName).insertOne(req.body);
        if (newPatient.acknowledged === true) {
            // return the patient
            const patient = yield db.collection(collectionName).findOne({ _id: newPatient.insertedId });
            res.status(201).json(patient);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * Updates a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patiendId = new mongodb_1.ObjectId(id);
    const { body } = req;
    try {
        const db = yield getDB();
        const updatedPatient = yield db.collection(collectionName).findOneAndUpdate({ _id: patiendId }, { $set: body }, { returnOriginal: false });
        res.status(200).json(updatedPatient.value);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * Deletes a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the message 'done'.
 */
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patiendId = new mongodb_1.ObjectId(id);
    try {
        const db = yield getDB();
        yield db.collection(collectionName).deleteOne({ _id: patiendId });
        res.status(200).send('Patient deleted');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
function getDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return connect_1.default.getDb().db('latammed');
    });
}
exports.default = {
    createPatient,
    deletePatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    getDB
};
//# sourceMappingURL=patients.js.map