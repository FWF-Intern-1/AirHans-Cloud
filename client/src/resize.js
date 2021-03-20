import { listCheck } from "./onlineList.js";

/**
 * 响应式高度
 * @author Hans
 */
const resizeHeight = () => {
    // let heightAll = document.documentElement.clientHeight;
    // if (heightAll >= 400) {
    //     $("body").height(heightAll);
    //     let heightCal = 0.4 * heightAll -  100;
    //     $("#chatBox--input--typing").height(
            
    //         heightCal
        
    //     );        
    // }
    
}

const resizeWidth = () => {
    let widthAll = document.documentElement.clientWidth;
    if (widthAll > 576) {
        listCheck();
    }

}
/**
 * 响应式消息气泡宽度
 * @author Hans
 */
const resizeBubble = () => {
    for (const element of $(".chatBox--output--bubble")) {
        let eleJq = $(element);
        eleJq.removeClass("col-10");
        if (eleJq.width() > $("#chatBox--output--template").width()) {
        
            eleJq.addClass("col-10");

        }
    }
}

window.onresize = () => {
      
    resizeHeight();
    resizeBubble();
    resizeWidth();

};

export { resizeHeight, resizeBubble }