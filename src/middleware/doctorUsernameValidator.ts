import mongodb from '../db/connect'

export const usernameExists = async (doctorUsername: string): Promise<void> => {
  const doctor = await mongodb
    .getDb()
    .db('latammed')
    .collection('doctors')
    .find({ username: doctorUsername })
  doctor.toArray().then((list: any[]) => {
    if (list.length !== 0) {
      return true
    } else {
      return false
    }
  })
}

export default {
  usernameExists
}
