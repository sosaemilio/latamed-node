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
const express = require('express');
const toget = express();
const mongodb = require('../db/connect.js');
const appointmentval = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const err = { errors: [] };
    let status = true;
    const timePattern = /^(0[7-9]|1[0-8]):[0-5][0]$/;
    const ObjectId = require('mongodb').ObjectId;
    const date = new Date(req.body.date);
    const dupDate = false;
    const time = req.body.time;
    const notes = req.body.notes;
    if (date == 'Invalid Date') {
        status = false;
        err.errors.push({ date: 'Please provide a valid format date: yyyy/mm/dd' });
    }
    if (time.match(timePattern)) {
    }
    else {
        status = false;
        err.errors.push({ time: 'Please provide a valid 24 hours format time: HH:MM | Between 07:00 and 18:50 hours | Every 10 minutes.' });
    }
    try {
        const doctorId = new ObjectId(req.body.doctorId);
        toget.get(yield mongodb
            .getDb()
            .db('latammed')
            .collection('doctors')
            .find({ _id: doctorId })
            .toArray()
            .then((lists) => {
            if (lists[0] == undefined) {
                status = false;
                err.errors.push({ doctorId: "Doctor doesn't exist, Please check the doctor ID." });
            }
        })
            .catch((er) => {
            status = false;
            err.errors.push({ doctorId: 'Sorry but there is an error accessing to the doctor list.' });
        }));
    }
    catch (e) {
        status = false;
        err.errors.push({ doctorId: 'A valid doctor ID is required.' });
    }
    try {
        const patientId = new ObjectId(req.body.patientId);
        toget.get(yield mongodb
            .getDb()
            .db('latammed')
            .collection('patients')
            .find({ _id: patientId })
            .toArray()
            .then((lists) => {
            if (lists[0] == undefined) {
                status = false;
                err.errors.push({ patientId: 'Patient doesn\'t exist, Please check the patient ID.' });
            }
        })
            .catch((e) => {
            status = false;
            err.errorspush({ patientId: 'Sorry but there is an error accessing to the patient list.' });
        }));
    }
    catch (e) {
        status = false;
        err.errors.push({ patientId: 'A valid patient ID is required.' });
    }
    if (notes == '') {
        status = false;
        err.errors.push({ notesId: 'Notes are required.' });
    }
    if (!status) {
        res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
    }
    else {
        next();
    }
});
module.exports = {
    appointmentval,
    toget
};
//# sourceMappingURL=appointmentsValidator.js.map