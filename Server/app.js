var express = require('express');
var app = express();

const server = app.listen(8080, function () {
  console.log('server is running on port 8080')
});


var socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function (data) {
    io.emit('RECEIVE_MESSAGE', data);
  })
});