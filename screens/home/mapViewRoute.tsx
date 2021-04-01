import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Text from '../../shared/Text';
import Button from '../../shared/Button';
import config from '../../config';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { StatusBarHeight } from '../../modules/utils';
import { StatusBar } from 'expo-status-bar';

class mapViewRoute extends Component<any,{
    location?:{
        latitude: number;
        longitude: number;
        altitude: number | null;
        accuracy: number | null;
        altitudeAccuracy: number | null;
        heading: number | null;
        speed: number | null;
    }
}> {
    async componentDidMount(){
        this.props.returnNavigation(this.props.navigation);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        this.setState({...(this.state || {}), location:location.coords});
    }

    getRegion(){
        if(!(this.state && this.state.location))
        return undefined;
        return {
            latitude: this.state.location.latitude,
            longitude:  this.state.location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.009,
          }
    }
    render() {
        return (
            <Fragment>
            <View style={styles.container}>
                <View style={styles.upperSide}>
                    <View style={styles.safeArea}>
                    </View>
                    <View style={styles.upperSideContent}>
                        
                    <View style={styles.locationTextContainer}>
                        <Text big bold style={styles.locationText}>
                                شارع مكه
                        </Text>
                        <Text h5  style={styles.locationText}>
                                طريق السلط المحطه الدوار الرابع
                        </Text>
                    </View>
                    <Icon
                    
                    name='menu'
                    type='feather'
                    color={'#000'}
                    onPress={() => this.props.navigation.toggleDrawer()} />
                    </View>
                </View>
                <Animatable.View style={styles.mapContainer} animation={'fadeInUp'} delay={200}>
                    <MapView style={styles.mapStyle}  region={this.getRegion()} provider={'google'}>
                        {
                            this.state && this.state.location && 
                            <Marker coordinate={{...this.state.location}} />
                        }
                    </MapView>
                </Animatable.View>
                {/* <Animatable.View style={styles.bottomView} animation={'fadeInUp'} delay={1200}>
                <Button title="تبليغ عن حادث سير"  shadow={true} onPress={()=>this.props.navigation.toggleDrawer()}>
                        
                    </Button>
                </Animatable.View> */}
                {/* <Animatable.View style={styles.menuButtonContainer} animation={'fadeIn'} delay={0}>

                </Animatable.View> */}
            </View>
            <StatusBar style={"dark"}></StatusBar>
            </Fragment>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fefefe',
      justifyContent:'center',
      alignItems:'center'
    },
    mapStyle: {
        width: '100%',
        height: '100%',
    },
    upperSide:{
        height: '20%',
        backgroundColor:"#fefefe",
        width:'100%',
    },
    mapContainer:{
        height:'80%',
        width:'100%',
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        elevation: 50 ,
        // background color must be set
        backgroundColor : "#000" // invisible color
    },
    bottomView:{
        width:'100%',
        height:'14%',
        position:'absolute',
        bottom:0,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    menuButtonContainer:{
        width:'20%',
        height:'20%',
        position:'absolute',
        top:0,
        left:0,
        backgroundColor:'transparent',
        justifyContent:'center',
        alignItems:'center'
    },
    locationTextContainer:{
        flex:1,
        
    },
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: '#fff',
    },
    locationText:{
        textAlign:'left',
    },
    upperSideContent:{
        backgroundColor:"#fefefe",
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        justifyContent:'space-between',
        paddingLeft:'5%',
        paddingRight:'5%'

    }
})
export default mapViewRoute;