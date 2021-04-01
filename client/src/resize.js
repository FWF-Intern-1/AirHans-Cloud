import { listCheck } from "./onlineList.js";

const resizeWidth = () => {
    let widthAll = document.documentElement.clientWidth;
    if (widthAll > 576) {
        listCheck();

        $(".navBar__custo--button--back").addClass("invisible");

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
      
    resizeBubble();
    resizeWidth();

};

export { resizeBubble }