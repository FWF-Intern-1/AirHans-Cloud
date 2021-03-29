import { loadBoard } from "./board.js";
import { getDOM } from "./getDOM.js";
import { listTurn } from "./onlineList.js";
import { dataMy } from "./save.js"
import { sendMsg, newWs} from "./websocket.js";

/**
 * 对鼠标输入事件的响应
 * @author Hans
 */



const initMouse = ()=> {
    $(document).on("click", (e) => {

        $(".board__show").removeClass("board__show");
        //点击任意处关闭个人信息展示

        if (e.target == getDOM("send")) {
            
            //点击发送按钮发送消息

            e.stopPropagation();

            if (getDOM("typing").value !== "") {

                sendMsg(dataMy.id,getDOM("typing").value);
                getDOM("typing").value="";
                
            }

        }
    });
}


$(getDOM("button--list")).on("click", () => {

    //button--list包含多个元素，在document检测target不合适
    listTurn();

});

$(".onlineList--me--avator").on("click", (e) => {

    e.stopPropagation();
    loadBoard(e);
    
});



export { initMouse }