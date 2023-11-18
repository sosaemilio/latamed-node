const getDoctors = async (req, res) => {
    try {
        const doctors = await mongodb.getDb().db('latammed').collection('doctors').find({});
        doctors.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
        });
      } catch (err) {
        res.status(500).json(err);
      }
}

const getDoctorByName = async (req, res) => {
    const doctorUsername = new ObjectId(req.params.username);
    const doctor = await mongodb.getDb().db('byui').collection('contacts').find({ username: doctorUsername });
    doctor.toArray().then((list) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(list);
    });
}