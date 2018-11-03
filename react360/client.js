// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from 'react-360-web';
import { Location, Surface } from 'react-360-web';

// if (!window.MySocket) {
//     var io = require('socket.io-client');
//     window.MySocket = io('/Chat');
//     console.log('dddd', window.MySocket);
// }

function init(bundle, parent, options = {}) {
    const r360 = new ReactInstance(bundle, parent, {
        // Add custom options here
        fullScreen: true,
        ...options,
    });
    const locationBoxModel = new Location([-600, -200, -600], [0, 0.0, 0.0, 0]);
    const locationPodestModel = new Location([0, -400, 0], [0, 0, 0, 1]);

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


    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('space.jpg'));

    // Heck
    document.getElementById('container').style += "width: 411px; height: 631px;";

    document.getElementById('container').childNodes[0].style = "width: 411px; height: 631px;";
    document.getElementById('container').childNodes[0].childNodes[0].style = "width: 411px; height: 631px;";
}

window.React360 = { init };