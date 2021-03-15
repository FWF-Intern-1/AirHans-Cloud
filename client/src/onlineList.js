import { getId } from "./save.js";

/**
 * 在线成员列表管理
 * @author Hans
 */
const TemplatePiece = () => {
    return $(`<div id="onlineList--they" class="d-flex align-items-center border-bottom border-dark">
                        <div id="onlineList--they--avator" class="onlineList--they--avator">头像</div>
                        <div class="d-flex flex-column">
                            <div id="onlineList--they--id" class="onlineList--they--id"></div>
                        </div>
                    </div>`)
};

const onlineMy = () => {
    $("#onlineList--me--id").text(getId());

}

const online = (id) => {

    let tempPiece = TemplatePiece();
    tempPiece.appendTo(".onlineList").find("#onlineList--they--id").text(id);

    
}

const offline = (id) => {
    for (const element of $(".onlineList").find(".onlineList--they--id")) {
        if ($(element).text() == id) {
            $(element).parent().parent().remove();
        }
    };
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
export { online, onlineMy, offline, listTurn, listCheck }