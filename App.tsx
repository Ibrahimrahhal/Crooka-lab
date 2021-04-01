import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import FirstLevelStackNavigator from './screens/firstLevelStackNavigator';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import * as Font from 'expo-font';
import config from './config';
import Text from './shared/Text';
import {Provider} from 'react-redux';
import store from './app-state/store';

let customFonts = {
  'custom-regular': require('./assets/Cairo-Regular.ttf'),
  'custom-bold': require('./assets/Cairo-Bold.ttf'),
  
};
export default class App extends Component {
  state = {
    fontsLoaded: false,
  };
constructor(props:any){
  super(props);
  I18nManager.forceRTL(true);
}
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    try{
      return (
        <NavigationContainer>
          <Provider store={store}>
            <ThemeProvider theme={config.globalTheme as any}>
              <View style={styles.container}>
                {this.state.fontsLoaded &&(<FirstLevelStackNavigator/>)} 
              </View>
            </ThemeProvider>
          </Provider>
        </NavigationContainer>
      );
    }catch(e){
      console.log(e.toString())
      return (
      <View style={styles.container}>
        <Text h5> {e.toString()}</Text>
      </View>)
    }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    direction:'rtl'
  },
});
