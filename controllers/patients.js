// const { ObjectId } = require('mongodb')
const connection = require('../db/connect.js')

const collectionName = 'patients'

/**
 * Retrieves all patients from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved patients.
*/
const getAllPatients = async (req, res) => {
  try {
    const db = connection.getDb().db()
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
const getPatientById = async (req, res) => res.send('In progress...')

/**
 * Creates a new patient.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the patient is created.
 */
const createPatient = async (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'birthDate', 'address', 'city']

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      })
    }
  }

  try {
    const db = connection.getDb().db()
    const newPatient = await db.collection(collectionName).insertOne(req.body)
    res.status(201).json(newPatient.ops[0])
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
const updatePatient = async (req, res) => res.send('In progress...')

/**
 * Deletes a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the message 'done'.
 */
const deletePatient = async (req, res) => res.send('In progress...')

module.exports = {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient
}
