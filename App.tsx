import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, View, I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import LazyNavigator from './navigators/lazy-navigator';
import AuthStateAction from './store/actions/auth-state';
import AuthNavigator from './navigators/auth-navigator';
import GetStartedNavigator from './navigators/get-started-navigator';
import HomeNavigator from './navigators/home-root-navigator';
import { isLoggedIn, isFirstOpen } from './services/auth-service';
import store from './store';
import config from './config';


namespace Fonts {
  /* using generic name to make it easier to change font type in future */
  const fonts = {
    'custom-regular': require('./assets/fonts/Cairo-Regular.ttf'),
    'custom-bold': require('./assets/fonts/Cairo-Bold.ttf'),
  };

  async function load() {
    await Font.loadAsync(fonts);
  }

  export function init() {
    return load();
  }

}
namespace App {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      direction:'rtl'
    },
  });
  const base = (props) => {
    const [loading, setLoading] = useState(true);
    const [_isFirstOpen, setIsFirstOpen] = useState(true);
    useEffect(() => {
      Promise.all([isLoggedIn(), isFirstOpen(), Fonts.init()]).then(([isLoggedIn, isFirstOpen]) => {
        props.changeLoginState(isLoggedIn);
        setIsFirstOpen(isFirstOpen);
        setLoading(false);
      });
    }, []);

    return (
      <View style={styles.container}>
        <LazyNavigator 
          loading={loading} 
          render={() => {
            if(props.state){
              return <HomeNavigator />;
            } else if(_isFirstOpen){
              return <GetStartedNavigator />;
            } else {
              return <AuthNavigator />;
            }
          }}
        />              
      </View>
    );
  }

  export const component = connect( 
    (state: any) => ({state:  state && state.auth && state.auth.state}),
    (dispatch) => ({ changeLoginState: (state:boolean) => dispatch(AuthStateAction(state)) })
    )(base);
}


namespace entry {
  I18nManager.forceRTL(true);
  export const component =  () => {
      return (        
      <NavigationContainer>
        <Provider store={store}>
          <ThemeProvider theme={config.globalTheme as any}>
            <App.component />
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
      );
  } 
}

export default entry.component;