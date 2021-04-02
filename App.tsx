import React, { useState, useEffect } from 'react';
import { StyleSheet, View, I18nManager, Text } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import config from './config';
import SplashScreen from './shared/components/splash-screen';
import LazyNavigator from './navigators/lazy-navigator';
import { isLoggedIn, isFirstOpen } from './services/auth-service';
import { Provider, connect } from 'react-redux';
import store from './store';
import AuthStateAction from './store/actions/auth-state';
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
    useEffect(() => {
      isLoggedIn().then((isLoggedIn) => {
        setLoading(false);
        props.changeLoginState(isLoggedIn);
      });
    }, []);

    return (
      <View style={styles.container}>
        <LazyNavigator 
          loading={loading} 
          render={() => {
            if(props.state){
              return <Text>Ibrahim is cool</Text>
            } else {
              return <Text>Nothing is here</Text>
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