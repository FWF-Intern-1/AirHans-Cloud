/**
 * 与服务器失去连接时，在最上层显示pannel，阻止用户使用
 * @author Hans
 */
const panel = () => {
    $("#panel").fadeToggle(300);
    //console.log("panel()被调用！");
}

export { panel }