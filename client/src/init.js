import { bubble, loadBubble } from "./bubble.js";
import { initKeyboard } from "./keyboard.js";
import { initMouse } from "./mouse.js";
import { online } from "./onlineList.js";
import { dataMy, dbAdd, dbOpen, dbRead } from "./save.js";


/**
 * 界面的初始化
 * @author Hans
 */

const init = () => {

    initKeyboard()
    initMouse();
    

    $("#onlineList--spec").click();

};

dbOpen();

export { init }