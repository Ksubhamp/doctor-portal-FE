const express = require("express");
const router = express.Router();

const verify = require('../middleware/tokenVerify')


const doctorConttroller = require('../controller/doctorCont');

router.get('/',doctorConttroller.getAllDoctor)


router.post('/dashboard',verify,doctorConttroller.getdashboardData)


module.exports = router;
