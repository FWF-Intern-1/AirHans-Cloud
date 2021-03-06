const ws = require('nodejs-websocket');


const server = ws.createServer(socket => {

    socket.on('text',conn=>{
        var msg =JSON.parse(conn);
        console.log("id:"+msg.id)
        console.log("text:"+msg.text)
        server.connections.forEach(socket => {
            socket.sendText(conn)
      })
    })
    
}).listen(9999,()=>{
    console.log('server on port 9999');
});