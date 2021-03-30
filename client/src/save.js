//临时解决id的存储
let id = null;
const saveId = (iid) => {
    id = iid;
}
const getId = () => {
    return id;
}

//临时解决状态存储
let isPanel = true;
const isPanelChange = () => {
    if (isPanel) isPanel = false; else isPanel = true;
}

 //临时解决token的问题
 let token = null;
 const saveToken = (tokenn) => {
     token = tokenn;
 }
 const getTkoen = () => {
     return token;
 }
export { saveId, getId , saveToken , saveToken , isPanel, isPanelChange }