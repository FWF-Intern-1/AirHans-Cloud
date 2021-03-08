import { getDOM } from "./getDOM.js";
import { sendMsg } from "./websocket.js";
//import { save } from "./save.js"

/**
 * 对鼠标输入事件的响应
 * @author Hans
 */



const initMouse = ()=> {

    $(document).on("click", (e) => {

        if (e.target == getDOM("send")) {
            
            sendMsg(getDOM("id").value,getDOM("typing").value);
            getDOM("typing").value="";
            bubble(getDOM("typing").value,1,false);


        } else 
        if (e.target == getDOM("button--idConfirm")) {
            //TODO:id获取之后的操作
            let id = getDOM("userid").value;

        }
    });
}

export { initMouse }