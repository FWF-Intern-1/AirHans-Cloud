import { panel } from "./panel.js";
import { getId } from "./save.js";
import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'

let ws = null;

/**
 * 新建WebSocket对象
 * @param {string} id
 * @author Hans
 */

let newWs= (id) => {
    
/**
 * @author Air
 */
    //建立连接
    // var ws = new WebSocket("ws://127.0.0.1:9999");
    ws = new WebSocket("ws://tomzhang.com.cn:9999");

    //连接成功
    ws.onopen=()=>{
        console.log("connected");
        panel();
    }


    // 收到消息
    ws.onmessage = (evt) => {
        var recmsg = JSON.parse(evt.data);
        if( recmsg.id != getId() ) {
            bubble("id："+recmsg.id+" text:"+recmsg.text,recmsg.id,true)
        }
    }

    // 连接关闭
    ws.onclose = () => { 
        alert("连接已关闭..."); 
        panel();
    };

}

/**
 * 发送消息
 * @param {string} id 
 * @param {string} text 
 * @author Air
 */
function sendMsg(id,text){
    var msg = {
        "id":getId,
        "text":text
    }
    //转化为字符串发送
    ws.send(JSON.stringify(msg));
    bubble(text,1,0)
    getDOM("typing").value=""
}


export { sendMsg,newWs }