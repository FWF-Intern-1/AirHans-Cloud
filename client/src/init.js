import { initKeyboard } from "./keyboard.js";
import { initMouse } from "./mouse.js";


/**
 * 必要的变量存储
 * @author Hans
 */
let id = null;
/**
 * 界面的初始化
 * @author Hans
 */
const resizeHeight = () => {

    $("#chatBox").height(document.documentElement.clientHeight);  

    $("#chatBox--input--typing").height(
        
        document.documentElement.clientHeight - $("#chatBox--output").height() - $("#chatBox--input--menu").height() -50
                
    );
}


window.onresize = () => {
    
    resizeHeight();

};

resizeHeight();


initKeyboard()
initMouse();