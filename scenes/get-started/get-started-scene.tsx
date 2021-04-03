import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import config from '../../config';
import Text from '../../shared/atoms/Text';
import { StatusBarHeight } from '../../modules/utils';
import Svg, { Circle } from 'react-native-svg';
import GetStarted from '../../assets/svg/getStarted';
import LogoWords from '../../assets/svg/logoWords';
import Button from '../../shared/atoms/Button';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    boxOfImage:{
        height:'42%',
        backgroundColor:config.mainColor,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: config.mainColor,
    },
    buttomWordContainer:{
        alignItems:'center',
        paddingTop:'7%'
    },
    arabText:{
        textAlign:'center',
        marginTop:'5%'
    },
    buttonStyle:{
        marginTop:'20%'
    }
  });
  
export default (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.safeArea}>
                </View>
                <View style={styles.boxOfImage}>
                    <GetStarted />
                </View>
                <View>
                <Svg height="100" width="100%" viewBox="0 0 100 100">
                    <Circle cx="50" cy="-300" r="130%" fill={config.mainColor} />
                </Svg>
                </View>
                <View style={styles.buttomWordContainer}>
                    <LogoWords/>
                    <Text style={styles.arabText} h5>
                    كروكا لاب تطبيع يمكنك من القيام بتبليغ عن حوادث السير تلقائيا والحصول على تقرير الكروكا الكترونيا بدون اي حاجه الي تضيع الوقت والجهد في حالة الحوادث الصغيره
                    </Text>
                    <Button title="إبدا الجولة بالتطبيق" containerStyle={styles.buttonStyle}
                    onPress={()=>{
                        props.navigation.replace('app-tour')
                    }}/>
                </View>
            </View>
            <StatusBar backgroundColor={config.mainColor} style="light"/>
        </>
    );
}
