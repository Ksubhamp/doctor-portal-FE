const mongoose = require('mongoose')
const config = require('../config');

const connect = async (url = config.dbUri) => {
    try {
        let i = await  mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })
        console.log(`MongoDb is ready use `)
        
    } catch (error) {
        console.error(error)
        
    };
};
 
 module.exports = connect; 
  