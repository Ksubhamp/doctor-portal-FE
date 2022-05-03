const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const connect  = require('./conn/mongoDb');

connect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



const appoitment = require('./models/appointment.model')
app.get('/',async (req,res)=>{
    try {
        // appoitment.create({patient_name:"subham"})
        
        res.send('Server is working....')
    } catch (error) {
        
        res.end(error)
    }
})




app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT} PORT !!`);
})