const express = require("express");
const router = express.Router();
const appointmentController = require('../controller/appointmentCntr');
const doctorConttroller = require('../controller/doctorCont');
const verify = require('../middleware/tokenVerify')



    // ----------       Get appointment sloit times and doctor detalis ------------- 
    // Payload
    // {
    //     "date":"04/05/2022",
    //     "doctor_id":"62724a4f35802fcf6f1d7f2c"
    // }
router.post('/',appointmentController.appointmentDetalis );




router.post('/book',appointmentController.book_appointment );


router.post('/statusUpdate',verify,doctorConttroller.updateStatus);


module.exports = router;
