const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.ATLAS_URI);
        db = await connection.db('latammed')
    });
    afterAll(async() => {
        await connection.close()
    })

    const mockAppointment = {
        date: "2023/12/25",
        time: "09:30",
        patientId: "656f852735815dbf9c4d8f28",
        doctorId: "655940a34be2a8a3dab5ec4e",
        notes: "Test"
    }

    var appId = {};

    it('should insert a new appointment into the appountments collection', async () => {
        const appointment = db.collection('appointments');

        await appointment.insertOne(mockAppointment)

        const insertedAppointment = await appointment.findOne({ patientId: '656f852735815dbf9c4d8f28' });

        expect(insertedAppointment).toEqual(mockAppointment)
    },
        
    it('should delete a appointment from the appointments collection', async () => {
        const appointment = db.collection('appointments')
        await appointment.deleteMany({ patientId: '656f852735815dbf9c4d8f28' })
        const deletedAppointment = await appointment.findOne({ patientId: '656f852735815dbf9c4d8f28' });
        expect(deletedAppointment).toEqual(null)
    })
)})