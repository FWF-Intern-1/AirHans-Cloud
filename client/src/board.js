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

                
        </div>
        <div class="board--input d-flex justify-content-between align-items-center mt-2">            
            <div contenteditable="true" style="cursor: text;" class="border board--typing">这里是留言哦</div>
            <button class="btn btn-primary button--boardSend d-flex align-items-center justify-content-center p-0 ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="currentColor" class="bi bi-cursor" viewBox="0 0 16 16" >
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                </svg>
            </button>
        </div>`);
}

const templatePiece = () => {
    return $(`<div class="board--output--piece card rounded-0 border-right-0 border-left-0">
                    <div class="card-header d-flex align-items-center">
                        <div class="board--output--avator d-inline-block">
                        </div>
                        <div class="board--output--piece--id">模板</div>
                    </div>
                    <div class="card-body">
                        <div class="board--output--piece--text">模板
                        </div>

                    </div>

            </div>`);
}


const boardShow = (e, tempBoard) => {
    tempBoard.appendTo("body");
    
    $(".navBar__custo--button--back").removeClass("invisible");


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
    
    tempBoard.find()

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

    let tempBoard = templateBoard().on("click", (e) => {
        e.stopPropagation();
    })

    if (e.currentTarget == $(".onlineList--me--avator")[0]) {
        let id = dataMy.id;
        tempBoard.find(".board--information--id").text(id);
    
    } else {

        let id = $(e.currentTarget).next().find(".onlineList--they--id").text();
        tempBoard.find(".board--information--id").text(id);
    
    }

    tempBoard.find(".button--boardSend").on("click", () => {
        let receiver = tempBoard.find(".board--information--id").text();
        sendCom(receiver);
        //receiver暂时是是接受者的id
    });

    tempBoard.find(".board--typing").on("click",(e) => {
        $(e.target).text("");
    })


    if (e.target == $(".onlineList--me--avator")[0]) {

        // 设置当前用户签名可编辑
        tempBoard.find(".signature").attr({
            
            contenteditable: "true"
            
        }).on("focusout", function (e) {
            // 保存用户编辑的签名
            console.log("即将保存签名");
            let sig = tempBoard.find(".signature").text();

            if (sig.length > 50) {
                tempBoard.find(".signature").focus();
                toast("不可用","签名长度超出50个字符");
            } else {
                //更改当前用户签名请求
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


    // 测试用
    // let tempArr = new Array({
    //     id: "留言者1",
    //     text: "我喜欢你呀！"
    // })
    // setComments(e, tempBoard, tempArr);


    getComments(e, tempBoard);
    
    

}

const setComments = (e, tempBoard, arrData) => {

    for (const element of arrData) {
        let tempPiece = templatePiece();
        tempPiece.find(".board--output--piece--id").text(element.id);
        tempPiece.find(".board--output--piece--text").text(element.text);
    
    
        tempPiece.appendTo(tempBoard.find(".board--output"));
    }


    boardShow(e, tempBoard);

}

const getComments = (e, tempBoard) => {
    // 暂时发送id(account)，请求该账户下对应的所有留言

    console.log("即将发送获取留言请求:", JSON.stringify({
        account: $(e.target).parent().find(".onlineList--they--id").text()
    }));

    $.post("http://127.0.0.1:8082/search", JSON.stringify({
        account: $(e.target).parent().find(".onlineList--they--id").text()

    }),
        function (data, textStatus, jqXHR) {
            console.log(data);
            console.log("获取留言成功！");   
            
            let arrData = JSON.parse(data);
            setComments(tempBoard, arrData);
            
        }
    );


    // axios({
    //     method: 'post',
    //     url: "http://127.0.0.1:8082/search",
    //     data: {
    //         email: $(e.currentTarget).parent().attr("email")
    //     },

    // }).then((res) => {
    //     console.log(res);
                
    //     //配置res
    //     boardShow();
    // }).catch((err) => {
    //     console.log(error);

    // })
}


const sendCom = (receiver) => {
    let text = $(".board--typing").text();
    console.log("即将发送留言：“" + text + "”给" + receiver);
    
    $.post("http://127.0.0.1:8082", JSON.stringify({
        account : dataMy.id,
        content : text,
        receiver : receiver

    }),
        function (data, textStatus, jqXHR) {
            console.log(data);
            console.log("留言成功！");
            $(".board--typing").text("");
        }
    );
    
    // axios({
    //     method:'post',
    //     url: "http://127.0.0.1:8082",
    //     data: {
    //         content : text,
    //         email : dataMy.email,
    //         receiver : reveicer
    //     },
    // })
}


export {
    setInfo as loadBoard
}