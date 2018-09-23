const os = require('os');

module.exports = {
    enabled : false,
    numProcesses : os.cpus().length
}
