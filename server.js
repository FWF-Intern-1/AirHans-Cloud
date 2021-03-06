const ws = require('nodejs-websocket');

const server = ws.createServer(socket=>{
    socket.on('text',msg=>{
        console.log(msg);
        socket.sendText(msg);
    })
    socket.on('close',()=>{
        console.log('Connection closed')
    })
}).listen(9999,()=>{
    console.log('server on port 9999');
});