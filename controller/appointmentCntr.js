const Doctor = require('../models/doctor.model');
const Appointment = require('../models/appointment.model');
const moment = require('moment');
const { isValidObjectId } = require('../helpers/validations');
const splitTime = require('../helpers/timeslots')

const appointmentDetalis = async (req, res) => {

    try {
        let filter = {};

        filter['doctor_id'] = req.body.doctor_id
        filter['appointment_date'] = req.body.date
        if (req.body.doctor_id == '') {
            throw new Error('Required a valid ID');
        }
        if (req.body.date == '') {
            throw new Error('Required a valid appointment_date');
        }
        const doctor = await Doctor.findById(filter['doctor_id']);
        // console.log(doctor);

        let l = await Appointment.find(filter);

        // setting doctors start time and end time 

        const interval = doctor.appointment_slot_time;
        const startTime = new moment({ hour: doctor.day_start_time.split(':')[0], minute: doctor.day_start_time.split(':')[1] });
        const endTime = new moment({ hour: doctor.day_end_time.split(':')[0], minute: doctor.day_end_time.split(':')[1] });

        const timeSlices = splitTime(startTime, endTime, interval);

        let slots = []
        for (let i = 0; i < timeSlices.length - 1; i++) {
            let first = new Date(timeSlices[i]);
            let sceond = new Date(timeSlices[i + 1]);
            let o = {
                start: String(first.getHours()).padStart(2, '0') + ':' + String(first.getMinutes()).padStart(2, '0'),
                end: String(sceond.getHours()).padStart(2, '0') + ':' + String(sceond.getMinutes()).padStart(2, '0'),
                active: true
            }
            let isEx = l.some(e => e.appointment_time == o.start);
            if (isEx) {
                o['active'] = false
            }
            slots.push(o);
        }
        res.status(200).send({ status: true, data: { slots, doctor }, l, message: `Appointdata  get successfully.` })
    } catch (error) {
        res.status(500).send({ status: false, message:error.message })

    }
}



const book_appointment = async (req, res) => {

    try {
        const { appointment_date, appointment_time } = req.body;

        const app_date = new Date(appointment_date);
        app_date.setHours(0);
        app_date.setMinutes(0);
        app_date.setSeconds(0);
        req.body['appointment_date'] = app_date;
        let filter = {
            appointment_date: app_date,
            appointment_time,
            status: {
                $ne: 'Cancelled'
            }
        }
        let check = await Appointment.find(filter).count('count');
        if (check && check > 0) {
            res.status(400).send({ status: false, message: 'Appointment already exists' })
            return
        }
        let data = []
         data = await Appointment.create(req.body);
        res.status(201).send({ status: true, data, message: `Appointment booked successfully.` })


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }


}



module.exports = { appointmentDetalis, book_appointment }