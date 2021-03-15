/**
 * 在线成员列表管理
 * @author Hans
 */
const TemplatePiece = () => {
    return $(`<div id="onlineList--they" class="d-flex align-items-center border-bottom border-dark">
                        <div id="onlineList--they--avator" class="onlineList--they--avator">头像</div>
                        <div class="d-flex flex-column">
                            <div id="onlineList--they--id" class="onlineList--they--id"></div>
                        </div>
                    </div>`)
};

const online = (id) => {
    let tempPiece = TemplatePiece();
    tempPiece.appendTo(".onlineList").find("#onlineList--they--id").text(id);
}

const offline = (id) => {
    for (const element of $(".onlineList").find(".onlineList--they--id")) {
        if ($(element).text() == id) {
            $(element).parent().parent().remove();
        }
    };
}

export { online, offline }