import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../../../shared/Text';
import { Car } from '../../../models/car';
import config from '../../../config';
import Svg, { Circle } from 'react-native-svg';
import CarSelectComponent from './carSelectComponent';
import Button from '../../../shared/Button';
class SelectCrashPlaces extends Component<{activeCar?:Car, navigation?:any},any> {
    render() {
        return (
            <View style={styles.fullSize}>
                <Text style={styles.text} bold>
الرجاء اختيار مناطق الاصابة عن طريق لمس الشكل 
                </Text>
                <View style={{...styles.layer, zIndex:1}}>
                        <View style={styles.curverContainer}>
                            <Svg height="100" width="100%" viewBox="0 0 100 100">
                                <Circle cx="50" cy="400" r="130%" fill={config.mainColor} />
                            </Svg>
                            <View style={styles.curverBox}>

                            </View>

                        </View>
                </View>
                <View style={{...styles.layer, zIndex:2, ...styles.carContainer}}>
                        <CarSelectComponent/>
                        <Button long title="الخطوة التالية" onPress={()=>{
                            this.props.navigation.navigate('takePicturesOfCar');
                        }} containerStyle={styles.buttonNextContainer} buttonStyle={styles.buttonNext} titleStyle={styles.buttonNextText} />

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    fullSize:{
        flex:1
    },
    layer:{
        height:'100%',
        width:'100%',
        position:'absolute',
        top:0,
        left:0
    },
    curverContainer:{
        position:'absolute',
        bottom:0,
        width:'100%'
    },
    curverBox:{
        height:Dimensions.get('window').height * 0.3,
        width:'100%',
        backgroundColor:config.mainColor
    },
    carContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:16,
        width:'100%',
        textAlign:'center',
        marginTop: '5%'
    },
    buttonNext: {
        backgroundColor: '#fff',
        color: config.mainColor 
    },
    buttonNextText: {
        color: config.mainColor,
        fontFamily: 'custom-bold'
    },
    buttonNextContainer:{
        bottom: '5%',
        position: 'absolute'
    }
})

export default SelectCrashPlaces;