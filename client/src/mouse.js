import { loadBoard } from "./board.js";
import { getDOM } from "./getDOM.js";
import { listTurn } from "./onlineList.js";
import { saveId, getId, isPanel, isPanelChange } from "./save.js";
import { sendMsg, newWs} from "./websocket.js";
//import { save } from "./save.js"

/**
 * 对鼠标输入事件的响应
 * @author Hans
 */



const initMouse = ()=> {
    $(document).on("click", (e) => {

        $(".board__show").removeClass("board__show");
        

        if (e.target == getDOM("send")) {
            e.stopPropagation();
            if (getDOM("typing").value !== "") {
                sendMsg(getId(),getDOM("typing").value);
                getDOM("typing").value="";
                
            }

        }
    });
}
$(getDOM("button--list")).on("click", () => {
    listTurn();
});

$(".onlineList--me--avator").on("click", (e) => {
    e.stopPropagation();
    loadBoard(e);
});


$(".button--idConfirm").on("click", (e) => {
    e.stopPropagation();
    if (isPanel) {
        let id = getDOM("userid").value;
        
        if (id) {
            saveId(id);
            newWs();
            isPanelChange();
        } else {
            console.log("未输入id");
        }

    } 


})


export { initMouse }