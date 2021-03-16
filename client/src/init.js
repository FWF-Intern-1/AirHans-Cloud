import { initKeyboard } from "./keyboard.js";
import { initMouse } from "./mouse.js";
import { online } from "./onlineList.js";
import { panel } from "./panel.js";
import { resizeHeight } from "./resize.js";


/**
 * 界面的初始化
 * @author Hans
 */
resizeHeight();
initKeyboard()
initMouse();


//panel();//测试用
//online("123");
//online("123123");
// offline("123");