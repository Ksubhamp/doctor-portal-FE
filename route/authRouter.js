const express = require("express");
const router = express.Router();
// const permissions = require("../middlewares/permissions");
// const tokenVerification = require("../middlewares/tokenVerification");


const authController = require("../controller/auth");



router
    .route("/login")
    .post(authController.login);


router
    .route("/signup")
    .post(authController.signup);


module.exports = router;
