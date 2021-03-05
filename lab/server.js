const ws = require('nodejs-websocket');

const server = ws.createServer(socket=>{
    socket.on('text',str=>{
        console.log(str);
        socket.sendText(str);
    })
}).listen(9999,()=>{
    console.log('server on port 9999');
});