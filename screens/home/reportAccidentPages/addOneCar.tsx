import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import config from '../../../config';
import Button from '../../../shared/Button';
import Input from '../../../shared/Input';
import Text from '../../../shared/Text';
import { connect } from 'react-redux';
import { selectCarModel, selectCarType, setCarPlatnumber } from '../../../actions/actions';
import { getActiveCar } from '../../../app-state/store';
import { Icon } from 'react-native-elements';
import { View as ViewA} from 'react-native-animatable';
class addOneCar extends Component<any, any> {
    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text bold style={styles.text}>
                    اختر نوع المركبة
                </Text>
                <View style={styles.flatListContainer}>
                    <FlatList data={itemsToRender}   
                    style={{ flex: 0 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true} 
                    initialNumToRender={itemsToRender.length}
                    keyExtractor={(item)=>{
                        return item.name
                    }}
                    renderItem={({item}:any)=>{
                        return ( 
                            <Pressable style={styles.card} onPress={()=>{
                                this.props.selectCarModel(item.name);
                            }}>
                                {(this.props.car.modelName == item.name) && (
                                <ViewA animation={'bounceIn'}
                                style={{...styles.checkIconStyle, top: -15, left:-15}}
                                >
                                <Icon
                                reverse
                                name='check'
                                type='feather'
                                color='#228B22'
                                size={18}
                            />
                            </ViewA>)}
                                <Image
                                    style={styles.carLogo}
                                    resizeMode={'contain'}
                                    source={{
                                    uri: item.url,
                                    }}
                                />
                            </Pressable> 
                        )
                    }}>
                    </FlatList>
                </View>
                <View>
                    <Text bold style={styles.text}>
                    ادخل فئة المركبة
                    </Text>
                    <View style={styles.carTypeContainer}>
                        {
                            carTypes.map((carType=>{
                                return (
                                    <Pressable style={styles.carTypeItem} onPress={()=>{
                                        this.props.selectCarType(carType.name);

                                    }}>
                                        {(this.props.car.type == carType.name) && (
                                        <ViewA animation={'bounceIn'}
                                            style={styles.checkIconStyle}
                                            >
                                            <Icon
                                            reverse
                                            name='check'
                                            type='feather'
                                            color='#228B22'
                                            size={18}
                                            
                                        />
                                        </ViewA>
                                        )}
                                        <View style={styles.carTypeIconContainer}>
                                            <Image 
                                            resizeMode={'contain'}
                                            source={carType.img}
                                            style={styles.carTypeIcon}/>
                                        </View>
                                        <Text style={styles.carTypeText} bold>{carType.name}</Text>
                                    </Pressable>
                                );
                            }))
                        }
                    </View>
                </View>
                <View>
                    <Text bold style={styles.text}>
                    ادخل رقم لوحة المركبة
                    </Text>
                </View>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Image style={styles.platnumber}
                        resizeMode={'contain'}
                        source={require('../../../assets/platnumber.png')}
                    />
                </View>
                <View style={{ paddingLeft: '3%', justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{width:'70%'}}>
                        <Input placeholder="23-XXXXX" style={{textAlign: 'center'}}    onChangeText={value => this.props.setCarPlatnumber(value)}/>
                    </View>
                </View>
                <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Button long title="الخطوة التالية" onPress={()=>{
                            this.props.navigation.navigate('selectCrashPlaces');
                        }} containerStyle={styles.buttonNextContainer} buttonStyle={styles.buttonNext} titleStyle={styles.buttonNextText} />
                </View>
               </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
        marginTop: '7%',
        paddingLeft: '3%'
    },
    card: {
        height: Dimensions.get('screen').width * 0.4,
        width: Dimensions.get('screen').width * 0.4,
        backgroundColor: '#fff',
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop:'2%'
    },
    carLogo: {
        height: '100%',
        width: '100%', 
    },
    platnumber: {
        width: Dimensions.get('screen').width * 0.7,
        height: Dimensions.get('screen').height * 0.13
    },
    carTypeContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: '2%'

    },
    carTypeItem: {
        margin:'3%'
    },
    carTypeIcon: {
        width: Dimensions.get('window').height * 0.1,
        height: Dimensions.get('window').height * 0.1,
        
    },
    carTypeText: {
        textAlign: 'center',
        paddingTop: '4%'
    },
    carTypeIconContainer: {
        padding: 20,
        borderRadius: (Dimensions.get('window').height * 0.1 + 40)/2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 8,
        backgroundColor: '#fff',
        width: Dimensions.get('window').height * 0.1 + 40,
        height: Dimensions.get('window').height * 0.1 + 40,

    },
    buttonNext: {

    },
    buttonNextText: {
        fontFamily: 'custom-bold'
    },
    buttonNextContainer: {
        marginTop: '10%',
        width: '70%',
        marginBottom: '10%'
    },
    checkIconStyle: {
        position: 'absolute',
        top:-10,
        left:-10,
        zIndex: 99,
        width: 40,
        height: 40
    }
});
export const carTypes = [{
    name: "مركبة عادية",
    img: require(`../../../assets/vTypes/sedan.png`)
},{
    name: "مركبة كبيرة",
    img: require(`../../../assets/vTypes/suv.png`)
},{
    name: "مقطورة",
    img: require(`../../../assets/vTypes/van.png`)
},{
    name: "مركبة نقل",
    img: require(`../../../assets/vTypes/pickUp.png`)
},{
    name: "شاحنة نقل صغيرة",
    img: require(`../../../assets/vTypes/miniTruck.png`)
},{
    name: "شاحنة نقل كبيرو",
    img: require(`../../../assets/vTypes/truck.png`)
}];

const itemsToRender = require('../../../assets/cars.json');
const mapStateToProps = (state) => {
    return {
      carType: getActiveCar(state)?.type,
      model: getActiveCar(state)?.modelName,
      platnumber: getActiveCar(state)?.platNumber,
      state,
      car: getActiveCar(state)
    };
}

const mapDispatchToProps = { selectCarType, selectCarModel, setCarPlatnumber };
export default connect(mapStateToProps, mapDispatchToProps)(addOneCar)
