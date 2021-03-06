/**
 * 简化获取对象的操作
 * @param {string} target 
 * @returns 标准的DOM对象
 * @author Hans
 */
const getDOM = (target) => {
    switch (target) {
        case 'typing':
            return $("#chatBox--input--typing")[0];
            break;
        case 'output':
            return $("#chatBox--output")[0];
            break;
        case 'id' :
            return $("#chatBox--input--menu--name")[0];
            break;
        case 'userid' :
            return $("#user_id")[0];
            break;
        case 'send':
            return $("#chatBox--input--button__send")[0]
            break;
    }
}

export { getDOM }