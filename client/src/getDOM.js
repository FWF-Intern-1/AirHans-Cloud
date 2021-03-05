const getDOM = (target) => {
    switch (target) {
        case 'typing':
            console.log($("#chatBox--input--typing")[0]);
            break;
    }
}

export { getDOM }