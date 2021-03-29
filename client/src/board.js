import { dataMy } from "./save.js";
import { toast } from "./toast.js";

const templateBoard = () => {
    return $(`<div class="board shadow position-absolute rounded overflow-auto">
        <div class="board--information">
            <div class="row m-0">
                <div class="board--information--avator d-flex flex-column justify-content-end">
                    
                    <div class="board--information--id">
                        ID
                    </div>
                    <div class="m-0 w-100 signature" >这里是签名哦</div>

                </div>
                
                

            </div>
            
            
        </div>
        <div class="board--output overflow-auto border-bottom">

                <div class="board--output--piece card rounded-0 border-right-0 border-left-0">
                    <div class="card-header d-flex align-items-center">
                        <div class="board--output--avator d-inline-block">
                        </div>
                        <div>模板</div>
                    </div>
                    <div class="card-body">
                        <div>模板
                        </div>

                    </div>

            </div>
        </div>
        <div class="board--input d-flex justify-content-between align-items-center mt-2">            
            <div contenteditable="true" style="cursor: text;" class="border">这里是留言哦</div>
            <button class="btn btn-primary button--boardSend d-flex align-items-center justify-content-center p-0 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-cursor" viewBox="0 0 16 16" >
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                </svg>
            </button>
        </div>`);
}


const boardShow = (e, tempBoard) => {
    tempBoard.appendTo("body");
    let judgement = judgeHeight(e, tempBoard);
    if (!judgement.value) {
        tempBoard.css({
            "top": judgement.y,
            "left": judgement.x
        })
    } else {
        tempBoard.css({
            "bottom": 0,
            "left": judgement.x
        })
    }

    tempBoard.addClass("board__show").prev().removeClass("board__show");
    setTimeout(() => {
        tempBoard.prev().remove();
    }, 1000);

}

const judgeHeight = (e, tempBoard) => {
    if (e.clientY + tempBoard.height() > document.documentElement.clientHeight) {
        return {
            x: e.clientX,
            value: true
        };
    } else {
        return {
            x: e.clientX,
            y: e.clientY,
            value: false
        };
    }
}


const setInfo = (e) => {
    // 发送id，请求图片url和username


    //console.log(e);
    let tempBoard = templateBoard().on("click", (e) => {
        e.stopPropagation();
    });
    if (e.target == $(".onlineList--me--avator")[0]) {

        // 设置元素可编辑
        tempBoard.find(".signature").attr({
            
            contenteditable: "true"
            
        });
        tempBoard.on("focusout", function (e) {
            // 保存用户编辑的签名
            console.log("hi!");
            let sig = tempBoard.find(".signature").text();

            if (sig.length > 50) {
                tempBoard.find(".signature").focus();
                toast("不可用","签名长度超出50个字符");
            } else {
                //TODO POST请求
                // axios({
                //     method:'post',
                //     url: requestUrl,
                //     data: {
                //          text: sig
                //     }
                // })
            }
            
        });
    }
    boardShow(e, tempBoard); //测试用


    $(content).removeClass();
    setTimeout(() => {
        $(content).remove();
    }, 1000);
    axios({
        method: 'post',
        url: requestUrl,
        data: {
            id: requestUrl
        }
    }).then((res) => {
        console.log(res);
        //配置res
        setComments();
    }).catch((err) => {
        console.log(error);
    })

}

const setComments = (id) => {
    // 发送id，请求该账户下对应的所有留言
    axios({
        method: 'post',
        url: requestUrl,
        data: {
            id: requestUrl
        }
    }).then((res) => {
        console.log(res);

        //配置res
        boardShow();
    }).catch((err) => {
        console.log(error);

    })
}


const templatePiece = () => {
    return $(`<div class="board--output--piece card">
                    <div class="card-header d-flex align-items-center">
                        <div class="board--output--avator d-inline-block">
                            头像
                        </div>
                        <span class="board--output--piece--id"></span>
                    </div>
                    <div class="card-body">
                        <div class="board--output--piece--text">
                        </div>

                    </div>`);
}

const addMeg = (data) => {
    let tempPiece = templatePiece();

    tempPiece.$(".board--output--piece--text").text(data.text);
    tempPiece.$(".board--output--piece--name").text(data.name);


    // TODO 对data进行操作
}


export {
    setInfo as loadBoard
}