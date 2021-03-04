const { Socket } = require('dgram')
const ws = require('nodejs-websocket');

const server = ws.createServer(socket=>{
    socket.on('text',str=>{
        console.log(str);
        
        socket.sendText('收到消息了');
    })
}).listen(9999,()=>{
    console.log('server on port 9999');
});