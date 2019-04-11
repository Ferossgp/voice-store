/**
 * @format
 */
import React, { Component } from 'react';
import {AppRegistry, View, Text, BackHandler} from 'react-native';
import App from './App';
import Map from './Map';
import Scanner from './Scanner';
import {name as appName} from './app.json';
import MiniSearch from 'minisearch';
import { throwStatement } from '@babel/types';

// A collection of documents for our examples
const documents = [
    { id: 1, title: 'Cheese', center: {x: 510, y: 40}},
    { id: 2, title: 'Milk', center: {x: 745, y: 40} },
    { id: 3, title: 'Bread', center: {x: 235, y: 100}},
    { id: 4, title: 'Cake', center: {x: 280, y: 40}},
    { id: 5, title: 'flour', center: {x: 465, y: 230}},
    { id: 6, title: 'cereal', center: {x: 740, y: 200} },
    { id: 7, title: 'porridge', center: {x: 740, y: 400}},
    { id: 8, title: 'kefir', center: {x: 740, y: 300}},
    { id: 9, title: 'yogurt', center: {x: 740, y: 650}},
    { id: 10, title: 'ketchup', center: {x: 575, y: 440} },
    { id: 11, title: 'Eggs', center: {x: 530, y: 700}},
    { id: 12, title: 'Water Mineral', center: {x: 380, y: 680}},
    { id: 13, title: 'Pepsi Cola Sprite Fanta Merinda Seven Up 7 Up', center: {x: 340, y: 750}},
    { id: 14, title: 'Burn, Redbull, Adrenaline Rush', center: {x: 340, y: 880} },
    { id: 15, title: 'Beer', center: {x: 190, y: 750}},
    { id: 16, title: 'Chips Nachos Lays pringles', center: {x: 250, y: 750}},
    { id: 17, title: 'Juice', center: {x: 380, y: 900}},
    { id: 18, title: 'Cookies', center: {x: 570, y: 900} },
    { id: 19, title: 'Rice', center: {x: 540, y: 670}},
    { id: 20, title: 'Pasta Barilla Macarni Spaghetti', center: {x: 720, y: 770}},
    { id: 21, title: 'mussels octopus ', center: {x: 80, y: 650}},
    { id: 22, title: 'salted fish', center: {x: 80, y: 725} },
    { id: 23, title: 'Sausages', center: {x: 300, y: 550}},
    { id: 24, title: 'Banana', center: {x: 740, y: 2040}},
    { id: 25, title: 'Apple', center: {x: 743, y: 1760}},
    { id: 26, title: 'Peanapple', center: {x: 730, y: 1940}},
    { id: 27, title: 'Tomato', center: {x: 573, y: 1950}},
    { id: 28, title: 'Coffee', center: {x: 570, y: 1140}},
    { id: 29, title: 'Tea', center: {x: 721, y: 1140}},
    { id: 30, title: 'Meat Pork Beef ', center: {x: 375, y: 1480}},
    { id: 30, title: 'chicken', center: {x: 375, y: 1360}},
    { id: 31, title: 'chocolate', center: {x: 533, y: 1300}},
];

const qrPositions = {
  1: {x: 730, y: 2500},
  2: {x: 300, y: 900},
  3: {x: 300, y: 900},
  4: {x: 300, y: 900},
  5: {x: 300, y: 900}
};

const mapPos = documents.reduce(function(map, obj) {
    map[obj.id] = obj.center;
    return map;
}, {});

let miniSearch = new MiniSearch({ fields: ['title'] });
 
miniSearch.addAll(documents);

class Application extends Component {
    state = {
      center: null,
      screen: "map",
      myPosition: null
    };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.setState({
      screen: 'map'
    });
    return true;
  }
    onSearch = texts => {
      for(var text of texts){
        let results = miniSearch.search(text);
        if(results.length > 0){
          this.setState({
            screen: "map",
            center: mapPos[results[0].id],
          });
          return;
        }
      }
    };
    onScan = id => {

        if(id){
            this.setState({
                myPosition: qrPositions[id],
                screen: "map",
            });
        }
    };
    goBack = () => {
        this.setState({
            screen: "map",
        });
    };
    goToSearch = () => {
        this.setState({
            screen: "app",
        });
    };
    goToQr = () => {
        this.setState({
            screen: "scanner",
        });
    };
    render() {
        let screen;
        if(this.state.screen == "app"){
            screen = <App onSearch={this.onSearch}/>;
        }else if (this.state.screen == "map") {
            screen = <Map goToSearch={this.goToSearch} goToQr={this.goToQr} myPosition={this.state.myPosition} center={this.state.center}/>;
        }else if (this.state.screen == "scanner"){
            screen = <Scanner onScan={this.onScan} goBack={this.goBack}/>
        }
        return (
            <View style={{flex:1}}>
            {screen}
            </View>
        );
    }
}

AppRegistry.registerComponent(appName, () => Application);
