import { getDOM } from "./getDOM.js";
import { saveId, getId, isPanel, isPanelChange } from "./save.js";
import { sendMsg, newWs} from "./websocket.js";
//import { save } from "./save.js"

/**
 * 对鼠标输入事件的响应
 * @author Hans
 */



const initMouse = ()=> {

    $(document).on("click", (e) => {

        if (e.target == getDOM("send")) {
            
            sendMsg(getId(),getDOM("typing").value);
            getDOM("typing").value="";

        } 
        else if (e.target == getDOM("button--idConfirm") && isPanel) {
            isPanelChange();

            let id = getDOM("userid").value;
            saveId(id);
        //空昵称重复输入
            if (getDOM("userid").value === ""){
                 location.reload();
            }
            newWs();

        }
    });
}

export { initMouse }