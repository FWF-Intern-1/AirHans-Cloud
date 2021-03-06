import { getDOM } from "./getDOM.js";
import { ws } from './websocket.js';

/**
 * 对鼠标输入事件的响应
 * @author Hans
 */
const initKeyboard = ()=> {
    $(document).on("click", (e) => {
        if (e.target == getDOM("send")) {
            ws.send(getDOM("typing").value);
            bubble(getDOM("typing").value,1,false);
            getDOM("typing").value="";
        } else {

        }
    });
}

export { initKeyboard }