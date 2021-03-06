import { sendMsg } from './demo-chat.js'
import { getDOM } from './getDOM.js'


const initKeyboard = ()=> {
    $(document).keydown((event) => {
        //console.log(event.keyCode);
        if (event.keyCode == 13 && event.shiftKey) {
           // console.log("shift+enter");
        } else
        if (event.keyCode == 13) {
            event.preventDefault();
            //console.log("enter");
            if (getDOM("typing").value !== "") {
                sendMsg(getDOM("typing").value);
            }
        }
    
    });
}


export { initKeyboard }