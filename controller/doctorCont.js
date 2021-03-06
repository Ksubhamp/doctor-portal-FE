const Doctor = require('../models/doctor.model');
const Appointment = require('../models/appointment.model');
const { isValidObjectId ,isStatus} = require('../helpers/validations');

const getAllDoctor = async (req, res) => {
    try {
        let list = await Doctor.find();
        res.status(200).send({ status: true, data: list, message: `Doctor list get successfully.` })
    } catch (error) {
        res.status(500).send({ status: false, msg: `Server error`, message:error.message })

    }
}


const getdashboardData = async (req, res) => {

    try {

        const doctor_id = req.doctor._id             // Getting doctor data from middeware
        let te = Date.parse(req.body.date);
        if (isNaN(te)) {
            throw new Error('Required a valid date');
        }
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        // const limit =5;
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const pagintn = {};   // pagination object that contain next and previous page
    
        if (endIndex < await Appointment.countDocuments({ doctor_id }).exec()) {
            pagintn.next = {
            page: page + 1,
            limit: limit
          }
        }
        if (startIndex > 0) {
            pagintn.previous = {
            page: page - 1,
            limit: limit
          }
        }
        const appointment_date = req.body.date.split('-');
        const month = appointment_date[1];
        const year = appointment_date[0];
        let l = await Appointment.find({ doctor_id }).sort({ appointment_date: -1 }).limit(limit).skip(startIndex);
        let groupData = await Appointment.find({
            doctor_id,
            $expr: {
                $or: [
                    {
                        $and: [
                            { $eq: [{ $month: "$appointment_date" }, month] },
                            { $eq: [{ $year: "$appointment_date" }, year] },
                        ],
                    },
                ],
            },
        });
        // let groupData = await Appointment.find({doctor_id });

        res.status(200).send({ status: true, data: { doctor: req.doctor, l, groupData,pagintn }, message: `Doctor dashboard get successfully.` })


    } catch (error) {
        res.status(500).send({ status: false, msg: `Server error`, message: error.message })

    }

}

// update appointment status by appointment and status

const updateStatus = async (req, res) => {
    try {
        const { id, appointment_status } = req.body;
        if (isValidObjectId(id) == false) {
            throw new Error('Required a valid appoinment ID');
        }
        if (isStatus(appointment_status) == false) {
            throw new Error('Required a valid appointment_status');
        }
        let l = await Appointment.findByIdAndUpdate({ _id :id}, { appointment_status });
        res.status(200).send({ status: true, message: `status changed` })

    } catch (error) {
        res.status(500).send({ status: false, msg: `Server error`, message: error.message })

    }
}

module.exports = { getAllDoctor, getdashboardData, updateStatus }