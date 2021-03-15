import { panel } from "./panel.js";
import { getId } from "./save.js";
import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'
import { toast } from "./toast.js";
import { offline, online } from "./onlineList.js";

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
    //建立转移到了mouse.js后，点击后再连接
        ws = new WebSocket("ws://127.0.0.1:9999");
        // ws = new WebSocket("ws://tomzhang.com.cn:9999");

    //连接成功
    ws.onopen=()=>{
        //向服务器发送上线id
        var onlineid = {
            "id" : "system_information_online_id",     //这么长的名字应该不会真的有人会用这个id吧
            "text" : getId()
        }
        ws.send(JSON.stringify(onlineid));
        //connection information
        console.log("connected");
        panel();
        toast("系统","连接成功！");
        online(String(getId()));
    }

var timestorecvicetheconnectionslist = 0;
    // 收到消息
    ws.onmessage = (evt) => {
        var recmsg = JSON.parse(evt.data);
        if (recmsg.id === "system_information_online_id"){
            toast("在线信息",recmsg.text+" 已上线");
            online(recmsg.text);
        }
        else if(recmsg.id === "system_information_offline_id"){
            toast("在线信息",recmsg.text+" 已下线");
            offline(recmsg.text);
        }
        else if(recmsg.id === "connectionslist_msg"){
            if (timestorecvicetheconnectionslist === 0){
                online(recmsg.text);
                timestorecvicetheconnectionslist++;
            }
        }
        else if( recmsg.id != getId() ) {
            bubble(recmsg.text,recmsg.id,true);
            console.log("id="+getId());
            console.log("recid="+recmsg.id);
        }
    }

    // 连接关闭
    window.onbeforeunload = function () {
        var offlineid = {
            "id" : "system_information_offline_id",     //这么长的名字应该不会真的有人会用这个id吧
            "text" : getId()
        }
        ws.send(JSON.stringify(offlineid));
        ws.close();
    }

    ws.onclose = () => { 
        toast("系统","链接已经断开")
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
        "id" : id,
        "text" : text
    }
    //转化为字符串发送
    ws.send(JSON.stringify(msg));
    bubble(text,getId(),0);
    getDOM("typing").value="";
}


export { sendMsg,newWs }