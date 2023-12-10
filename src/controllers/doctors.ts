import mongodb from '../db/connect'
import { ObjectId } from 'mongodb'
import { usernameExists } from '../middleware/doctorUsernameValidator'
import { type Request, type Response } from 'express'

const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await mongodb.getDb().db('latammed').collection('doctors').find({})
    doctors.toArray().then((lists: any[]) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(lists[0])
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

const getDoctorByName = async (req: Request, res: Response): Promise<void> => {
  // REMINDER: Needs to add a 404 error when it is not found
  const doctorUsername = req.params.username
  const doctor = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .find({ username: doctorUsername })
  doctor.toArray().then((list: any[]) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(list)
  })
}

const addDoctor = async function (req: Request, res: Response): Promise<void> {
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

  const newDoctor = req.body
  if (newDoctor.username) {
    await usernameExists(newDoctor.username).then((result: any) => {
      console.log(result)
      if (result) {
        res.status(500).send('User exist')
      }
    })
  }
  const result = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .insertOne(newDoctor, (err: Error) => {
      if (err) res.status(500).send(err)
    })

  if (result) res.status(201).json(result)
}

const updateDoctorById = async function (req: Request, res: Response): Promise<void> {
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
  const doctorId = new ObjectId(req.params.id)
  const data = req.body
  const result = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .updateOne({ _id: doctorId }, { $set: data })
  if (result) res.status(204).json(result)
}

const deleteDoctor = async function (req: Request, res: Response): Promise<void> {
  const doctorId = new ObjectId(req.params.id)
  const result = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .deleteOne({ _id: doctorId })
  if (result) res.status(200).json(result)
}

export default {
  getDoctors,
  getDoctorByName,
  addDoctor,
  updateDoctorById,
  deleteDoctor
}
