const ws = require('nodejs-websocket');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const user = require("./User")

var connectionsnumber = 1;
var connectionslist = ["connectionslist_msg"];

async function findAccount(email){
        let model =  await user.User.findOne({
            attributes: { exclude: ["password"] },
            where:{
                email:email
            }
        })
        return model.dataValues.account;
}

const server = ws.createServer(connection => {

    connection.on('text',async (conn)=>{
        var msg =JSON.parse(conn);
        server.connections.forEach(connection => {
            connection.sendText(conn)
            console.log(`收到的信息： ${conn}`)
      })
      if(msg.id === "system_information_online_id"){
        //新增到在线列表
        let id=await findAccount(jwt.verify(msg.token,"uukn").email);
        connectionslist[connectionsnumber]=id;
        connectionsnumber++;

        //发送在线列表
        var connectionslist_msg =  JSON.stringify(connectionslist);
        server.connections.forEach(connection => {
            connection.sendText(connectionslist_msg)
      })
        console.log("connectionsnumber:"+connectionsnumber+"\n"+connectionslist); 
      }
      else if(msg.id === "system_information_offline_id"){
        //编辑在线列表
        let id= msg.user_id;
        
        for(var n=1 ;n<connectionsnumber ;n++){
            if(connectionslist[n] == id){
                connectionslist.splice(n,1);
            }
        }
        connectionsnumber--;

        //发送在线列表
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