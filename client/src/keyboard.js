import { bubble } from './bubble.js'
import { getDOM } from './getDOM.js'


const initKeyboard = ()=> {
    $(document).keydown((event) => {
        //console.log(event.keyCode);
        if (event.keyCode == 13 && event.shiftKey) {
           // console.log("shift+enter");
        } else
        if (event.keyCode == 13) {
            event.preventDefault();
            //console.log("enter");
            if (getDOM("typing").value !== "") {
                bubble(getDOM("typing").value,1,0)
                getDOM("typing").value = "";
            }
        }
    
    });
}


export { initKeyboard }