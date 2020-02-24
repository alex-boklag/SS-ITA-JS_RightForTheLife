const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
const port = process.env.APP_PORT;

server.listen(port);