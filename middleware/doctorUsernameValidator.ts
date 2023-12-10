import mongodb from '../db/connect';

const usernameExists = async (doctorUsername: string): Promise<boolean> => {
    const doctor = await mongodb
        .getDb()
        .db('latammed')
        .collection('doctors')
        .find({ username: doctorUsername });
        doctor.toArray().then((list) => {
            if (list.length !== 0) {
                return true;
            } else {
                return false;
            }
        });
}

export { usernameExists };
