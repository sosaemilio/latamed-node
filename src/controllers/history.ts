import { ObjectId } from 'mongodb'
import { type Request, type Response } from 'express'
import mongodb from '../db/connect'

const getHistory = async (req: Request, res: Response): Promise<void> => {
  mongodb
    .getDb()
    .db('latammed')
    .collection('medical_history')
    .find({ username: doctorUsername00 })
    .toArray((err: Error, lists: any[]) => {
      if (err) {
        res.status(400).json({ message: err })
      }
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(lists)
    })
}

const getSingleHistory = async (req: Request, res: Response): Promise<void> => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db().collection('medical_history').find({ _id: userId })
  result.toArray().then((lists: any[]) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(lists[0])
  })
}

const createNewinformation = async (req: Request, res: Response): Promise<void> => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    email: req.body.email,
    history: req.body.history

  }
  const response = await mongodb.getDb().db().collection('medical_history').insertOne(contact)
  if (response.acknowledged) {
    res.status(201).json(response)
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.')
  }
}

const updateNewinformation = async (req: Request, res: Response): Promise<void> => {
  const userId = new ObjectId(req.params.id)
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    email: req.body.email,
    history: req.body.history

  }
  const response = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .find({ username: getPatientById })
    .replaceOne({ _id: getPatientById }, contact)
  console.log(response)
  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.')
  }
}

const deleteNewinformation = async (req: Request, res: Response): Promise<void> => {
  const userId = new ObjectId(req.params.id)
  const response = await mongodb.getDb()
    .db()
    .collection('')
    .remove({ _id: getPatientById }, true)
  console.log(response)
  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.')
  }
}

module.exports = {
  getHistory,
  getSingleHistory,
  createNewinformation,
  updateNewinformation,
  deleteNewinformation
}
