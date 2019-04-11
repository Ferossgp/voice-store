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
      if (this.props.center) {
        this.ref.current.centerOn({y: Math.min(500, Math.max(-400, 1000 - this.props.center.y)),
                                   x: 0, duration: 0, scale: 1});
      }
    }
  render() {
      console.log(this.props.myPosition);
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
              {this.props.center && (
                <>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.center.y,
                          left: width / imageWidth * this.props.center.x,
                          width: 64,
                          height: 64,
                          opacity: 0.15,
                          backgroundColor: "#EB5757",
                        borderRadius: 64}}
                        >
                  </View>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.center.y + 21,
                          left: width / imageWidth * this.props.center.x + 21,
                          height: 22,
                          width: 22,
                          borderRadius: 22,
                          backgroundColor: "#EB5757",
                        }}>
                  </View>
                </>
              )}
              {this.props.myPosition && (
                <>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.myPosition.y,
                          left: width / imageWidth * this.props.myPosition.x,
                          width: 64,
                          height: 64,
                          opacity: 0.15,
                          backgroundColor: "blue",
                        borderRadius: 64}}
                        >
                  </View>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.myPosition.y + 21,
                          left: width / imageWidth * this.props.myPosition.x + 21,
                          height: 22,
                          width: 22,
                          borderRadius: 22,
                          backgroundColor: "cyan",
                        }}>
                  </View>
                </>
              )}
            </View>
          </ImageZoom>
        </View>
      </View>
    )
  }
}
