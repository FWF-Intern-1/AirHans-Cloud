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
                    </div>`).on("click", (e) => {
                        e.stopPropagation();
                        $(".onlineList--they__highLight").removeClass("onlineList--they__highLight shadow");
                        $(e.currentTarget).addClass("onlineList--they__highLight shadow");
                        isPiece = true;
                    });
};

const onlineMy = () => {
    $("#onlineList--me--id").text(getId());

}

const online = (id) => {

    let tempPiece = TemplatePiece();
    tempPiece.appendTo(".onlineList").find("#onlineList--they--id").text(id);

    
}

const onlineClear = (id) => {
    for (const element of $(".onlineList--they")) {
        $(element).remove();
    }
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
export { online, onlineMy, onlineClear, listTurn, listCheck,isPiece }