import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'

var ws = new WebSocket("ws://tomzhang.com.cn:9999");

ws.onopen=()=>{
    console.log("connected")
}

$("#chatBox--input--button__send").on("click",() => {
    console.log("点击！");
    ws.send(getDOM("typing").value);
    bubble(getDOM("typing").value,1,false)
    getDOM("typing").value=""
})

ws.onmessage = (evt) => {
    var received_msg = evt.data;
    bubble(received_msg,1,true)
}

ws.onclose = () => { 
    alert("连接已关闭..."); 
};
console.log(getDOM("typing"));