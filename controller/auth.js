const express = require('express');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const { validateSignup,validateLogin } = require('../helpers/validations');
const login = async (req, res) => {
    try {

        validateLogin(req.body)
        const { email, password } = req.body;

        const check = await User.findOne({ email });
        if (!check) {
            return res.status(401).send({ code: 401, message: 'User not exist' });
        }

        const match = await comparePassword(password, check.password);

        if (match) {
            const token = generateToken(check);

            return res.status(201).send({
                status: true,
                token: token,
                timeStamp: Date.now(),
                token_expaire: config.jwt.expiration * 1000
            })
        }
        return res.status(401).send({ code: 401, message: 'Unauthorized' });
    } catch (err) {
        return res.status(500).send({ code: 500, message:err.message, err });
    }
}

const signup = async (req, res) => {
    try {
        validateSignup(req.body);
        const { name, email, password, doctor } = req.body;
        const check = await User.findOne({ email: email.toLowerCase() })
        if (check) {
            return res.status(401).send({ code: 401, message: 'Alreay exist' });
        }
        const salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);
        let o = {
            name,email: email.toLowerCase(), password: hashpassword
        }
        let user = await User.create(o);
        doctor['user_id'] = user._id;
        await Doctor.create(doctor);
        const token = generateToken(user);

        return res.status(201).send({
            status: true,
            token: token,
            timeStamp: Date.now(),
            id_token_expires_in: config.jwt.expiration * 1000
        });

    } catch (err) {
        return res.status(500).send({ code: 500, message: err.message })
    }
}
const generateToken = (user) => {
    return jwt.sign({ id: user.id, roles: user.roles }, config.jwt.secret, {
        expiresIn: config.jwt.expiration
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, match) => {
            if (err) {
                return reject(err);
            }
            resolve(match);
        });
    });
}


module.exports = { login, signup,comparePassword };