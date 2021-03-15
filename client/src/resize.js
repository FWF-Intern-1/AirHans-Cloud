/**
 * 响应式高度
 * @author Hans
 */
const resizeHeight = () => {

    $("#chatBox").height(document.documentElement.clientHeight);  
    $("#chatBox--input--typing").height(
        
        document.documentElement.clientHeight - $("#chatBox--output").height() - $("#chatBox--input--menu").height() -50
                
    );
    
    
}
/**
 * 响应式消息气泡宽度
 * @author Hans
 */
const resizeBubble = () => {
    //console.log($(".chatBox--output--bubble"));
    for (const element of $(".chatBox--output--bubble")) {
        let eleJq = $(element);
        eleJq.removeClass("col-10");
        //console.log(eleJq.width() + "compare with" + $("#chatBox--output--template").width());
        if (eleJq.width() > $("#chatBox--output--template").width()) {
        
            eleJq.addClass("col-10");
            //console.log("--> col");

        }
    }
}

window.onresize = () => {
    
    resizeHeight();
    resizeBubble();

};

export { resizeHeight, resizeBubble }