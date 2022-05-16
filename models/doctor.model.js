const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema(
    {
        // doctor_id: {
        //     type: String,
        //     required: true
        // },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        doctor_name: {
            type: String,
            required: true
        },
        appointment_slot_time: {
            type: String,
            required: true
        },
        day_start_time: {
            type: String,
            required: true
        },
        day_end_time: {
            type: String,
            required: true
        },
        isVerify:{
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('doctor', doctorSchema)
