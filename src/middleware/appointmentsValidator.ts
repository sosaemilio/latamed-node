import express, { type Request, type Response, type NextFunction } from 'express'
import mongodb from '../db/connect.js'
import { ObjectId } from 'mongodb'

const toget = express()

export const appointmentval = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const err = { errors: [] }
  let status = true
  const timePattern = /^(0[7-9]|1[0-8]):[0-5][0]$/

  const date = new Date(req.body.date)
  const time = req.body.time
  const notes = req.body.notes

  if (date.toString() === 'Invalid Date') {
    status = false
    err.errors.push({ date: 'Please provide a valid format date: yyyy/mm/dd' })
  }

  if (time.match(timePattern)) {

  } else {
    status = false
    err.errors.push({ time: 'Please provide a valid 24 hours format time: HH:MM | Between 07:00 and 18:50 hours | Every 10 minutes.' })
  }

  try {
    const doctorId = new ObjectId(req.body.doctorId)
    toget.get(await mongodb
      .getDb()
      .db('latammed')
      .collection('doctors')
      .find({ _id: doctorId })
      .toArray()
      .then((lists) => {
        if (lists[0] == undefined) {
          status = false
          err.errors.push({ doctorId: "Doctor doesn't exist, Please check the doctor ID." })
        }
      })
      .catch((er) => {
        status = false
        err.errors.push({ doctorId: 'Sorry but there is an error accessing to the doctor list.' })
      })
    )
  } catch (e) {
    status = false
    err.errors.push({ doctorId: 'A valid doctor ID is required.' })
  }

  try {
    const patientId = new ObjectId(req.body.patientId)
    toget.get(await mongodb
      .getDb()
      .db('latammed')
      .collection('patients')
      .find({ _id: patientId })
      .toArray()
      .then((lists) => {
        if (lists[0] == undefined) {
          status = false
          err.errors.push({ patientId: 'Patient doesn\'t exist, Please check the patient ID.' })
        }
      })
      .catch((e) => {
        status = false
        err.errorspush({ patientId: 'Sorry but there is an error accessing to the patient list.' })
      })
    )
  } catch (e) {
    status = false
    err.errors.push({ patientId: 'A valid patient ID is required.' })
  }

  if (notes == '') {
    status = false
    err.errors.push({ notesId: 'Notes are required.' })
  }

  if (!status) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: err
    })
  } else {
    next()
  }
}

export default {
  appointmentval,
  toget
}
