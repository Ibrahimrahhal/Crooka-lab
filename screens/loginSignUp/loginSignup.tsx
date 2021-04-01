import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Text from '../../shared/Text';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import config from '../../config';
import Login from './login';
import Signup from './signup';
import { StatusBar } from 'expo-status-bar';
import driveCar from '../../animations/driveCar';
import LottieView from 'lottie-react-native';
import { StatusBarHeight } from '../../modules/utils';

const Tab = createMaterialTopTabNavigator();
class loginSignup extends Component<any,any> {
animation:any;
componentDidMount() {
    this.playAnimation()
  }
    render() {
        return (
            <Fragment>
            <StatusBar style={'light'}/>
            <View style={styles.container}>
                <View style={styles.topSideView}>
                <View style={styles.safeArea}>
                </View>
                <View style={styles.animationContainer}>
                <LottieView
                ref={(animation:any) => {
                  this.animation = animation;
                }}
                style={{
                  height: Dimensions.get('window').height/2.5,
                  width:Dimensions.get('window').width,
                  alignItems:"center"
                }}
                source={driveCar}
                // OR find more Lottie files @ https://lottiefiles.com/featured
                // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
              />
                </View>
                </View>
                <View style={styles.bottomSideView}>
                <Tab.Navigator initialRouteName={"تسجيل الدخول"} tabBarOptions={{
                    indicatorStyle:{
                        backgroundColor:config.mainColor,
                        height:4
                    },
                    labelStyle:{
                        fontFamily:'custom-bold',
                        paddingBottom:'3%',
                        paddingTop:'3%'
                    },
                    style:{
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 0.08,
                        shadowRadius: 16.00,
                        elevation: 24
                    },
                }}>
                    <Tab.Screen name="تسجيل الدخول" >
                            {props=><Login {...props} parentNav={this.props.navigation}/>}
                    </Tab.Screen> 
                    <Tab.Screen name="انشاء حساب" >
                            {props=><Signup {...props} parentNav={this.props.navigation}/>}
                    </Tab.Screen>

                </Tab.Navigator>
                </View>
            </View>
            </Fragment>
        );
    }
    playAnimation(){
        try{
            this.animation.play()
        }catch{
            console.log('not inited')
        }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center'
    },
    topSideView:{
        height:'30%',
        backgroundColor:config.mainColor,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomSideView:{
        height:'70%',
        width:'100%',
        direction:'rtl',
        textAlign:'right'
    },
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: config.mainColor,
    },
    animationContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export const routeConfigs = {
    name: "loginSignup",
    component: loginSignup,
    options:{
        headerShown:false
    }
}
export default loginSignup;