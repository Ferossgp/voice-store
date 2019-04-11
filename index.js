/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import App from './App';
import Map from './Map';
import {name as appName} from './app.json';
import MiniSearch from 'minisearch';

// A collection of documents for our examples
const documents = [
    { id: 1, title: 'Water'},
    { id: 2, title: 'Tomato' },
    { id: 3, title: 'Bread'},
    { id: 4, title: 'Cheese'},
];

const mapPos = {
    1: {x: 38, y: 1},
    2: {x: 100, y: 100},
    3: {x: 80, y: 80},
    4: {x: 150, y: 80},
};

let miniSearch = new MiniSearch({ fields: ['title', 'center'] });
 
miniSearch.addAll(documents);

class Application extends Component {
    state = {
        center: {x:0,y:0},
        screen: "app",
    };
    onSearch = text => {
        let results = miniSearch.search(text);
        if(results.length > 0){
            this.setState({
                screen: "map",
                center: mapPos[results[0].id],
            });
        }
    };
    goBack = () => {
        this.setState({
            screen: "app",
        });
    };

    render() {
        let screen;
        if(this.state.screen == "app"){
            screen = <App onSearch={this.onSearch}/>;
        }else{
            screen = <Map goBack={this.goBack} center={this.state.center}/>;
        }
        return (
            <View style={{flex:1}}>
            {screen}
            </View>
        );
    }
}

AppRegistry.registerComponent(appName, () => Application);
