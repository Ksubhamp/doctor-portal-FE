const ObjectId = require('mongoose').Types.ObjectId;
const status =  ['Open', 'Cancelled', 'Closed'];
const validator = require('validator');

function isValidObjectId(id) {
    if (ObjectId.isValid(id)) {
        return true;
    }
    return false;
}

function isStatus(s){
    return status.includes(s)
}

function validateSignup(d) {
    if (validator.isEmpty(d.email,{ ignore_whitespace:true })) {
        throw new Error('Email is required.')
    }
    if (validator.isEmpty(d.password ,{ ignore_whitespace:true })) {
        throw new Error('password is required.')
    }
    if (validator.isEmpty(d.name ,{ ignore_whitespace:true })) {
        throw new Error('name is required.')
    }
    if (validator.isEmpty(d.email ,{ ignore_whitespace:true })) {
        throw new Error('Email is required.')
    }
    if (validator.isEmpty(d.doctor.doctor_name ,{ ignore_whitespace:true })) {
        throw new Error('doctor_name is required.')
    }
    if (validator.isEmpty(d.doctor.appointment_slot_time ,{ ignore_whitespace:true })) {
        throw new Error('appointment_slot_time is required.')
    }
    if (validator.isEmpty(d.doctor.day_start_time ,{ ignore_whitespace:true })) {
        throw new Error('day_start_time is required.')
    }
    if (validator.isEmpty(d.doctor.day_end_time ,{ ignore_whitespace:true })) {
        throw new Error('day_end_time is required.')
    }
}

function validateLogin(d) {
    if (validator.isEmpty(d.email,{ ignore_whitespace:true })) {
        throw new Error('Email is required.')
    }
    if (validator.isEmpty(d.password ,{ ignore_whitespace:true })) {
        throw new Error('password is required.')
    }
}




module.exports = { isValidObjectId ,isStatus,validateSignup ,validateLogin}