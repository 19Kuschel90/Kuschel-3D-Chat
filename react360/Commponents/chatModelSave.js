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

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      aov: VrHeadModel.rotation(),
      postionY: 0,
      Chat: [{
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing.svg",
        Video: {
          name: "",//MoMIdent.mp4
          play: false
        },
      }
    ]

    
  }
  console.log("wqee");
  RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {  
    // Log what event is happening
    this.setState({
      aov: VrHeadModel.rotation()  //replaceState
  });
});
console.log(this.state.aov);

  
  var io = require('socket.io-client');
  // http://127.0.0.1:4000/Chat'
  // console.log("this.props.host", 'http://' + this.props.host + '/Chat');
  this.socket= io( 'http://127.0.0.1:4000/Chat');
  // this.socket= io( 'http://' + this.props.host + '/Chat');
  
  this.socket.emit('connection', {});
  this.postChat = this.postChat.bind(this);
this.socket.on('inputMessage', (data) => {
  // console.log(data);
  var temp = this.state.postionY + 40;
  this.setState({postionY: temp});
  this.setState({Chat: [...this.state.Chat, data]});
});

}

componentDidMount(){
    
    //  console.log(this.props.documentMy);
   
    // this.props.documentMy = this.upButton();
}

upButton(){
console.log("wee");

  var temp = this.state.postionY + 10;
 this.setState({postionY: temp});
}

downButton(){
console.log("wee");
  var temp = this.state.postionY - 10;
 this.setState({postionY: temp});
}



postChat()
{
  let output = [];
  let postionFix = 0;
  let text = '';
  this.state.Chat.forEach(element => {
    postionFix -= 30;
    // console.log(element);
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
    padding: 4,
    transform: [
      { translate: [0, 0, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>
    {text}

    </Text> ;
}

restCamera(){
  console.log("rest");
  console.log(this.state.aov[0].toFixed(0));
	console.log(this.state.aov[1].toFixed(0));
  console.log(this.state.aov[2].toFixed(0));
}

render() {
  // console.log("rest");

	// console.log(this.state.aov);
	// console.log(this.state.aov);
  return (
  <View  style={{
    display: "inlineBlock",
    backgroundColor: 'rgba(200, 0, 200, 0.5)'}}> 
  <View   style={{
    
        backgroundColor: 'rgba(200, 0, 0, 0.4)',
        width: 500,
        height: 500,
        transform: [
          { translate: [0, 0, 0] },
            { scale: 1 },
            { rotateY: 0 } 
        ]
}} > 
    {this.postChat()}
    </View>

    <View style={{
      
        backgroundColor: 'rgba(0, 100, 0, 0.4)',
        width: 100,
        height: 100,
        transform: [
          { translate: [0, 0, 0] },
            { scale: 1 },
            { rotateY: 0 } 
        ]
}} >
    <VrButton onButtonRelease={this.upButton.bind(this)}>
      <Text  style={{
        backgroundColor: 'rgba(0, 0, 255, 0.4)',
        fontSize: 30,
    fontWeight: '400',
    borderWidth: 2,
    padding: 2,
    transform: [
      { translate: [0, 0, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>Up</Text>
    </VrButton>
    <VrButton onButtonRelease={this.downButton.bind(this)}>
      <Text  style={{
        width: 100,
        height: 100,
        textAlign: "center",
        // padding: "10px",
    backgroundColor: 'rgba(0, 0, 255, 0.4)',
    fontSize: 30,
    fontWeight: '400',
    borderWidth: 2,
    padding: 2,
    transform: [
        { translate: [0, 0, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>down</Text>
    </VrButton>
      </View>
  </View>


    );  
  }
};