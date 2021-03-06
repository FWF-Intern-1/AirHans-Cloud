const ws = require('nodejs-websocket');


const server = ws.createServer(socket => {

    socket.on('text',conn=>{
        msg = conn;
        console.log(conn)
        server.connections.forEach(socket => {
            socket.sendText(conn)
      })
    })
    
}).listen(9999,()=>{
    console.log('server on port 9999');
});