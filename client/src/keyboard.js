import { sendMsg } from './websocket.js'
import { getDOM } from './getDOM.js'
import { dataMy } from './save.js';

/**
 * 对键盘输入事件的响应
 * @author Hans
 */
const initKeyboard = ()=> {
    $(document).keydown((e) => {
        
        if (e.target == getDOM("typing")) {
            //响应回车发送消息

            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();

                if (getDOM("typing").value !== "") {

                    sendMsg(dataMy.id,getDOM("typing").value);
                    getDOM("typing").value="";
                    
                }
            }
        }

    
    });
}


export { initKeyboard }