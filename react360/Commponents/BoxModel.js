import React from 'react';
// import Card from './parts/card';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,AmbientLight,Model,asset
} from 'react-360';

export default class MainMy extends React.Component {
    constructor(props){
        super(props);
        // console.log("greetingBox", this.props.styleData.greetingBox);
  this.state = {
    
      myModelObj: '/box/untitled.obj',
      myModelMtl: '/box/untitled.mtl'
  }
    }

  
    render() {
      return (
        <View >
           <AmbientLight intensity={1.0} color={'#ff00ff'} />
           {/* <Entity source={{obj: asset('myModel.obj')}} /> */}
     <Model 
              source={{
                obj:asset(this.state.myModelObj),
                mtl:asset(this.state.myModelMtl)
              }}
              style={{
                transform:[
                  {translate: [0,0,0]},
                  {scale: 30.0},
                  {rotateX: 0},
                  {rotateY: 0}
                ]
              }}
            />
    
          {/* <View style={this.props.styleData.greetingBox} > */}
            {/* <Card styleData={this.props.styleData} CardData={this.props.CardData}  id={this.props.id}></Card> */}

        {/* </View> */}
        </View>
      );
    }
  }

