const getDOM = (target) => {
    switch (target) {
        case 'typing':
            return $("#chatBox--input--typing")[0];
            break;
    }
}

export { getDOM }