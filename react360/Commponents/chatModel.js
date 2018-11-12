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

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ChatOnVideoPlay: false,
      ChatPostionY: 0,
      Chat: [{
        type: "text",
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame",
        image: "",
        VideoName:  "",//MoMIdent.mp4
          play: false
        
      },{
        type: "text",
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame",
        image: "",
        VideoName:  "",//MoMIdent.mp4
          play: false
        
      },{
        type: "text",
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing.svg",
        VideoName:  "",//MoMIdent.mp4
          play: false
        
      }
    ]
  }
  var io = require('socket.io-client');
  this.socket= io('http://127.0.0.1:4000/Chat');
  
  this.socket.emit('connection', {});
  this.socket.on('connectionOK', (data)=>{console.log(data)});// fix handchack

  this.postChat = this.postChat.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.setVideoState = this.setVideoState.bind(this);
    
this.socket.on('inputMessage', (data) => {
  console.log(data);
  this.setState({Chat: [...this.state.Chat, data]});
});


}
upButton(e){
  console.log(e);
  var temp = this.state.ChatPostionY + 10;
  this.setState({ChatPostionY: temp});
}
downButton(){
  var temp = this.state.ChatPostionY - 10;
  this.setState({ChatPostionY: temp});
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
      if( element.type == "text" && element.text !== "")
      {
      text += element.text;
      key++;

            temp.push(
     // avartar
              <Image key={key} style={{
                width: 30,
              // heightMin : 30,
              transform: [
                { translate: [0, 30, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]}}
              source={asset(element.avatar)}>
            <Text key={key}  style={{
                width: 300,
                // height : 30,
              backgroundColor: 'rgba(0, 0, 255, 0.4)',
              fontSize: 30,
              fontWeight: '400',
              borderWidth: 2,
              padding: 4,
              transform: [
                { translate: [30, 0, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]
          }}>
           
           {text} 
              </Text>
              </Image>);
        }

        if( element.type == "image" && element.image !== "")
        {
          key++;
          // debugger;
          temp.push(
     // avartar
  <Image key={key}  style={{  
            width: 30,
          // heightMin: 30,
          transform: [
            { translate: [0, 30, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.avatar )}>
          
          <Image key={key}  style={{
             width: 30,
          // heightMin: 30,
          transform: [
            { translate: [160, 0, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.image)}>
             <Text key={key}  style={{
                width: 300,
          // heightMin : 30,

              backgroundColor: 'rgba(0, 0, 255, 0.4)',
              fontSize: 30,
              fontWeight: '400',
              borderWidth: 2,
              padding: 4,
              transform: [
                { translate: [-130, 0, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]
          }}>
           
           {element.user + ": "} 
        
              </Text>
             
            </Image>
            </Image>
       
         

          );
          }
          if( element.type == "Video" && element.VideoName !== "")
          {
            key++;
            const number = index;
            console.log(element.VideoName);
            temp.push( 
              // this.playVideo(element.Video.name)
             
             
     // avartar              
              <Image key={key}  style={{
                width: 30, 
                // heightMin: 60,
                transform: [
                  { translate: [0, 30, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
                ]}}
                source={asset( element.avatar)}>
                
              <VrButton  onClick={() => this.setVideoState( number)}
                style={{    width: 30,
                  height : 30,
                  transform: [
                    { translate: [30, 0, 0] },
                      { scale: 1 },
                      { rotateY: 0 } 
                  ]}}>
                  <Text key={key}  style={{
                width: 400,
                // heightMin : 30,
                
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
           
           {(element.user + ": " + this.showVideo(element) )   } 
        </Text>
        {this.playVideo(element)}

        </VrButton>
        </Image>
         
              );
            }
            
            index++;
          output.push(<View style={{
            display: "inlineBlock",
            backgroundColor: 'rgba(200, 100, 0, 0.5)'}}>{temp}</View>);
          });
  return (
  <View style={{
    display: "inlineBlock",
    backgroundColor: 'rgba(20, 0, 200, 0.5)',
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
              style={{    width: 30,
                height : 30,
                transform: [
                  { translate: [160, 30, 0] },
                    { scale: 1 },
                    { rotateY: 0 } 
                ]}}/> );
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

  render() {
    return (
      <View style={{
        display: "inlineBlock",
        backgroundColor: 'rgba(200, 0, 200, 0.5)'}
        }>
      
   
       
          {this.postChat()}
          <VrButton  onButtonRelease={this.upButton.bind(this)}>
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
        { translate: [520, 400, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>up</Text>
    </VrButton>
          <VrButton  onButtonRelease={this.downButton.bind(this)}>
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
        { translate: [520, 300, 0] },
        { scale: 1 },
        { rotateY: 0 } 
    ]
}}>down</Text>
    </VrButton>
         
      </View>
    );
  }
};

// const styles = StyleSheet.create({
//   panel: {
//     display: "inlineBlock",
//   // Fill the entire surface
//     width: 1000,
//     height: 600,
//     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   greetingBox: {
//     padding: 0,
//     display: "inlineBlock",
    
//     // height: 200,
//     // backgroundColor: '#000000',
//     backgroundColor: 'rgba(255, 0, 0, 0.4)',
//     borderColor: '#639dda',
//     borderWidth: 2,
//   },
  
//   test:{
//         display: "inlineBlock",
//         margin:20    
    
//   },

//   myFontSize: {
//         display: "inlineBlock",
//         fontSize: 30,
//     backgroundColor: 'rgba(0, 0, 255, 0.4)',
//     // width: 800,
//     // height: 60,


//   },
//   img: {
 
//     backgroundColor: 'rgba(255, 0, 255, 0.4)',
//     width: 30,
//     height : 30
//   },
//   video:{
//   width: 10,
//   height: 10
//   }
// });

// AppRegistry.registerComponent('react360', () => react360);
// AppRegistry.registerComponent('BoxModel', () => BoxModel);
// AppRegistry.registerComponent('PodestModel', () => PodestModel);