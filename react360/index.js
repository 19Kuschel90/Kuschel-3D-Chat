import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Video,
  VrButton
} from 'react-360';
import BoxModel from './Commponents/BoxModel';
import PodestModel from './Commponents/PodestModel';
// import Viedio from './Vidio';

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postionY: 0,
      Chat: [{
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing.svg",
        Video: {
          name: "",//MoMIdent.mp4
          play: false
        }
      },{
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing.svg",
        Video: {
          name: "",//MoMIdent.mp4
          play: false
        }
      },{
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing.svg",
        Video: {
          name: "MoMIdent.mp4",//MoMIdent.mp4
          play: false
        }
      }
    ]
  }
  var io = require('socket.io-client');
  // http://127.0.0.1:4000/Chat'
  console.log("this.props.host", 'http://' + this.props.host + '/Chat');
  this.socket= io( 'http://' + this.props.host + '/Chat');
  
  this.socket.emit('connection', {});
  this.postChat = this.postChat.bind(this);
    this.playVideo = this.playVideo.bind(this);
this.socket.on('inputMessage', (data) => {
  console.log(data);
  var temp = this.state.postionY + 40;
  this.setState({postionY: temp});
  this.setState({Chat: [...this.state.Chat, data]});
});


}

upButton(){
  var temp = this.state.postionY + 1;
 this.setState({postionY: temp});
}

downButton(){
  var temp = this.state.postionY - 1;
 this.setState({postionY: temp});
}

playVideo(state){
  if (this.state.video === false) {
    return( <VrButton  onClick={this.state[0].Video.name}>

     <Text
        style={styles.myFontSize}
        >Video click: {this.state[0].Video.name}</Text>
        </VrButton>);
} else {
    return ( <Video 
            source={{uri: '/static_assets/' + this.state[0].Video.name}}
            style={video}
        />)
}
}

postChat()
{
  let output = [];
  let postionFix = 0;
  let text = '';
  this.state.Chat.forEach(element => {
    postionFix -= 30;
    console.log(element);
    let temp = [];
    
   
      text += element.user + ": " ;
   
  
      text += element.text;
      
    
    text += '\n'; 
    text += '\n'; 

        });
  return <Text key={566}  style={{
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    fontSize: 30,
    fontWeight: '400',
    borderWidth: 2,
    padding: 2,
    transform: [
        { translate: [0, this.state.postionY, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>
    {text}

    </Text> ;
}

render() {
  return (
  <View>
    <View>

    <VrButton onClick={this.upButton.bind(this)}>
      <Text  style={{
        backgroundColor: 'rgba(0, 0, 255, 0.4)',
        fontSize: 30,
    fontWeight: '400',
    borderWidth: 2,
    padding: 2,
    transform: [
      { translate: [400, 0, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>Up</Text>
    </VrButton>
    <VrButton onClick={this.downButton.bind(this)}>
      <Text  style={{
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    fontSize: 30,
    fontWeight: '400',
    borderWidth: 2,
    padding: 2,
    transform: [
        { translate: [400, 0, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>down</Text>
    </VrButton>
      </View>
    {this.postChat()}
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  greetingBox: {
    padding: 0,
    
    // height: 200,
    // backgroundColor: '#000000',
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  
  test:{
    margin:20    
    
  },

  myFontSize: {
    fontSize: 30,
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    // width: 800,
    // height: 60,


  },
  img: {
 
    backgroundColor: 'rgba(255, 0, 255, 0.4)',
    width: 30,
    height : 30
  },
  video:{
  width: 10,
  height: 10
  }
});

AppRegistry.registerComponent('react360', () => react360);
AppRegistry.registerComponent('BoxModel', () => BoxModel);
AppRegistry.registerComponent('PodestModel', () => PodestModel);