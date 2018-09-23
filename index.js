const cluster = require('cluster')
const clusterConfig = require('./config/cluster.js');

if(clusterConfig.enabled && cluster.isMaster) {

    console.log(`Process ${process.pid} starting (Master)`);
    
    // Fork workers.
    for (let i = 0; i < clusterConfig.numProcesses; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Process ${worker.process.pid} died`);
    });

    process.on('SIGINT', () => {
        console.log(`Process caught SIGINT (Master)`);
    });
    
} else {
    console.log(`Process ${process.pid} starting`);
    require('./main/server.js');
}
