//临时解决id的存储归宿
let id = null;
function saveId  (id) {
    id = arguments[0];
}
const getId = () => {
    return id;
}
export { saveId, getId }