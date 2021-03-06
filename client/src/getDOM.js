const getDOM = (target) => {
    switch (target) {
        case 'typing':
            return $("#chatBox--input--typing")[0];
            break;
        case 'output':
            return $("#chatBox--output")[0];
            break;
        case 'send':
            return $("#chatBox--input--button__send")[0]
            break;
    }
}

export { getDOM }