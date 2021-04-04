const ws = require('nodejs-websocket');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

app.post('/', async (req, res) => {
    
})

var connectionsnumber = 1;
var connectionslist = ["connectionslist_msg"];

const server = ws.createServer(connection => {

    connection.on('text',conn=>{
        var msg =JSON.parse(conn);
        server.connections.forEach(connection => {
            connection.sendText(conn)
      })
      if(msg.id === "system_information_online_id"){
        let id = jwt.verify(msg.text,"uukn").email;
        // TODO 把email换成account
        console.log('id:',id)
        connectionslist[connectionsnumber]=id;
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
        for(var n=1 ;n<connectionsnumber ;n++){
            if(connectionslist[n] === id){
                connectionslist.splice(n,1);
            }
        }
        var connectionslist_msg =  JSON.stringify(connectionslist);
        server.connections.forEach(connection => {
            connection.sendText(connectionslist_msg)
        })
        console.log(connectionslist_msg);

        console.log("connectionsnumber:"+connectionsnumber+"\n"+connectionslist);  
      }
      else{
          
      }
    })

}).listen(9999,()=>{
    console.log('ws server on port 9999');
});
app.listen(8083,()=>{
    console.log('listing 8083')
})