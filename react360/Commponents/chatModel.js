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

// import Viedio from './Vidio';
// var SocketIOFileUpload = require('socketio-file-upload');
export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ChatOnVideoPlay: false,
      ChatPostionY: 0,
      ChatPostionYMax: 0,
      newInputInterval: null,
      newInputIntervalIsRunnig: false,
      newInputIntervalSwapState: false,
      newInputIntervalState: false,
      buttonSwap: 'rgba(153, 220, 220, 0.5)',
      buttonSwapBySwap: 'rgba(15, 255, 55, 0.5)',
      buttonSwapOR: 'rgba(153, 220, 220, 0.5)',
      buttonUpDownORColor:  'rgba(153, 220, 220, 0.5)',
      buttonUpDownHoverColor:  'rgba(15, 255, 55,0.5)',
      buttonUpNowColor:  'rrgba(153, 220, 220, 0.5)',
      buttonDownNowColor:  'rrgba(153, 220, 220, 0.5)',

      Chat: [{
        type: "text",//type is: text || image || Video 
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame ",
        image: "",
        VideoName:  "",//MoMIdent.mp4
          play: false
        
      }

    ]
  }
  var othis = this;
  var io = require('socket.io-client');
  // this.socket= io('http://127.0.0.1:4000/Chat');
  
  // io.origins("your_domain:port www.your_domain:port your_IP:port your_domain:*")
  this.socket= io( 'http://' + this.props.host + '/Chat');
  // this.socket.on('connect', function () {
  //   console.log('connected!');
  //   socket.emit('greet', { msg: '1' });
  // });
  this.socket.emit('connection', {});
    setInterval(()=> {
      othis.socket.emit('One',{msg: "One"})
  }, 2000);
  this.socket.on('Two',(data) => {console.log(data.msg)});
  // this.socket.on('connectionOK', (data)=>{console.log(data)});// fix handchack
  // this.socket.on('respond', function (data) {
  //   console.log(data);
  // });
  this.postChat = this.postChat.bind(this);
    this.playVideo = this.playVideo.bind(this);//mouseEnterButton

    this.mouseEnterButtonUp = this.mouseEnterButtonUp.bind(this);
    this.mouseExitButtonUp = this.mouseExitButtonUp.bind(this);
    
    this.mouseEnterButtonDown = this.mouseEnterButtonDown.bind(this);
    this.mouseExitButtonDown = this.mouseExitButtonDown.bind(this);


    this.mouseEnterButtonToEnd = this.mouseEnterButtonToEnd.bind(this);
    this.mouseExitButtonToEnd = this.mouseExitButtonToEnd.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.setVideoState = this.setVideoState.bind(this);
    this.newInputIntervalStartStop = this.newInputIntervalStartStop.bind(this);
    this.swapColor = this.swapColor.bind(this);
    
this.socket.on('inputMessage', (data) => {
  console.log(data);
  this.setState({Chat: [...this.state.Chat, data]});
  let maxChatYPos = 0;
  this.state.Chat.map((x) => {
    
    if(x.type == 'text'){
      maxChatYPos += 52;
    }else if(x.type == 'Video'){
        maxChatYPos += 230;

    }else if(x.type == 'image'){
        maxChatYPos += 300;
    }
  });
 this.setState({ChatPostionYMax: maxChatYPos});
 if(this.state.newInputIntervalIsRunnig == false){
 this.newInputIntervalStartStop();
 }
 
 console.log(data);
});

}

swapColor(){
  if(this.state.newInputIntervalSwapState)
  { 
    this.setState({buttonSwap: this.state.buttonSwapBySwap});
    this.setState({newInputIntervalSwapState: false});
  }else{
    this.setState({buttonSwap: this.state.buttonSwapOR});
    this.setState({newInputIntervalSwapState: true});    
  }
}

componentDidMount(){
  // this.newInputIntervalStartStop();  
}

newInputIntervalStartStop(){
  if(this.state.newInputIntervalIsRunnig){
    // Interval Off
    clearInterval(this.state.newInputInterval);
    this.setState({newInputIntervalIsRunnig: false});
  }else{// Interval ON
    var temp = setInterval(() => {this.swapColor()}, 1000);
    this.setState({newInputInterval: temp});
    this.setState({newInputIntervalIsRunnig: true});
  }
}

upButton(e){
  var temp = this.state.ChatPostionY + 10;
  this.setState({ChatPostionY: temp});
  console.log(this.state.ChatPostionY);
}
downButton(){
  var temp = this.state.ChatPostionY - 10;
  this.setState({ChatPostionY: temp});
  console.log(this.state.ChatPostionY);
}


