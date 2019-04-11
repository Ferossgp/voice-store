import React, { Component } from 'react';
import { Image, Dimensions, View, Text, TouchableOpacity, ToolbarAndroid } from 'react-native';
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
  onActionSelected = (position) => {
    if (position === 0) {
      this.props.goToSearch();
    }
    if (position === 1) {
      this.props.goToQr();
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          title='Aliya + Пятёрочка'
          height={56}
          width={width}
          actions={[
            {title: 'Search', icon: require('./mic.png'), show: 'always'},
            {title: 'Location by QR code', icon: require('./qr.png'), show: 'always'}
          ]}
          onActionSelected={this.onActionSelected} />
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
              {this.props.productPosition && (
                <>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.productPosition.y,
                          left: width / imageWidth * this.props.productPosition.x,
                          width: 64,
                          height: 64,
                          opacity: 0.15,
                          backgroundColor: "#EB5757",
                        borderRadius: 64}}
                        >
                  </View>
                  <View style={{
                          position: "absolute",
                          top: width / imageWidth * this.props.productPosition.y + 21,
                          left: width / imageWidth * this.props.productPosition.x + 21,
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
