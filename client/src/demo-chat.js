import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'
import { isRecent } from './time.js'
import { panel } from './panel.js'
import { initKeyboard } from './keyboard.js'

initKeyboard();

var ws = new WebSocket("ws://127.0.0.1:9999");

ws.onopen=()=>{
    console.log("connected");
    panel();
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
    panel();
};

console.log(getDOM("typing"));
