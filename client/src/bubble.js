import { getDOM } from './getDOM.js'
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



const bubble = (text,id,isThere) => {
    if (isThere) {
        var bubbleTemp = TemplateThere();
    } else {
        var bubbleTemp = TemplateHere();
    }
    bubbleTemp.children("#chatBox--output--message").text(text);
    console.log(bubbleTemp.children("#chatBox--output--message").text());
    bubbleTemp.appendTo("#chatBox--output");

    $("#chatBox--output").scrollTop(getDOM("output").scrollHeight);
    //console.log("bubble()执行完毕");
    
}

export { bubble }