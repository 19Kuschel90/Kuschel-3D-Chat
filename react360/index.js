import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Video,
  VrButton,
  VrHeadModel
} from 'react-360';
import BoxModel from './Commponents/BoxModel';
import skylightModel2 from './Commponents/skylightModel2';
import PodestModel from './Commponents/PodestModel';
import skylightModel from './Commponents/skylightModel';
import chatModel from './Commponents/chatModel';
//chatModel

// import Viedio from './Vidio';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
}


render() {

  return (
  <View>

  </View>


    );  
  }
};



AppRegistry.registerComponent('react360', () => react360);
AppRegistry.registerComponent('BoxModel', () => BoxModel);
AppRegistry.registerComponent('skylightModel2', () => skylightModel2);
AppRegistry.registerComponent('PodestModel', () => PodestModel);
AppRegistry.registerComponent('skylightModel', () => skylightModel);
AppRegistry.registerComponent('chatModel', () => chatModel);

//BoxModel2