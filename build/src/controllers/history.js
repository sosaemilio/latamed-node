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
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const getHistory = (req, res) => {
    mongodb
        .getDb()
        .db('latammed')
        .collection('medical_history')
        .find({ username: doctorUsername00 })
        .toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
const getSingleHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.id);
    const result = yield mongodb.getDb().db().collection('medical_history').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
});
const createNewinformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        history: req.body.history
    };
    const response = yield mongodb.getDb().db().collection('medical_history').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
});
const updateNewinformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        history: req.body.history
    };
    const response = yield mongodb
        .getDb()
        .db('latammed')
        .collection('doctors')
        .find({ username: getPatientById })
        .replaceOne({ _id: getPatientById }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
});
const deleteNewinformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new ObjectId(req.params.id);
    const response = yield mongodb.getDb()
        .db()
        .collection('')
        .remove({ _id: getPatientById }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
});
module.exports = {
    getHistory,
    getSingleHistory,
    createNewinformation,
    updateNewinformation,
    deleteNewinformation
};
//# sourceMappingURL=history.js.map