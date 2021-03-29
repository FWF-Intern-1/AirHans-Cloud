const ws = require('nodejs-websocket');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');  
const express = require("express");
const app = express();

app.use(cookieParser());  

app.post("/",async (req, res) => {
    let token = req.cookies.token;
    console.log('shoudaopost')
    console.log("email in token :",jwt.verify(token, "uukn")) 
})


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
        for(var n=1 ;n<connectionsnumber ;n++){
            if(connectionslist[n] === msg.text){
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


var server_chat = app.listen(8082, function () {
    console.log("chat server on 8082");
  });
