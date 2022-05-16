const jwt = require('jsonwebtoken');
const config = require('../config');
const Doctor = require('../models/doctor.model');

module.exports = async (req, res, next) => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(401).json({
      status:'fail',
      message:'Access denied'
    });
  }
  try{
    const verified = jwt.verify(token, config.jwt.secret);
    req.user = verified;
    req.doctor = await Doctor.findOne({user_id:verified.id});

    // console.log(req.doctor);
    next();
  }catch(err){
    res.status(401).json({
      status:'fail',
      message:'Invalid Token'
    });
  }
}