postChat()
{
  let output = [];
  let key = 0;
  let index = 0;
  this.state.Chat.forEach(element => {
    // console.log(element);
    let temp = [];
    let text = '';
    key++;
    if(element.user !== "")
    {
      text += element.user + ": ";
   
    {element.user + ": "}

      }

      // Is a Text Output
      if( element.type == "text" && element.text !== "")
      {
        
      text += element.text;
      key++;

            temp.push(
     // avartar
     <View key={key}>

              <Image  style={{
                width: 50,
                height: 50,
                padding: 2,
                margin: 5,
                borderRadius: 50,
      
                transform: [
                { translate: [0, 0, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]}}
              source={asset(element.avatar)}>
              </Image>
            <Text  style={{
                width: 300,
                // height : 30,
              // backgroundColor: 'rgba(0, 0, 255, 0.4)',
              fontSize: 35,
              fontWeight: '400',
              
              // borderWidth: 2,
              // padding: 4,
              transform: [
                { translate: [60, 50, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]
          }}>
           {text} 
              </Text>
              </View>
              );
        }

        // Is a Image
        if( element.type == "image" && element.image !== "")
        {
          key++;
          // debugger;
          temp.push(
            // avartar
              <View key={key}>
  <Image   style={{  
            width: 50,
          height: 50,
          borderRadius: 50,
          transform: [
            { translate: [0, 0, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.avatar )}>
            </Image>
            <Text  style={{
                width: 300,
          // heightMin : 30,

              // backgroundColor: 'rgba(0, 0, 255, 0.4)',
              fontSize: 30,
              fontWeight: '400',
              borderWidth: 2,
              // padding: 4,
              transform: [
                { translate: [60, 50, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]
          }}>
             {element.user + ": "} 
        
        </Text>
          <Image style={{
             width: 250,
          height: 250,
          transform: [
            { translate: [200, 50, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.image)}>
            </Image>            
            </View>
          );
          }

          // Is a Video
          if( element.type == "Video" && element.VideoName !== "")
          {
            key++;
            const number = index;
            console.log(element.VideoName);
            temp.push( 
              // this.playVideo(element.Video.name)
             
     // avartar              
              <View key={key} >
                <VrButton  onClick={() => this.setVideoState( number)}
                  style={{    
                    // width: 30,
                    // height : 30,
                    transform: [
                      { translate: [0, 0, 0] },
                        { scale: 1 },
                        { rotateY: 0 } 
                    ]}}>
              <Image  style={{
                width: 50,
                height: 50,
                padding: 2,
                margin: 5,
                borderRadius: 50,
                transform: [
                { translate: [0, 0, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]}}
                source={asset( element.avatar)}>
        </Image>
                
                  <Text style={{
                width: 300,
                // height : 30,
              // backgroundColor: 'rgba(0, 0, 255, 0.4)',
              fontSize: 35,
              fontWeight: '400',
              
              // borderWidth: 2,
              // padding: 4,
              transform: [
                { translate: [60, 50, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]
          }}>
           
           {(element.user + ": \n (click to Play) " + this.showVideo(element) )   } 
        </Text>
        {this.playVideo(element)}

        </VrButton>
        </View>
              );
            }
            
            index++;
            // is one Post
          output.push(<View style={{
            // display: "inlineBlock",
            backgroundColor: 'rgba(153, 220, 220, 0.5)',
            borderColor: '#66ffff',
            borderWidth: 4,
            marginBottom: 10,
          }}>{temp}</View>);
          });
  return (
  <View style={{
    // display: "inlineBlock",
    // backgroundColor: 'rgba(20, 0, 200, 0.5)',
    // padding: 40,
    width: 500,
        height: 500,
        transform: [
          { translate: [0, this.state.ChatPostionY, 0] },
            { scale: 1 },
            { rotateY: 0 } 
        ]
    }}>
    {output}
  </View>
  );
}

setVideoState(index){
  index = index ;
  var temp = this.state.Chat;
  
  console.log(temp);
  if( temp[index].play){
    temp[index].play =  false;
  }else{
    temp[index].play =  true;
  }
temp = temp.map((x,number)=> {
  console.log(index);
  if(number != index){
    x.play = x.play = false;
  return  x;
  }else{
    return x;
  }
});
console.log(temp);
  this.setState({Chat: temp});

  console.log(this.state.Chat );
}

playVideo(element){
  if(element.play){
  return(

    <Video 
              source={asset( element.VideoName)}//MoMIdent.mp4
              style={{    width: 250,
                height : 250,
                transform: [
                  { translate: [55, 50, 0] },
                    { scale: 1 },
                    { rotateY: 0 } 
                ]}}></Video> );
  }else{
   return;
  }
}

showVideo( element){
  if(element.play){
    return '';
  }else{
    return element.VideoName;
  }
}

setToEnd(){
  this.setState({ChatPostionY: this.state.ChatPostionYMax});
  
  this.setState({buttonSwap: this.state.buttonSwapOR});
  if(this.state.newInputIntervalIsRunnig == true){
 this.newInputIntervalStartStop();
  }
}

mouseEnterButtonUp(e){

  console.log("endter");
  console.log(e);
  this.setState({buttonUpNowColor: this.state.buttonUpDownHoverColor});
}

mouseExitButtonUp(){
  console.log("onExit");
  this.setState({buttonUpNowColor: this.state.buttonUpDownORColor});

}
mouseEnterButtonDown(){
  console.log("endter");
  this.setState({buttonDownNowColor: this.state.buttonUpDownHoverColor});
}

mouseExitButtonDown(){
  console.log("onExit");
  this.setState({buttonDownNowColor: this.state.buttonUpDownORColor});

}
mouseEnterButtonToEnd(){
  console.log("endter");
  this.setState({buttonSwap: this.state.buttonUpDownHoverColor});
}
mouseExitButtonToEnd(){
  console.log("endter");
  this.setState({buttonSwap: this.state.buttonUpDownORColor});
}



  render() {
    return (
      <View style={{
        // display: "inlineBlock",
        padding: 30
      }
        
        }>
          {this.postChat()}
            <VrButton onEnter={this.mouseEnterButtonUp}  onExit={this.mouseExitButtonUp} style={{
        width: 200,
        height: 200,
        
        borderColor: '#66ffff',
        borderWidth: 4,
        // padding: "10px",
        // backgroundColor: 'rgba(0, 255, 0, 0.7)',
        
        // borderWidth: 2,
        // padding: 20,
        // borderColor: '#66ffff',
        
        transform: [
          { translate: [520, 530, 0] },
          { scale: 1 },
          { rotateY: 0 } 
        ]
      }}  onButtonRelease={this.upButton.bind(this)}>
      <Text 
       style={{
        fontWeight: '400',
        textAlign: "center",
        width: 200,
        height: 200,
         backgroundColor: this.state.buttonUpNowColor,
         fontSize: 30,

        }}
      >Up</Text>
    </VrButton>
          <VrButton onEnter={this.mouseEnterButtonDown}  onExit={this.mouseExitButtonDown} style={{
        width: 200,
        height: 200,
        
        borderColor: '#66ffff',
        borderWidth: 4,
        // padding: "10px",
        // backgroundColor: 'rgba(0, 255, 0, 0.7)',
        
        // borderWidth: 2,
        // padding: 20,
        // borderColor: '#66ffff',
        
        transform: [
          { translate: [520, 530, 0] },
          { scale: 1 },
          { rotateY: 0 } 
        ]
      }}  onButtonRelease={this.downButton.bind(this)}>
      <Text 
       style={{
        fontWeight: '400',
        textAlign: "center",
        width: 200,
        height: 200,
         backgroundColor: this.state.buttonDownNowColor,
         fontSize: 30,

        }}
      >down</Text>
    </VrButton>
          <VrButton onEnter={this.mouseEnterButtonToEnd}  onExit={this.mouseExitButtonToEnd} style={{
        width: 200,
        height: 200,
        
        borderColor: '#66ffff',
        borderWidth: 4,
        // padding: "10px",
        // backgroundColor: 'rgba(0, 255, 0, 0.7)',
        
        // borderWidth: 2,
        // padding: 20,
        // borderColor: '#66ffff',
        
        transform: [
          { translate: [520, 530, 0] },
          { scale: 1 },
          { rotateY: 0 } 
        ]
      }}  onButtonRelease={this.setToEnd.bind(this)}>
      <Text 
       style={{
        fontWeight: '400',
        textAlign: "center",
        width: 200,
        height: 200,
         backgroundColor: this.state.buttonSwap,
         fontSize: 30,

        }}
      >To End</Text>
    </VrButton>
      </View>
    );
  }
};

// const styles = StyleSheet.create({
//   button: {
//     // display: "inlineBlock",
//   // Fill the entire surface
 
//     backgroundColor: 'rgba(0, 200, 255, 1)',
//     // justifyContent: 'center',
//     borderColor: '#639dda',
//     borderWidth: 2,
//     // alignItems: 'center',
//   },
//   panel:{
    
  // }
  // greetingBox: {
  //   padding: 0,
  //   display: "inlineBlock",
    
  //   // height: 200,
  //   // backgroundColor: '#000000',
  //   backgroundColor: 'rgba(255, 0, 0, 0.4)',
  //   borderColor: '#639dda',
  //   borderWidth: 2,
  // },
  
  // test:{
  //       display: "inlineBlock",
  //       margin:20    
    
  // },

  // myFontSize: {
  //       display: "inlineBlock",
  //       fontSize: 30,
  //   backgroundColor: 'rgba(0, 0, 255, 0.4)',
  //   // width: 800,
  //   // height: 60,


  // },
  // img: {
 
  //   backgroundColor: 'rgba(255, 0, 255, 0.4)',
  //   width: 30,
  //   height : 30
  // },
  // video:{
  // width: 10,
  // height: 10
  // }
// });

// AppRegistry.registerComponent('react360', () => react360);
// AppRegistry.registerComponent('BoxModel', () => BoxModel);
// AppRegistry.registerComponent('PodestModel', () => PodestModel);