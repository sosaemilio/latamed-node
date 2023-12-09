const request = require('supertest')
const { describe, it, expect } = require('@jest/globals')
const app = require('../app')

describe('Patients Routes', () => {
  it('GET /patients - responds with a list of patients', async () => {
    const response = await request(app).get('/patients')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it('POST /patients - creates a new patient', async () => {
    const newPatient = { /* patient data */ }
    const response = await request(app).post('/patients').send(newPatient)
    expect(response.statusCode).toBe(201)
    expect(response.body).toMatchObject(newPatient)
  })

  it('GET /patients/:id - responds with a specific patient', async () => {
    const id = '6574e1bb2466eb587fd7d71a' // replace with a real id
    const response = await request(app).get(`/patients/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body._id).toBe(id)
  })

  it('PUT /patients/:id - updates a specific patient', async () => {
    const id = '6574e1bb2466eb587fd7d71a' // replace with a real id
    const updatedData = {
      firstName: 'JEST'
    }
    const response = await request(app).put(`/patients/${id}`).send(updatedData)
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(updatedData)
  })

  it('DELETE /patients/:id - deletes a specific patient', async () => {
    const id = ''
    const response = await request(app).delete(`/patients/${id}`)
    expect(response.statusCode).toBe(200)
  })
})
