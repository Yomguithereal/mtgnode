/**
 * MTGNode Realtime Hub
 * =====================
 *
 * This is where communications between sockets happen.
 */
var socketIO = require('socket.io');

// Bootstrap function
module.exports = function(server) {
  var io = socketIO(server);

  io.on('connection', function() {
    console.log('Socket connected!');
  });
};
