import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'

var ws = new WebSocket("ws://tomzhang.com.cn:9999");

ws.onopen=()=>{
    console.log("connected")
}
<<<<<<< HEAD

$("#chatBox--input--button__send").on("click",() => {
    console.log("点击！");
    ws.send(getDOM("typing").value);
    bubble(getDOM("typing").value,1,false)
    getDOM("typing").value=""
})

ws.onmessage = (evt) => {
    var received_msg = evt.data;
=======

// function sendmsg(){
//     ws.send(getDOM("typing"))
// }

ws.onmessage = (evt)=>{
    //var received_msg = getDOM("typing").value;
    var received_msg = evt.data;

    console.log(typeof evt.data);
>>>>>>> 11e92b05aa95aefd6e81b0af6e42bd1eb7606cc4
    bubble(received_msg,1,true)
}

ws.onclose = () => { 
    alert("连接已关闭..."); 
};
<<<<<<< HEAD
console.log(getDOM("typing"));
=======

bubble("111111",0,true);
bubble("2222222",0,true);
bubble("3333333",0,false);


$("#chatBox--input--button__send").on("click",() => {
    console.log("点击！");
    ws.send(getDOM("typing"));
})
>>>>>>> 11e92b05aa95aefd6e81b0af6e42bd1eb7606cc4
