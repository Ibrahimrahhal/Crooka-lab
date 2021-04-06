import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { StatusBarHeight } from '../../modules/utils';
import Button from '../../shared/atoms/Button';
import Text from '../../shared/atoms/Text';
import TourFirstSlide from '../../assets/svg/tourFirstSlide';
import TourSecondSlide from '../../assets/svg/tourSecondSlide';
import NgIf from '../../shared/helpers/NgIf';
import sendMail from '../../assets/animations/sendMail';
import config from '../../config';

const styles = StyleSheet.create({
    upperLevelContainer:{
        flex:1
    },
    slideContainer:{
        flex:1
    },
    wrapper: {
        direction:'rtl',
        flexDirection:'row-reverse',
        flex:1
    },
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: config.mainColor,
    },
    upperSliderHalf:{
        height:'50%',
        width:'100%',
        justifyContent:'flex-end',
        alignItems:'center',
        overflow:'hidden'
    },
    secondHalf:{
        height:'50%',
        width:'100%',
        padding:'3%',
        alignItems:'center'
    },
    text:{
        color:'white',
        textAlign:'center'
    },
    smallText:{
        marginTop:'4%'
    },
    buttonStyle:{
        backgroundColor:'white'
    },
    titleStyle:{
        color:config.mainColor
    },
    buttuonContainerStyle:{
        position:'absolute',
        bottom:'10%',
    }
});
const slideShouldActivate = (Platform.OS !== 'ios' ? 2 : 0);
const Animation: {Ref: any, play: any} = {
    Ref: null,
    play() {
        try{
            if(this.Ref)
                this.Ref.play();
        }catch{
            console.log('not inited')
        }
    }
}
export default (props) => {
    const [visitedArray, SetVisitedArray] = useState(Array(3).fill(false));
    useEffect(() => {
        const initialVisitedArray = [...visitedArray];
        initialVisitedArray[slideShouldActivate] = true;
        SetVisitedArray(initialVisitedArray);
    }, []);
    useEffect(() => {
        if(visitedArray[2-slideShouldActivate]) {
            Animation.play();
        }
    }, [visitedArray]);
    return (
        <View style={styles.upperLevelContainer}>
            <View style={styles.safeArea}>
            </View>
            <Swiper 
                loop={false}
                containerStyle={styles.wrapper} 
                index={slideShouldActivate}
                onIndexChanged={(index)=>{
                    props.activeSlide(index);
                    visitedArray[index] = true;
                    setTimeout(() => SetVisitedArray([...visitedArray]))
                }}
                showsPagination={false}
                >
                    <View style={styles.slideContainer}>
                        <NgIf if={visitedArray[slideShouldActivate]}>
                            <Animatable.View style={styles.slideContainer} animation={'fadeIn'}>
                                <Animatable.View style={styles.upperSliderHalf} animation={'slideInDown'} delay={200}>
                                    <TourFirstSlide height={Dimensions.get('window').height *0.5*0.8} width={Dimensions.get('window').width}/>
                                </Animatable.View>
                                <View style={styles.secondHalf}>
                                    <Text big bold style={{...styles.text}}>
                                        كروكتك جاهزة ببضع خطوات بسيطة
                                    </Text>
                                    <Text  h5 style={{...styles.text, ...styles.smallText}}>
                                    عند وقوع اي حادث سير بسيط يمكنك البدآ بفتح التطبيق والابلاغ عن الحادث عن طريق ادخال بيانات المركبات٫ التقاط بعض الصور ويتنهى الامر بوصول تقرير الكروكا لكلا الطرفين
                                    </Text>
                                </View>
                            </Animatable.View>
                        </NgIf>
                    </View>
                    <View style={styles.slideContainer}>
                        <NgIf if={visitedArray[1]}>
                            <Animatable.View style={styles.slideContainer} animation={'fadeIn'}>
                                <Animatable.View style={styles.upperSliderHalf} animation={'slideInDown'} delay={200}>
                                <TourSecondSlide width={Dimensions.get('window').width * 0.85}/>

                                </Animatable.View>
                                <View style={styles.secondHalf}>
                                    <Text big bold style={{...styles.text}}>
                                    تعبئة البيانات والتقاط صور لبعض الوثائق

                                    </Text>
                                    <Text  h5 style={{...styles.text, ...styles.smallText}}>
                                    لكي تكمل العملية يجب عليك القيام بتعبئة بيانات اساسية عن الحادث واطرافة مع التقاط صور مجموعة من الوثائق مثل رخصة القياده ورحصة السياره وايضا صور للمركبات المتضرره 
                                    </Text>
                                </View>
                            </Animatable.View>
                        </NgIf>
                    </View>
                    <View style={styles.slideContainer}>
                        <NgIf if={visitedArray[2-slideShouldActivate]}>
                            <Animatable.View style={styles.slideContainer} animation={'fadeIn'}>
                                <Animatable.View style={styles.upperSliderHalf} animation={'slideInDown'} delay={200}>
                                    <LottieView
                                        ref={(animation) => Animation.Ref = animation}
                                        style={{
                                            height: Dimensions.get('window').height *0.5*0.8,
                                            alignItems:"center"
                                        }}
                                        loop
                                        source={sendMail}

                                    />
                                </Animatable.View>
                                <View style={styles.secondHalf}>
                                    <Text  big bold style={{...styles.text}}>
                                        انتظر وصول تقرير الكروكا برسالة
                                    </Text>
                                    <Text  h5 style={{...styles.text, ...styles.smallText}}>
                                        بعد تقديم البيانات والصور المطلوبة يتبقى عليك فقط الانتظار ليتم مراجعتها وبعدها فورا سيتم ارسال تقرير الكوركا برسالة لكل اطراف الحادث
                                    </Text>
                                    <Button 
                                        onPress={()=> props.navigate()} 
                                        title={"إذهب للتطبيق"} 
                                        buttonStyle={styles.buttonStyle}
                                        titleStyle={styles.titleStyle} 
                                        containerStyle={styles.buttuonContainerStyle}
                                    />
                                </View>
                            </Animatable.View>   
                        </NgIf>
                    </View>
                </Swiper>
        </View>
    );
}
