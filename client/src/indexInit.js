$(".loginForm").on("submit",(e) => {
    e.preventDefault();
    TemplateSpinner.addClass("spinner--inButton__show").prependTo($(e.target).find("[type='submit']"));
    axios({
        method:'post',
        url: requestUrl,
        data: {
            id:requestUrl
        }
    }).then((res) => {
        console.log(res);
        TemplateSpinner.removeClass("spinner--inButton__show").remove();

    })
});

$(".signUpForm").on("submit",(e) => {
    e.preventDefault();
    TemplateSpinner.addClass("spinner--inButton__show").prependTo($(e.target).find("[type='submit']"));
    axios({
        method:'post',
        url: requestUrl,
        data: {
            id:requestUrl
        }
    }).then((res) => {
        console.log(res);
        TemplateSpinner.removeClass("spinner--inButton__show").remove();

    })
});


$(".button--captcha").on("click",(e) => {
    let tempForm = new FormData($(".signUpForm")[0]);
    e.preventDefault();
    //TODO发送验证码冷却1min
    // axios({
    //     method:'post',
    //     url: 'http://tomzhang.com.cn:7777',
    //     data: {
    //         email: tempForm.get("email")
    //     }
    // }).then((res) => {
    //     console.log(res);
    //     //TODO对res判断验证码是否发送成功
    //     // console.log("验证码发送成功");
    // });
    let sendmail = {
        "email": tempForm.get("email")
    }
    sendmail=JSON.stringify(sendmail);
    
    $.post("http://tomzhang.com.cn:7777", sendmail,
        function (data, textStatus, jqXHR) {
            console.log("success!");
        }
    );
})
$(".link--signUp").on("click",(e) => {
    e.preventDefault();
    console.log("移动");
    $(".signUpBox").addClass("signUpBox__show");
    $(".loginBox").addClass("loginBox__hidden");


});

$(".link--login").on("click", () => {
    $(".signUpBox").removeClass("signUpBox__show");
    $(".loginBox").removeClass("loginBox__hidden");


});

const TemplateSpinner = $(`<div class="spinner-border spinner--inButton" role="status">
											<span class="sr-only">加载中Loading...</span>
										</div>`)


const moveOutFormBox = () => {
    $(".formBox").appendTo("body");

}
const moveInFormBox = () => {
    $(".indexBox--right").find(".d-flex").append($(".formBox"));

}
window.onresize = () => {
    if (window.innerWidth < 576) {
        moveOutFormBox();
    } else {
        moveInFormBox();
    }

}

const arrayWords = ["chat","explore"];
const keyInWord = (word) => {
    let tempWord = "";
    let i = 0;
    let interval = setInterval(() => {
        tempWord += word[i++];
        $(".wordBox").text(tempWord);
        if (i >= word.length) {
            clearInterval(interval);
            i = 0;
        }
    }, 100);
}


const selectWord = () => {
    let i = 0;

    setInterval(() => {

        keyInWord(arrayWords[i++]); 
        if (i >= arrayWords.length) {
            i = 0;
        }
    }, 2000);
}
selectWord();
//TODO转场动画
/* 
    屏幕正上方
    Welcome Hans   先后出场顺序
    Welcome Back Hans （之后有cookie的）
    请输入您的Id^^^^，Welcome Hans
    转场动画

*/