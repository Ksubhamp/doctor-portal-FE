const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const connect = require('./conn/mongoDb');
const authRouter = require("./route/authRouter");
const appointmentsRouter = require("./route/appointmentsRouter");
const DoctorRouter = require("./route/doctorRouter");
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet());

app.use("/auth", authRouter);
app.use("/doctor", DoctorRouter);
app.use("/appointment", appointmentsRouter);


//      TEST SIMPLE API
app.get('/', async (req, res) => {
    try {
        // for (let index = 0; index < 1e8; index++) {
            
        // }
        res.status(200).send({ status: true, data: process.pid, msg: 'SERVER IS RUNNING ' })
    } catch (error) {
        res.end(error)
    }
})
    
module.exports = app;