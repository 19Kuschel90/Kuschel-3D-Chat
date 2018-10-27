var react360IsRuning = false;
window.react360Helper = () => {
    // if (react360IsRuning) {

    React360.init(
        './js/index.bundle.js',
        document.getElementById('container'), {
            assetRoot: 'static_assets/',
        }
    );
    // window.socket.emit('connection', {});

    // }
};