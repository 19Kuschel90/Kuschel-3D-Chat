import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Message: ["Welcome"]
    }
    var io = require('socket.io-client');
    this.socket = io('http://localhost:3000/Chat');
    this.socket.emit('connection', {});
    this.postMessage = this.postMessage.bind(this);
this.socket.on('inputMessage', (data) => {

  this.setState({Message: [...this.state.Message, data.message]})
});
}



postMessage()
{
  var output = [];
  this.state.Message.forEach(element => {
  output.push( <Text style={styles.greeting}>
    {element}
  </Text>);
    
  });
  return (
  <View>
    {output}
  </View>
  );
}

  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
        <Text style={styles.greeting}>
    Welcome to React 360{"dasd"}
  </Text>
          {this.postMessage()}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('react360', () => react360);
