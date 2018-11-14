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
      buttonHover:{
        Background: "",
        BorderColor: ""
      }, 
      ChatPostionY: 0,
      Chat: [{
        type: "text",//type is: text || image || Video 
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame ",
        image: "",
        VideoName:  "",//MoMIdent.mp4
          play: false
        
      },{
        type: "Video",
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame",
        image: "",
        VideoName:  "MoMIdent.mp4",//MoMIdent.mp4
          play: false
        
      },{
        type: "image",
        avatar: "drawing.svg",
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing-1.svg",
        VideoName:  "MoMIdent.mp4",//MoMIdent.mp4
          play: false
        
      },
    ]
  }
  var io = require('socket.io-client');
  this.socket= io('http://127.0.0.1:4000/Chat');
  // this.socket= io( 'http://' + this.props.host + '/Chat');
  
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

      // Is a Text Output
      if( element.type == "text" && element.text !== "")
      {
      text += element.text;
      key++;

            temp.push(
     // avartar
     <View>

              <Image key={key} style={{
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
            <Text key={key}  style={{
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
              <View>
  <Image key={key}  style={{  
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
            <Text key={key}  style={{
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
          <Image key={key}  style={{
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
              <View style={{

              }}>
                <VrButton  onClick={() => this.setVideoState( number)}
                  style={{    
                    // width: 30,
                    // height : 30,
                    transform: [
                      { translate: [0, 0, 0] },
                        { scale: 1 },
                        { rotateY: 0 } 
                    ]}}>
              <Image key={key}  style={{
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
                
                  <Text key={key}  style={{
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
            display: "inlineBlock",
            backgroundColor: 'rgba(153, 220, 220, 0.5)',
            borderColor: '#66ffff',
            borderWidth: 4,
            marginBottom: 10,
          }}>{temp}</View>);
          });
  return (
  <View style={{
    display: "inlineBlock",
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
        padding: 30
      }
        
        }>
      
   
       
          {this.postChat()}
            <VrButton style={{
        width: 100,
        height: 100,
        
        borderColor: '#66ffff',
        borderWidth: 4,
        // padding: "10px",
        // backgroundColor: 'rgba(0, 255, 0, 0.7)',
        
        // borderWidth: 2,
        // padding: 20,
        // borderColor: '#66ffff',
        
        transform: [
          { translate: [520, 350, 0] },
          { scale: 1 },
          { rotateY: 0 } 
        ]
      }}  onButtonRelease={this.upButton.bind(this)}>
      <Text 
       style={{
        fontWeight: '400',
        textAlign: "center",
        width: 95,
        height: 95,
         backgroundColor: 'rgba(153, 220, 220, 0.5)',
         fontSize: 30,

        }}
      >Up</Text>
    </VrButton>
          <VrButton style={{
        width: 100,
        height: 100,
        
        borderColor: '#66ffff',
        borderWidth: 4,
        // padding: "10px",
        // backgroundColor: 'rgba(0, 255, 0, 0.7)',
        
        // borderWidth: 2,
        // padding: 20,
        // borderColor: '#66ffff',
        
        transform: [
          { translate: [520, 300, 0] },
          { scale: 1 },
          { rotateY: 0 } 
        ]
      }}  onButtonRelease={this.downButton.bind(this)}>
      <Text 
       style={{
        fontWeight: '400',
        textAlign: "center",
        width: 95,
        height: 95,
         backgroundColor: 'rgba(153, 220, 220, 0.5)',
         fontSize: 30,

        }}
      >down</Text>
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