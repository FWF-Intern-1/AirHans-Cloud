
const TemplateHere = () => {
    return $(`<div class="row justify-content-end m-1 w-100">
                <div id="chatBox--output--message" class="col-2 chatBox--output--message text-left bg-success">这是发送的一则消息！</div>
                <div class="chatBox--output--avator__small"></div>
                </div>`);
}

const TemplateThere= () => {
    return $(`<div class="row justify-content-start m-1 w-100">
            <div class="chatBox--output--avator__small"></div>

            <div id="chatBox--output--message" class="col-2 chatBox--output--message text-left bg-light">这是接收到的一则消息！</div>
        </div>`);
}
const bubble = (text,id,isThere) => {
    if (isThere) {
        var bubbleTemp = TemplateThere();
    } else {
        var bubbleTemp = TemplateHere();
    }
    console.log(bubbleTemp.children("#chatBox--output--message").text());
    bubbleTemp.children("#chatBox--output--message").text(text);
    bubbleTemp.appendTo("#chatBox--output");
    //console.log("执行完毕");
    
}

export { bubble }