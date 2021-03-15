const ws = require('nodejs-websocket');

var connectionsnumber = 0;
var connectionslist=new Array();


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
        var connectionslist_msg = {
            "id" : "connectionslist_msg",
            "text" : 0
        }
        for(let i=0 ;i<connectionsnumber ;i++ ){
            connectionslist_msg.text = (String(connectionslist[i]));
            server.connections.forEach(connection => {
                connection.sendText(JSON.stringify(connectionslist_msg))
          })
        }
        console.log("connectionsnumber:"+connectionsnumber+"\n"+connectionslist);
      }
      else if(msg.id === "system_information_offline_id"){
          connectionsnumber--;
      }
    })

}).listen(9999,()=>{
    console.log('server on port 9999');
});


    