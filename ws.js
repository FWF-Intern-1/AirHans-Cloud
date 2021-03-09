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
    // socket.on('close',(code,err)=>{
    //     console.log(code,err)
    //     var unonlineid = {
    //         "id" : "system_information_unonline_id",     //这么长的名字应该不会真的有人会用这个id吧
    //         "text" : 123
    //     }
    // })

}).listen(9999,()=>{
    console.log('server on port 9999');
});
    