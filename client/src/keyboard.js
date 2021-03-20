import { sendMsg, newWs } from './websocket.js'
import { getDOM } from './getDOM.js'
import { getId, isPanel, isPanelChange, saveId } from './save.js';

/**
 * 对键盘输入事件的响应
 * @author Hans
 */
const initKeyboard = ()=> {
    $(document).keydown((event) => {
        //console.log(event.keyCode);
        if ((event.keyCode == 13) && (getDOM("button--idConfirm") !== undefined) && isPanel) {
            isPanelChange();
            let id = getDOM("userid").value;
            saveId(id);
            newWs();
        // } else if (event.keyCode == 13 && event.shiftKey) {
        //     console.log("shift+enter");
        } else if (event.keyCode == 13) {
            event.preventDefault();
            if (getDOM("typing").value !== "") {
                
                sendMsg(getId(),getDOM("typing").value);
                
            }
        }
    
    });
}


export { initKeyboard }