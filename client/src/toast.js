/**
 * 弹窗提示
 * @author Hans
 */


/**
 * 生成新的弹窗对象，使用bootstrap现成的toast
 * @returns 新的弹窗对象
 * @author Hans
 */
const TemplateToast = () => {
    return $(`<div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div class="toast-header">
                <strong class="mr-auto"></strong>
                <small></small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                
            </div>
        </div>`);
}

/**
 * 弹窗，需要传入文本
 * @param {string} title 
 * @param {string} text 
 */
const toast = (title,text)=> {
    let tempToast = TemplateToast();
    tempToast.find("strong").text(title);
    tempToast.find(".toast-body").text(text);
    tempToast.appendTo($("#container--toast")).toast("show");

    //console.log("toast调用完毕")
}


export { toast }
