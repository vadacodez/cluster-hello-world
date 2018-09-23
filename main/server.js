const http = require('http');
const webserverConfig = require('../config/server');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.on('listening', () => {
  console.log(`Server running at http://${webserverConfig.hostname}:${webserverConfig.port}/`);
});

server.on('error', (err) => {
  console.log(`Server error : ${err}`);
  process.exit(1);
});

server.listen(webserverConfig.port, webserverConfig.hostname);

process.on('SIGINT', async () => {
  console.log(`Server caught SIGINT`);
  try {
    await server.close();
    console.log(`Server closed`);
  } catch (ex) {
    console.log(`Server close error ${ex}`);
  }
  process.exit();
});
