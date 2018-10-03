import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from "expo";
import Home from './src/screens/Home';

export default class App extends React.Component {
  
  state = {
    fontLoad : false
  }
  
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      fontLoad : true
    })
  }


  render() {
    return (
      this.state.fontLoad ? <Home /> : null
      // <View style={styles.container}>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
