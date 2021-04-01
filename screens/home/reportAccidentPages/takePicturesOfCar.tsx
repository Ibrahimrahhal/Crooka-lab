import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Text from '../../../shared/Text';
import CameraComponent from '../../../shared/CameraComponent';
import Car3DView from './car3DView';
import config from '../../../config';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';
import CameraModal from '../../../shared/CameraModal';
// const cameraA = require('../../../animations/cameraA.json')
import {connect} from 'react-redux';
import { getActiveCar } from '../../../app-state/store';
import { addCarPictures } from '../../../actions/actions';
class takePicturesOfCar extends Component<any, any> {
    state = {
        activeCarSide:'front',
        openCameraModel:false
    }
    cameraAnimation:any;
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text bold style={styles.text}>
                    الرجاء التقاط صور للمركبة بالوضعيات المبينة ادناه
                </Text>
                <View style={styles.t3dViewContainer}>
                    {/* <Car3DView activeSide={this.state.activeCarSide}/> */}
                </View>
                <Text bold style={styles.sideText}>
                    {carSides.find(x=>x.ID == this.state.activeCarSide)?.desc}
                </Text>
                <Text style={styles.TextMain}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales, augue vitae gravida gravida, ex est auctor lectus, sed commodo leo leo quis dolor.
                </Text>
                <View
                style={styles.buttonNextContainer}
                >
                <Icon
                    name='camera'
                    type='feather'
                    color={config.mainColor}
                    raised
                    reverse
                    onPress={() => this.setState({
                                ...this.state, 
                                openCameraModel:true
                    })} />
                </View>
            <CameraModal visible={this.state.openCameraModel} onShot={(photo)=>{
                this.props.addCarPhotoToActiveCar({
                    side:this.state.activeCarSide,
                    photo
                });
                this.setState({
                    ...this.state, 
                    activeCarSide: carSides.find(x=>x.ID==this.state.activeCarSide)?.next,
                    openCameraModel:false
                });
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
    mainContainer:{
        flex:1
    },
    text:{
        fontSize:16,
        marginTop:'5%',
        textAlign:'center',
        padding:'5%'
    },
    t3dViewContainer: {
        width: '100%',
        height: Dimensions.get('window').height*0.4
    },
    sideText:{
        fontSize:20,
        marginTop:'4%',
        textAlign:'center'
    },
    TextMain:{
        fontSize:16,
        marginTop:'3%',
        textAlign:'center'
    },
    buttonNextContainer:{
        bottom: '5%',
        position: 'absolute',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    }
})

const carSides = [
    {
        ID:'front',
        next:'right',
        desc:"الجهة الامامية"
    },
    {
        ID:'right',
        next:'back',
        desc:"الجهة اليمنى"
    },    
    {
        ID:'back',
        next:'left',
        desc:"الجهة الخلفية"
    },
    {
        ID:'left',
        next:'front',
        desc:"الجهة الامامية"
    },
];
const mapStateToProps = (state) => {
    return {
        takenPhotos: getActiveCar()?.pictures || [],
    };
}

const mapDispatchToProps = dispatch => {
	return{
        addCarPhotoToActiveCar : (picture) => {
            dispatch(addCarPictures(picture));
        },
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(takePicturesOfCar);