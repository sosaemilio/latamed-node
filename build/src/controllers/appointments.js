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
const ObjectId = require('mongodb').ObjectId;
const mongoappointment = require('../db/connect.js');
const addAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = {
        date: req.body.date,
        time: req.body.time,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        notes: req.body.notes
    };
    const result1 = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .insertOne(newAppointment);
    if (result1.acknowledged) {
        res.status(201).json(result1);
    }
    else {
        res.status(500).json(result1.error || 'Appointment scheduling error.' + result1.acknowledged);
    }
});
const getAppointmentsByPatientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = { patientId: req.body.patientId };
    const appPatient = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .find({ patientId });
    appPatient
        .toArray()
        .then((lists) => {
        if (lists[0] == undefined) {
            res.status(400).json({ message: "This patient hasn't appointments" });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    })
        .catch((err) => {
        res.status(400).json({ message: err });
    });
});
const getAppointmentsByDoctorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.doctorId;
    const appDoctor = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .find({ doctorId });
    appDoctor
        .toArray()
        .then((lists) => {
        if (lists[0] == undefined) {
            res.status(400).json({ message: "This doctor hasn't appointments" });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    })
        .catch((err) => {
        res.status(400).json({ message: err });
    });
});
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = new ObjectId(req.params.id);
    const appById = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .find({ _id: appointmentId });
    appById
        .toArray()
        .then((lists) => {
        if (lists[0] == undefined) {
            res.status(400).json({ message: `The Appointment ${appointmentId} doesn't exist.` });
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        }
    })
        .catch((er) => {
        res.status(400).json({ message: er });
    });
});
const updateAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = new ObjectId(req.params.id);
    const updateAppointment = {
        date: req.body.date,
        time: req.body.time,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        notes: req.body.notes
    };
    const result2 = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .replaceOne({ _id: appointmentId }, updateAppointment);
    if (result2.modifiedCount > 0) {
        res.status(200).json('Info replaced.');
    }
    else {
        res.status(500).json(result2.error || 'Error updating the appointment info.');
    }
});
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = new ObjectId(req.params.id);
    const result3 = yield mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .deleteOne({ _id: appointmentId }, true);
    if (result3.deletedCount > 0) {
        res.status(200).json(appointmentId + ' was deleted.');
    }
    else {
        res.status(500).json(result3.error || 'Error deleting the appointment ' + appointmentId);
    }
});
const getAppointments = (req, res) => {
    mongoappointment
        .getDb()
        .db('latammed')
        .collection('appointments')
        .find()
        .toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
module.exports = {
    addAppointment,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointment
};
//# sourceMappingURL=appointments.js.map