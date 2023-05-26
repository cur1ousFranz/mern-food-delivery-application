const server = require('http').createServer();
const wss = require('socket.io')(server);

wss.on('connection', socket => {
    console.log('Websocket server is running at port 8080');
})

server.listen(8080, () => {
    console.log('WebSocket server is running at port 8080');
  });


module.exports = wss

