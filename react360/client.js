// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from 'react-360-web';
import { Location, Surface } from 'react-360-web';


var a = null;

function init(bundle, parent, options = {}) {
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
    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('space.jpg'));
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

    r360.renderToLocation(
        r360.createRoot('chatModel', {

            host: window.document.location.host
        }),
        r360.getDefaultSurface(),
    );


}

window.React360 = { init };