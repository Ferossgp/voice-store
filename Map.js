import React, { Component } from 'react';
import { Image, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const imageWidth = 815;
const imageHeight = 2579;
const {height, width} = Dimensions.get('window');
export default class App extends Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }
    componentDidMount(){
      this.ref.current.centerOn({y: Math.min(500, Math.max(-400, 1000 - this.props.center.y)),
                                 x: 0, duration: 0, scale: 1});
    }
  render() {
    console.log(this.props.center);
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{height: 40, width: width,  alignItems:"center", justifyContent:"center"}}
          onPress={this.props.goBack}
          >
          <Text style={{fontSize: 18, fontWeight: "bold", textAlign: "center"}}>Go Back</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <ImageZoom
            ref={this.ref}
            enableCenterFocus={false}
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={width / imageWidth *  imageHeight}>
            <View style={{width: width, height: width / imageWidth *  imageHeight}}>
              <Image
                style={{width: width, height: width / imageWidth *  imageHeight}}
                source={require('./map.png')}/>
              <View style={{
                      position: "absolute",
                      top: width / imageWidth * this.props.center.y,
                      left: width / imageWidth * this.props.center.x,
                      width: 32,
                      height: 32,
                      opacity: 0.15,
                      backgroundColor: "#EB5757",
                    borderRadius: 32}}
                    >
              </View>
              <View style={{
                      position: "absolute",
                      top: width / imageWidth * this.props.center.y + 11,
                      left: width / imageWidth * this.props.center.x + 11,
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                      backgroundColor: "#EB5757",
                    }}>
              </View>
            </View>
          </ImageZoom>
        </View>
      </View>
    )
  }
}
