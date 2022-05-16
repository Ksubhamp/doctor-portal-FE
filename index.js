

const app = require('./app')
const PORT = process.env.PORT || 4000;
const cluster = require('cluster');
const os = require('os');

// const numCpu = os.cpus().length;
// if (cluster.isMaster) {
//     for (let index = 0; index < numCpu - 1; index++) {
//         cluster.fork();
//     }
// } else {

//     app.listen(PORT,()=>{
//         console.log(`Server ${process.pid} is running in ${PORT} PORT  !!`);
//     })
// }
app.listen(PORT,()=>{
    console.log(`Server ${process.pid} is running in ${PORT} PORT  !!`);
})
