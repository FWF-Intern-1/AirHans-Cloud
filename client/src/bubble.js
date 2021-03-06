import { getDOM } from './getDOM.js'
/**
 * 返回新的消息气泡对象
 * @returns jQuery对象
 * @author Hans
 */
const TemplateHere = () => {
    return $(`<div class="row mt-1">
                    <div class="chatBox--space">

                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-header container text-right">
                                <span>id</span>
                                <span>time</span>
                                <div class="chatBox--output--arrow__right border-bottom-0 border-left-0"></div>
                            </div>
                            <div id="chatBox--output--message" class="card-body">some tex <br> t</div>
                        </div>
                    </div>
                    <div class="chatBox--output--avator__normal">
                        right
                    </div>
                </div>`);
}

const TemplateThere= () => {
    return $(`<div class="row mt-1">
                    <div class="chatBox--output--avator__normal">
                        left
                    </div>
                    <div class="col">
                        <div class="card">
                            <div class="card-header container">
                                <div class="chatBox--output--arrow__left border-top-0 border-right-0"></div>
                                <span>id</span>
                                <span>time</span>
                            </div>
                            <div id="chatBox--output--message" class="card-body">some tex <br> t</div>
                        </div>
                    </div>
                    <div class="chatBox--space">
                        
                    </div>
                </div>`);
}


/**
 * 在聊天界面输出框中添加消息气泡
 * @param {string} text 
 * @param {string} id 
 * @param {boolean} isThere 
 * @author Hans
 */
const bubble = (text,id,isThere) => {
    if (isThere) {
        var bubbleTemp = TemplateThere();
    } else {
        var bubbleTemp = TemplateHere();
    }
    //console.log(bubbleTemp.find("#chatBox--output--message"));
    bubbleTemp.find("#chatBox--output--message").text(text);

    bubbleTemp.appendTo("#chatBox--output");

    $("#chatBox--output").scrollTop(getDOM("output").scrollHeight);
    //console.log("bubble()执行完毕");
    
}

export { bubble }