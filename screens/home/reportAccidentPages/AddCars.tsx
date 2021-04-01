import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, Dimensions, Platform,ScrollView } from 'react-native';
import Text from '../../../shared/Text';
import AutoHeightImage from 'react-native-auto-height-image';
import SafeArea from '../../../shared/SafeArea';
import { StatusBar } from 'expo-status-bar';
import { Icon, Divider } from 'react-native-elements';
import config from '../../../config';
import { carTypes } from './addOneCar';
import Button from '../../../shared/Button';
import { connect } from 'react-redux';
import { Car, StoreType } from '../../../app-state/store-type';
import { getActiveAccident } from '../../../app-state/store';
import { initAccident, initNewCar } from '../../../actions/actions';
import NgIf from '../../../shared/NgIf';
class AddCars extends Component<any, any> {
    state = {isButtonClicked:false}
    isCarsEmpty= ()=>{
        if(this.state.isButtonClicked)
            return true;
        return (this.props.accident?.involvedCars || []).length == 0;
    }
    render() {
        return (
            <Fragment>
                <ScrollView>
                    <View >
                    {/* {true && <SafeArea backgroundColor={'transparent'}/>} */}
                    <View style={styles.upperContainer}>
                        <AutoHeightImage source={require('../../../assets/addCars.png')} width={Dimensions.get('window').width} />
                        <View style={styles.textContainer}>
                            <Text h5 style={styles.text}>
                                لتقوم بالتبليغ عن الحادث بشكل صحيح يجب عليك ان تقوم بادخال بيانات المركبات واحدة تلو الاخره
                            </Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text bold style={styles.heading}>
                            المركبات المتضمنة بالحادث
                        </Text>
                        <Text h5 style={{...styles.text, paddingLeft: '3%'}}>
                            لا يوجد اي مركبة متضمنة بالحادث يجب على الحادث ان يتضمن مركبتين على الاقل لاضافة مركبقة قم بالضغط على زر الاضافة
                        </Text>
                        <Button long title="اضافة مركبة" onPress={()=>{
                                this.props.initNewCar()
                                this.props.navigation.navigate('addOneCar');
                            }} containerStyle={styles.addButtonContainer} buttonStyle={styles.addButtonStyle} titleStyle={styles.addButtonText} />

                    </View>
                    <View >
                        {(this.props.accident?.involvedCars || []).map((item:{
                            car:Car
                        })=>{
                            return (
                            <View style={styles.itemContainer} key={item.car.platNumber}>
                                <Text bold>
                                    
                                    {item.car.platNumber}
                                </Text>
                                <Image 
                                    source={carTypes.find(itemX=>itemX.name==item.car.type)?.img}  
                                    resizeMode={'contain'}
                                    style={styles.carIcon}
                                />
                            </View>
                            );
                        })}
                    </View>

                </View>
                <NgIf if={!this.isCarsEmpty()}>
                    <View>
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: '20%'}}>
                                <Button long disabled={!((this.props.accident?.involvedCars || []).length > 1)} title="تسجيل الحادث" onPress={()=>{
                                            this.props.navigation.navigate('takePicturesOfCar');
                                        }} containerStyle={{...styles.addButtonContainer, width: '70%'}} buttonStyle={styles.addButtonStyle} titleStyle={styles.addButtonText} />
                        </View>
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: '3%', marginBottom: '10%'}}>
                                <Button long title="الغاء البلاغ" onPress={()=>{
                                            console.log(this.props.accident)
                                        }} containerStyle={{...styles.addButtonContainer, width: '50%', backgroundColor: '#da1f26', marginTop:0}} buttonStyle={{...styles.addButtonStyle , backgroundColor: '#da1f26'}} titleStyle={styles.addButtonText} />
                        </View>
                    </View>
                </NgIf>
                </ScrollView>
                <NgIf if={this.isCarsEmpty()}>
                    <View style={styles.buttonsBottom}>
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: '20%'}}>
                                <Button disabled long title="تسجيل الحادث" onPress={()=>{
                                            this.setState({...this.state, isButtonClicked: true})
                                            setTimeout(()=>{
                                                this.setState({...this.state, isButtonClicked: true})
                                            }, 2000)
                                            this.props.navigation.navigate('takePicturesOfCar');
                                        }} containerStyle={{...styles.addButtonContainer, width: '70%'}} buttonStyle={styles.addButtonStyle} titleStyle={styles.addButtonText} />
                        </View>
                        <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: '3%', marginBottom: '10%'}}>
                                <Button long title="الغاء البلاغ" onPress={()=>{
                                            console.log(this.props.accident)
                                        }} containerStyle={{...styles.addButtonContainer, width: '50%', backgroundColor: '#da1f26', marginTop:0}} buttonStyle={{...styles.addButtonStyle , backgroundColor: '#da1f26'}} titleStyle={styles.addButtonText} />
                        </View>
                    </View>
                </NgIf>
                <StatusBar style="dark"/>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    textContainer:{
        paddingLeft:'3%',
        paddingRight:'3%',
    },
    text:{
        textAlign:'left',
    },
    upperContainer:{
        marginTop:'5%'
    },
    iconContainer:{

        justifyContent:'center',
        width:'100%',
        flexDirection:'row'
    },
    heading: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: '5%',
        paddingLeft: '3%'
    },
    carIcon: {
        height: Dimensions.get('screen').height * 0.1,
        width: Dimensions.get('screen').height * 0.1
    },
    itemContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '2%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 20
    },
    addButtonContainer: {
        // borderRadius: 7,
        width: '40%',
        marginLeft: '3%',
        marginTop: '5%'
    },
    addButtonStyle: {
        
    },
    addButtonText: {
        fontFamily: 'custom-bold',
        fontSize: 14
    },
    buttonsBottom: {
        position: 'absolute',
        bottom: 0,
        alignItems:'center',
        justifyContent: 'center',
        width: '100%'
    }
});

const dummyList = [{
    type: "مركبة عادية",
    platNumber: "23-123232"
},{
    type: "مركبة نقل",
    platNumber: "23-123233"
},{
    type: "شاحنة نقل كبيرو",
    platNumber: "23-123234"
}];

const mapStateToProps = (state:StoreType) => {
    return {
      accident: getActiveAccident(state)
    }
  }
  
  
  const mapDispatchToProps = { initNewCar, initAccident }
  
export default connect(mapStateToProps, mapDispatchToProps)(AddCars)