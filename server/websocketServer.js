const { Server } = require('socket.io')
const io = new Server(5000, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001']
}
})

io.on('connection', (socket) => {
  // ...
})

module.exports = io

