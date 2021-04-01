import { dataMy, dbAdd } from "./save.js";
import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'
import { toast } from "./toast.js";
import { online, onlineClear, onlineMy } from "./onlineList.js";
import { startTime } from "./time.js";

let ws = null;

/**
 * 新建WebSocket对象
 * @param {string} id
 * @author Hans
 *
 */

//TODO  跳转到页面以后自动post这个cookie。cookie目录是templete理论上是可以的，但是好像接收也有点问题

console.log("123",document.cookie)
$.post("http://127.0.0.1:8082",document.cookie),(data, textStatus, jqXHR)=>{
        console.log("connect post return :",data);
}

let newWs= (id) => {
    
/**
 * @author Air
 */     
    //建立转移到了mouse.js后，点击后再连接
        ws = new WebSocket("ws://127.0.0.1:9999");
        // ws = new WebSocket("ws://tomzhang.com.cn:9999");

    //连接成功
    ws.onopen=()=>{
        //向服务器发送上线id
        var onlineid = {
            "id" : "system_information_online_id",     //这么长的名字应该不会真的有人会用这个id吧
            "text" : dataMy.id
            //TODO 换成token
        }
        ws.send(JSON.stringify(onlineid));
        //connection information
        console.log("connected");
        toast("系统","连接成功！");
        onlineMy();
    }

    // 收到消息
    ws.onmessage = (evt) => {
        var recmsg = JSON.parse(evt.data);
        if (recmsg.id === "system_information_online_id"){
            toast("在线信息",recmsg.text+" 已上线");
        }
        else if(recmsg.id === "system_information_offline_id"){
            toast("在线信息",recmsg.text+" 已下线");
            //offline(recmsg.text);
        }
        else if(recmsg[0] === "connectionslist_msg"){
            console.log(recmsg);
            onlineClear();
            for (let i = 1;i < recmsg.length;i++ ) {
                online(recmsg[i]);
            }
        }
        else if( recmsg.id != dataMy.id ) {
            //将消息存进indexDB
            dbAdd({
                code: 1,
                id: recmsg.id,
                text: recmsg.text,
                time: startTime()
            });

            bubble({
                text: recmsg.text,
                id: recmsg.id,
                //TODO email: resmsg.email 以后应用email作为唯一标识符
            });
            
        }
    }

    // 连接关闭
    window.onbeforeunload = function () {
        var offlineid = {
            "id" : "system_information_offline_id",     //这么长的名字应该不会真的有人会用这个id吧
            "text" : dataMy.id
        }
        ws.send(JSON.stringify(offlineid));
        ws.close();
    }

    ws.onclose = () => { 
        toast("系统","链接已经断开")

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
        "id" : id,
        "text" : text
    }
    let data = {
        code: 1,
        id: id,
        text: text,
        time: startTime()
    }
    dbAdd(data);
    //转化为字符串发送
    ws.send(JSON.stringify(msg));
    bubble(data);
    
    // TODO bubble应当在接收到服务器消息时调用
}


export { sendMsg,newWs }