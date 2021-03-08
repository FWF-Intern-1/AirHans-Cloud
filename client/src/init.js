/**
 * 界面的初始化
 * @author Hans
 */
const resizeHeight = () => {

    $("#chatBox").height(document.documentElement.clientHeight);  

    $("#chatBox--input--typing").height(
        
        document.documentElement.clientHeight - $("#chatBox--output").height() - $("#chatBox--input--menu").height() -50
                
    );
}


window.onresize = () => {
    
    resizeHeight();

};

resizeHeight();


resize();
initKeyboard();
initMouse();