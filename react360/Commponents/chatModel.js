import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Video
} from 'react-360';

// import Viedio from './Vidio';

export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Chat: [{
        user: "Hello Bot",
        text: "Welcame",
        image: "",
        Video: {
          name: "",//MoMIdent.mp4
          play: false
        }
      },{
        user: "Hello Bot",
        text: "Welcame",
        image: "",
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
      }
    ]
  }
  var io = require('socket.io-client');
  this.socket= io('http://127.0.0.1:4000/Chat');
  
  this.socket.emit('connection', {});
  this.postChat = this.postChat.bind(this);
    this.playVideo = this.playVideo.bind(this);
this.socket.on('inputMessage', (data) => {
  console.log(data);
  this.setState({Chat: [...this.state.Chat, data]});
});


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
  let key = 0;
  this.state.Chat.forEach(element => {
    console.log(element);
    let temp = [];
    let text = '';
    key++;
    if(element.user !== "")
    {
      text += element.user + ": ";
   
    {element.user + ": "}

      }
      if(element.text !== "")
      {
      text += element.text;
      key++;

            temp.push(
              <Image key={key} style={{
                width: 30,
              heightMin : 30,
              transform: [
                { translate: [0, 30, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]}}
              source={asset("drawing.svg")}>
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

        if(element.image !== "")
        {
          key++;
          // debugger;
          temp.push(
     
  <Image key={key}  style={{  
            width: 30,
          heightMin: 30,
          transform: [
            { translate: [0, 30, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.image)}>
          
          <Image key={key}  style={{
             width: 30,
          heightMin: 30,
          transform: [
            { translate: [160, 0, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.image)}>
             <Text key={key}  style={{
                width: 300,
          heightMin : 30,

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
          if( element.Video.name !== "")
          {
            key++;
            console.log(element.Video.name);
            temp.push( 
              // this.playVideo(element.Video.name)
              <View  style={{  
                width: 30,
              heightMin: 30,
              transform: [
                { translate: [0, 0, 0] },
                  { scale: 1 },
                  { rotateY: 0 } 
              ]}}>

              <Video 
              source={asset( element.Video.name)}//MoMIdent.mp4
              style={{    width: 30,
                height : 30,
                transform: [
                  { translate: [160, 0, 0] },
                    { scale: 1 },
                    { rotateY: 0 } 
                ]}}>
 <Image key={key}  style={{
             width: 30,
          heightMin: 30,
          transform: [
            { translate: [0, 0, 0] },
              { scale: 1 },
              { rotateY: 0 } 
          ]}}
            source={asset( element.image)}>
                  <Text key={key}  style={{
                width: 300,
          heightMin : 30,

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
                </Video>       
                </View>
              );
            }
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
    }}>
    {output}
  </View>
  );
}

  render() {
    return (
      <View style={{
        display: "inlineBlock",
        backgroundColor: 'rgba(200, 0, 200, 0.5)'}
        }>
             
   
       
          {this.postChat()}
       
         
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