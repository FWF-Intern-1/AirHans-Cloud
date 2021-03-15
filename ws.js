const ws = require('nodejs-websocket');

var connectionsnumber = 1;
var connectionslist = ["connectionslist_msg"];


const server = ws.createServer(connection => {

    connection.on('text',conn=>{
        var msg =JSON.parse(conn);
        console.log("id:"+msg.id)
        console.log("text:"+msg.text)
        server.connections.forEach(connection => {
            connection.sendText(conn)
      })

      if(msg.id === "system_information_online_id"){
        connectionslist[connectionsnumber]=msg.text;
        connectionsnumber++;

        var connectionslist_msg =  JSON.stringify(connectionslist);
        server.connections.forEach(connection => {
            connection.sendText(connectionslist_msg)
      })
        console.log(connectionslist_msg);

        console.log("connectionsnumber:"+connectionsnumber+"\n"+connectionslist);
      }
      else if(msg.id === "system_information_offline_id"){
          connectionsnumber--;
      }
    })

}).listen(9999,()=>{
    console.log('server on port 9999');
});


    