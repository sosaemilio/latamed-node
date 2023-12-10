const mongodb = require('../db/connect');

const usernameExists = async (doctorUsername) => {
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

module.exports = {
    usernameExists,
}
