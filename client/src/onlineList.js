import { loadBoard } from "./board.js";
import { clearBuble } from "./bubble.js";
import { getId } from "./save.js";

/**
 * 在线成员列表管理
 * @author Hans
 */
const TemplatePiece = () => {
    return $(`<div id="onlineList--they" class="d-flex align-items-center border-bottom onlineList--they">
                        <div id="onlineList--they--avator" class="onlineList--they--avator">头像</div>
                        <div class="d-flex flex-column">
                            <div id="onlineList--they--id" class="onlineList--they--id"></div>
                        </div>
                    </div>                   
                `);
}

const onlineMy = () => {
    $("#onlineList--me--id").text(getId());

}

const online = (id) => {

    let tempPiece = TemplatePiece();

    tempPiece.on("click", (e) => {

        e.stopPropagation();

        clearBuble();

    }).find(".onlineList--they--avator").on("click", (e) => {
        e.stopPropagation();

        $(".board__show").removeClass("board__show");
        loadBoard(e);

    }).parent().on("click", (e) => {
            e.stopPropagation();

            $(".onlineList--they__highLight").removeClass("onlineList--they__highLight shadow");
            $(e.currentTarget).addClass("onlineList--they__highLight shadow");
        });
    

    
    tempPiece.appendTo(".onlineList").find("#onlineList--they--id").text(id);
    
    
    
    if (id == "聊天室") {
        tempPiece.find(".onlineList--they--avator").off("click").css({
            "cursor": "default"
        });
    }

    
}
online("聊天室");

const onlineClear = (id) => {
    for (const element of $(".onlineList--they")) {
        $(element).remove();
    }
    online("聊天室");

}
let isOnlineList = false;

const listShow = () => {
    $(".onlineList").addClass("onlineListShow");
    $("#chatBox").addClass("invisible");
    isOnlineList = true;
}

const listClose = () => {
    $(".onlineList").removeClass("onlineListShow");
    $("#chatBox").removeClass("invisible");
    isOnlineList = false;
}

const listTurn = () => {
    if (!isOnlineList) {
        listShow();
        
    } else  {
        listClose();

    }
}

const listCheck = () => {
    if (isOnlineList) {
        listClose();
    }
}

// TODO打开新的会话框
const newSession = (data) => {
    switch (data.code) {
        case 1:
            //聊天室
            
            break;
        case 2:
            //单聊

            break;

    }
    
    
}
export { online, onlineMy, onlineClear, listTurn, listCheck }