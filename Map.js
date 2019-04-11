import React, { Component } from 'react';
import { Image, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

export default class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity 
                    style={{height: 40, alignItems:"center", justifyContent:"center"}}
                    onPress={this.props.goBack}
                >
                    <Text style={{fontSize: 18, fontWeight: "bold", textAlign: "center"}}>Go Back</Text>
                </TouchableOpacity>
                <ImageZoom 
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={Dimensions.get('window').width / 815 *  2579}
                    centerOn={{...this.state.center, duration: 0, scale: 1}}>
                    <Image 
                        style={{width:Dimensions.get('window').width, height: Dimensions.get('window').width / 815 *  2579}} 
                        source={require('./map.png')}/>
                </ImageZoom>
                <View style={{
                    position: "absolute",
                    top: this.props.center.y,
                    left: this.props.center.x,
                    width: 32,
                    height: 32,
                    opacity: 0.15,
                    backgroundColor: "#EB5757",
                    borderRadius: 32}}
                >
                </View>
                <View style={{
                    position: "absolute",
                    top: this.props.center.y + 11,
                    left: this.props.center.x + 11,
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: "#EB5757",
                }}>
                </View>
            </View>
        )
    }
}
