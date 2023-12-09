// const { ObjectId } = require('mongodb')
const connection = require('../db/connect.js')
const { ObjectId } = require('mongodb')

const collectionName = 'patients'

/**
 * Retrieves all patients from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved patients.
 */
const getAllPatients = async (req, res) => {
  try {
    const db = await getDB()
    const patients = await db.collection(collectionName).find().toArray()
    res.status(200).json(patients)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * Retrieves a patient by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient is retrieved.
 */
const getPatientById = async (req, res) => {
  const { id } = req.params
  const patiendId = new ObjectId(id)

  try {
    const db = await getDB()
    const patient = await db.collection(collectionName).findOne({ _id: patiendId })
    res.status(200).json(patient)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * Creates a new patient.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient is created.
 */
const createPatient = async (req, res) => {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'birthDate',
    'address',
    'city'
  ]

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      })
    }
  }

  try {
    const db = await getDB()
    const newPatient = await db.collection(collectionName).insertOne(req.body)
    console.log(newPatient)
    if (newPatient.acknowledged) {
      // return the patient
      const patient = await db.collection(collectionName).findOne({ _id: newPatient.insertedId })
      res.status(201).json(patient)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * Updates a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
const updatePatient = async (req, res) => {
  const { id } = req.params
  const patiendId = new ObjectId(id)
  const { body } = req

  try {
    const db = await getDB()
    const updatedPatient = await db.collection(collectionName).findOneAndUpdate(
      { _id: patiendId },
      { $set: body },
      { returnOriginal: false }
    )
    res.status(200).json(updatedPatient.value)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

/**
 * Deletes a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the message 'done'.
 */
const deletePatient = async (req, res) => {
  const { id } = req.params
  const patiendId = new ObjectId(id)
  try {
    const db = await getDB()
    await db.collection(collectionName).deleteOne({ _id: patiendId })
    res.status(200).send('Patient deleted')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function getDB () {
  return connection.getDb().db('latammed')
}

module.exports = {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  getDB
}
