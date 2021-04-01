import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Text from '../../../../shared/Text';
import LottieView from 'lottie-react-native';
import scanID from '../../../../animations/ScanID';
import { Camera } from 'expo-camera';
import CameraModal from '../../../../shared/CameraModal';
import requiredDocs from './requiredDocuments';
export default class ScanDocs extends Component<any, any> {
    animation:any;
    state = {
        openCameraModel:false
    };
    render() {
        return (
            <View style={styles.container}>
                <Text bold style={styles.text}>
                    الرجاء التقاط صور للوثائق المبينة ادناه
                </Text>
                <View style={styles.animationContainer}>
                <LottieView
                ref={(animation:any) => {
                this.animation = animation;
                }}
                style={{
                height: Dimensions.get('window').height *0.5*0.7,
                alignItems:"center"
                }}
                loop
                source={scanID}
                autoPlay
                />
                </View>
                <Text bold style={styles.textBold}>
                    هوية الشخصية لسائق المركبة
                </Text>
                <View style={styles.cameraContainer}>
                    {!this.state.openCameraModel &&
                    <Camera style={styles.camera} type={Camera.Constants.Type.back}>
                            <View style={styles.cameraInner}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        ...this.state,
                                        openCameraModel:true
                                    })
                                }}>
                                <Text style={styles.text}> Flip </Text>
                            </TouchableOpacity>
                            </View>
                    </Camera>
                    }
                </View>
                <CameraModal visible={this.state.openCameraModel} onShot={(photo)=>{
                    this.setState({
                        ...this.state,
                        openCameraModel:false
                    })
                }}
                closeModal={()=>{
                    this.setState({
                        ...this.state, 
                        openCameraModel:false
                    })
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    text: {
        fontSize:16,
        marginTop:'5%',
        textAlign:'center',
        padding:'5%'
    },
    textBold: {
        fontSize:22,
        marginTop:'1%',
        textAlign:'center',
    },
    animationContainer: {
        alignItems:'center'
    },
    cameraContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:'4%'
    },
    camera:{
        height:Dimensions.get('window').height *0.5*0.5,
        width:Dimensions.get('window').width*0.8 ,
    },
    cameraInner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});