var react360IsRuning = false;

React360.init(
    './js/index.bundle.js',
    document.getElementById('container'), {
        assetRoot: 'static_assets/',
    }
);
// window.react360Helper = () => {
//     // if (react360IsRuning) {

//     React360.init(
//         './js/index.bundle.js',
//         document.getElementById('container'), {
//             assetRoot: 'static_assets/',
//         }
//     );
//     // window.socket.emit('connection', {});

//     // }
// };

// var temp = new Promise(() => {

//     React360.init(
//         './js/index.bundle.js',
//         document.getElementById('container'), {
//             assetRoot: 'static_assets/',
//         }
//     );
// });
// temp.then(function(value) {
//     console.log(window.react360Helper);
//     debugger;
//     window.react360Helper = value;
// });