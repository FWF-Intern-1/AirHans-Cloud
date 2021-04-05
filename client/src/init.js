import { bubble, loadBubble } from "./bubble.js";
import { initKeyboard } from "./keyboard.js";
import { initMouse } from "./mouse.js";
import { online, onlineMy } from "./onlineList.js";
import { dataMy, dbAdd, dbOpen, dbRead } from "./save.js";
import { newWs } from "./websocket.js";


/**
 * 界面的初始化
 * @author Hans
 */

const init = () => {

    initKeyboard()
    initMouse();
    
    newWs();

    $("#onlineList--spec").click();

    onlineMy();
};

dbOpen();

export { init }