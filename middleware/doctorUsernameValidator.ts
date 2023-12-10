import { getDb } from '../db/connect';

const usernameExists = async (doctorUsername: string): Promise<boolean> => {
    const doctor = await getDb()
        .db('latammed')
        .collection('doctors')
        .find({ username: doctorUsername });
    const list = await doctor.toArray();
    if (list.length !== 0) {
        return true;
    } else {
        return false;
    }
}

export {
    usernameExists,
}

