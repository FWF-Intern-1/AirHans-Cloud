import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'
import { isRecent } from './time.js'
import { panel } from './panel.js'

var ws = new WebSocket("ws://tomzhang.com.cn:9999");
ws.onopen=()=>{
    console.log("connected");
    panel();
}

// function sendmsg(){
//     ws.send(getDOM("typing"))
// }

ws.onmessage = (evt)=>{
    //var received_msg = getDOM("typing").value;
    var received_msg = evt.data;

    console.log(typeof evt.data);
    bubble(received_msg,1,true)
}

ws.onclose = ()=>{ 
    alert("连接已关闭..."); 
    panel();
};

bubble("111111",0,true);
bubble("2222222",0,true);
bubble("3333333",0,false);


$("#chatBox--input--button__send").on("click",() => {
    console.log("点击！");
    ws.send(getDOM("typing"));
})
