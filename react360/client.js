// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from 'react-360-web';
import { Location, Surface } from 'react-360-web';

// if (!window.MySocket) {
//     var io = require('socket.io-client');
//     window.MySocket = io('/Chat');
//     console.log('dddd', window.MySocket);
// }

// var io = require('socket.io-client');
// var socket= io('http://127.0.0.1:4000/Chat');

// socket.emit('connection', {});
// this.socket.on('inputMessage', (data) => {
// console.log(data);
// this.setState({Chat: [...this.state.Chat, data]});
// });

var a = null;

function init(bundle, parent, options = {
    Up: (window)
}) {
    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options,
    });
    const locationChat = new Location([0, 0, 0], [0, 0, 0, 0]);
    const locationBoxModel = new Location([400, -200, -350], [0, 0.35, 0.0, 0]);
    const locationPodestModel = new Location([0, -400, 0], [0, 0, 0, 1]);
    const locationStarlightModel = new Location([400, -250, -575], [0, -0.25, 0, 1]);
    const locationSkylightModel2 = new Location([600, -300, 370], [0, 0, 0, 1]);
    // Render your app content to the default cylinder surface
    r360.renderToSurface(
        r360.createRoot('react360', {}),
        r360.getDefaultSurface()
    );
    r360.renderToLocation(
        r360.createRoot('BoxModel'),
        locationBoxModel,
    );
    r360.renderToLocation(
        r360.createRoot('PodestModel'),
        locationPodestModel,
    );
    r360.renderToLocation(
        r360.createRoot('skylightModel'),
        locationStarlightModel,
    );
    r360.renderToLocation(
        r360.createRoot('skylightModel2'),
        locationSkylightModel2,
    );

    console.log(Up);
    r360.renderToLocation(
        r360.createRoot('chatModel', {
            documentMy: Up,
            host: window.document.location.host
        }),
        r360.getDefaultSurface(),
    );
    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('space.jpg'));


}

window.React360 = { init };