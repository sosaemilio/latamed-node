import { ObjectId } from 'mongodb'
import mongoappointment from '../db/connect'
import { type Request, type Response } from 'express'

export const addAppointment = async (req: Request, res: Response): Promise<void> => {
  const newAppointment = {
    date: req.body.date,
    time: req.body.time,
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    notes: req.body.notes
  }
  const result1 = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .insertOne(newAppointment)
  if (result1.acknowledged) {
    res.status(201).json(result1)
  } else {
    res.status(500).json(result1.error || 'Appointment scheduling error.' + result1.acknowledged)
  }
}

export const getAppointmentsByPatientId = async (req: Request, res: Response): Promise<void> => {
  const patientId = { patientId: req.body.patientId }
  const appPatient = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .find({ patientId })
  appPatient
    .toArray()
    .then((lists: any[]) => {
      if (lists[0] === undefined) {
        res.status(400).json({ message: "This patient hasn't appointments" })
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists[0])
      }
    })
    .catch((err: Error) => {
      res.status(400).json({ message: err })
    })
}

export const getAppointmentsByDoctorId = async (req: Request, res: Response): Promise<void> => {
  const doctorId = req.params.doctorId
  const appDoctor = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .find({ doctorId })
  appDoctor
    .toArray()
    .then((lists: any[]) => {
      if (lists[0] === undefined) {
        res.status(400).json({ message: "This doctor hasn't appointments" })
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists[0])
      }
    })
    .catch((err: Error) => {
      res.status(400).json({ message: err })
    })
}

export const getAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const appointmentId = new ObjectId(req.params.id)
  const appById = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .find({ _id: appointmentId })
  appById
    .toArray()
    .then((lists: any[]) => {
      if (lists[0] === undefined) {
        res.status(400).json({ message: `The Appointment ${appointmentId} doesn't exist.` })
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(lists[0])
      }
    })
    .catch((er: Error) => {
      res.status(400).json({ message: er })
    })
}

export const updateAppointmentById = async (req: Request, res: Response): Promise<void> => {
  const appointmentId = new ObjectId(req.params.id)

  const updateAppointment = {
    date: req.body.date,
    time: req.body.time,
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    notes: req.body.notes
  }
  const result2 = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .replaceOne({ _id: appointmentId }, updateAppointment)
  if (result2.modifiedCount > 0) {
    res.status(200).json('Info replaced.')
  } else {
    res.status(500).json(result2.error || 'Error updating the appointment info.')
  }
}

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  const appointmentId = new ObjectId(req.params.id)

  const result3 = await mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .deleteOne({ _id: appointmentId }, true)
  if (result3.deletedCount > 0) {
    res.status(200).json(appointmentId + ' was deleted.')
  } else {
    res.status(500).json(result3.error || 'Error deleting the appointment ' + appointmentId)
  }
}

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  mongoappointment
    .getDb()
    .db('latammed')
    .collection('appointments')
    .find()
    .toArray((err: Error, lists: any[]) => {
      if (err) {
        res.status(400).json({ message: err })
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(lists)
    })
}

module.exports = {
  addAppointment,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointment,
  getAppointments
}
