import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import config from '../../config';
import Text from '../../shared/Text';
import LottieView from 'lottie-react-native';
import SwipeAnimation from '../../animations/swipe';
import AppTourSwiper from './appTourSwiper';
import { StatusBar } from 'expo-status-bar';
class appTour extends Component<any,any> {
    animation:any;
    state={
        activeSlide:((Platform.OS === 'ios')?0:2)
    }
    componentDidMount() {
        setTimeout(()=>{
            this.playAnimation()
        },2000)
      }
    
    render() {
        return (
            <Fragment>
            <View style={styles.heighContainer}>
                <View style={styles.innerView}>
                <AppTourSwiper activeSlide={(index:any)=>{
                    var beforeState = this.state.activeSlide
                    this.setState({...this.state, activeSlide:index},()=>{
                        if(beforeState == (Platform.OS === 'ios'?2:0) && this.state.activeSlide != (Platform.OS === 'ios'?2:0))
                            this.playAnimation()
                    })
                }} 
                navigate={()=>{
                    this.props.navigation.replace('loginSignup')
                }}/>
                </View>
                {this.state.activeSlide != (Platform.OS === 'ios'?2:0) &&
                <View style={{...styles.swipHintContainer} as any}>
                <LottieView
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  height: 100,
                  alignItems:"center"
                }}
                loop={false}
                onAnimationFinish={()=>{
                    setTimeout(()=>this.playAnimation(), 2000)
                }}
                source={SwipeAnimation}
                // OR find more Lottie files @ https://lottiefiles.com/featured
                // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
              />
                </View>
            }
            </View>
            <StatusBar style={'light'}/>
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
export const routeConfigs = {
    name: "appTour",
    component: appTour,
    options:{
        headerShown:false
    }
}

const styles = StyleSheet.create({
    heighContainer:{
        flex:1,
        backgroundColor:config.mainColor
    },
    innerView:{
        flex:1
    },
    swipHintContainer:{
        position:'absolute',
        bottom:'3%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden'
    }
});
export default appTour;