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
import BoxModel from './Commponents/BoxModel';
import PodestModel from './Commponents/PodestModel';
// import Viedio from './Vidio';


export default class react360 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Chat: [{
        user: "Hello Bot",
        text: "Welcame",
        image: "drawing512x512.png",
        Video: {
          name: "",
          play: false
      }
    }
     ]
    }
    var io = require('socket.io-client');

    this.socket = io('http://localhost:3000/Chat');
    this.socket.emit('connection', {});
    this.postChat = this.postChat.bind(this);
    this.playVideo = this.playVideo.bind(this);
this.socket.on('inputMessage', (data) => {
  console.log(data);
  this.setState({Chat: [...this.state.Chat, data]});
});

this.socket.on("inputImage", (data) =>{
  // this.setState({Image: [...this.state.Image, data]});
  
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
        }

        if(element.image !== "")
        {
          key++;
          // debugger;/
          temp.push(<View>
        
           <Image key={key} style={styles.img}
            source={asset( element.image)}>
          </Image>
            </View>

          );
          }else{
            temp.push(<Text key={key} style={styles.myFontSize}>
              {text}
          
              </Text>);
          }
          if(element.Video.name !== "")
          {
            key++;
            console.log(element.Video.name);
            temp.push( 
              // this.playVideo(element.Video.name)
              <Video 
              source={{uri: '/static_assets/Nasa_aqua.mp4'}}
              style={styles.video}
          />       
              );
            }
          output.push(<View >{temp}</View>)
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
    Welcome to React 360
  </Text>
          {this.postChat()}
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
    padding: 0,
    width: 800,
    // height: 200,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  myFontSize: {
    fontSize: 30,
  },
  img: {
    maxWidth: 100,
    minHeight : 50
  },
  video:{
  width: 10,
  height: 10
  }
});

AppRegistry.registerComponent('react360', () => react360);
AppRegistry.registerComponent('BoxModel', () => BoxModel);
AppRegistry.registerComponent('PodestModel', () => PodestModel);