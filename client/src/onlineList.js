import { loadBoard } from "./board.js";
import { clearBubble, loadBubble } from "./bubble.js";
import { dataMy, dbRead } from "./save.js";

/**
 * 在线成员列表管理
 * @author Hans
 */
const TemplatePiece = () => {
    return $(`<div id="onlineList--they" class="d-flex align-items-center border-bottom onlineList--they">
                        <div id="onlineList--they--avator" class="onlineList--they--avator"></div>
                        <div class="d-flex flex-column">
                            <div id="onlineList--they--id" class="onlineList--they--id"></div>
                        </div>
                    </div>                   
                `);
}

const onlineMy = () => {
    $("#onlineList--me--id").text(dataMy.id);
    
    //头像ID首字母
    $(".onlineList--me--avator").text(dataMy.id[0]);

}
// 头像暂且设置为ID首字母
const setAvator = (tempPiece, id) => {
    tempPiece.find(".onlineList--they--avator").text(id[0]);
}

const online = (id,email) => {
    
    // if (id == dataMy.id) return;
    //当前用户不用出现在“在线成员”中

    // let id = data.id;
    // let email = data.email;
    // let url = data.url;

    let tempPiece = TemplatePiece().attr("email",email);
    


    tempPiece.on("click", (e) => {

        e.stopPropagation();
        clearBubble();

        //小屏幕下点击列表打开聊天界面
        if (isOnlineList) {
            
            listTurn();

        }
    }).find(".onlineList--they--avator").on("click", (e) => {
        //在线成员点击头像弹出个人信息展示
        e.stopPropagation();

        $(".board__show").removeClass("board__show");
        loadBoard(e);

        $(".navBar__custo--button--back").removeClass("invisible");
        //返回按钮显示

    }).parent().on("click", (e) => {
        //在已有个人信息展示弹出的情况下，打开另一个个人信息展示
        e.stopPropagation();

        $(".onlineList--they__highLight").removeClass("onlineList--they__highLight shadow");
        $(e.currentTarget).addClass("onlineList--they__highLight shadow");
    });
    

    setAvator(tempPiece, id);

    tempPiece.appendTo(".onlineList").find("#onlineList--they--id").text(id);
    
    
    //对在线成员处的“聊天室”进行特殊处理
    if (id == "聊天室") {
        tempPiece
        .attr("id","onlineList--spec")
        .on("click", (e) => {
            $(".board__show").removeClass("board__show");

            dbRead();
            
        })
        .find(".onlineList--they--avator")
        .off("click")
        .css({
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
    //保证聊天室在首位

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
    if (isOnlineList) {
        listClose();
        
    } else  {
        listShow();

    }
}

const listCheck = () => {
    //页面宽度变化时，若列表被打开则关闭列表
    if (isOnlineList) {
        listClose();
    }
}

export { online, onlineMy, onlineClear, listTurn, listCheck }