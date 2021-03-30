const ws = require('nodejs-websocket');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();


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
        let id = msg.text.jwt.verify(token, "uukn").email;
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
    })

}).listen(9999,()=>{
    console.log('ws server on port 9999');
});