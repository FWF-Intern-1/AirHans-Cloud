import { sendMsg, newWs } from './websocket.js'
import { getDOM } from './getDOM.js'
import { getId, isPanel, isPanelChange, saveId } from './save.js';

/**
 * 对键盘输入事件的响应
 * @author Hans
 */
const initKeyboard = ()=> {
    $(document).keydown((e) => {
        console.log(e.target);
        if (e.target == $("#panel--id")[0]) {
            if ((e.keyCode == 13) && ($("#panel--id")[0] !== undefined) && isPanel) {
                isPanelChange();
                let id = getDOM("userid").value;
                saveId(id);
                newWs();
            }
        
        } else if (e.target == $("#chatBox--input--typing")[0]) {
            if (e.keyCode == 13 && e.shiftKey) {
                console.log("shift+enter");
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (getDOM("typing").value !== "") {
                    sendMsg(getId(),getDOM("typing").value);
                    getDOM("typing").value="";
                    
                }
            }
        }
        // } else if () {

        // }
    
    });
}


export { initKeyboard }