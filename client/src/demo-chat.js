import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'

var ws = new WebSocket("ws://tomzhang.com.cn:9999");
ws.onopen=()=>{
    console.log("connected")
}
function sendmsg(){
    ws.send(getDOM("typing"))
}

ws.onmessage = (evt)=>{
    var received_msg = evt.data;
    bubble(received_msg,i,true)
}

ws.onclose = ()=>{ 
    alert("连接已关闭..."); 
};


bubble("111111",0,true);
bubble("2222222",0,true);
bubble("3333333",0,false);
console.log(getDOM("typing"));

export{sendmsg}