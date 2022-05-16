const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema(
  {

    // appointment_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctor',
      required: true
    },
    appointment_date: {
      type: Date,
      required: true
    },
    appointment_time: {
      type: String,
      required: true
    },
    patient_name: {
      type: String,
      required: true
    },
    patinet_email: {
      type: String,
      required: true
    },
    patinet_phone: {
      type: String,
      required: true
    },
    appointment_status: {
      type: String,
      required: true,
      enum: ['Open', 'Cancelled', 'Closed'],
      default: 'Open'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('appointment', appointmentSchema)
