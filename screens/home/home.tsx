import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Text from '../../shared/Text';
import * as Location from 'expo-location';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapViewRoute from './mapViewRoute';
import * as Animatable from 'react-native-animatable';
import SideDrawer from './SideDrawer';
import { createStackNavigator } from '@react-navigation/stack';
import AddCars from './reportAccidentPages/AddCars';
import StartingPointComponent from './reportAccidentPages/StartingPointComponent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class home extends Component<any,{
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
    navigation:any;
    setNavigation= (navigation:any)=> this.navigation = navigation;

    render() {
        
        return (
            <Stack.Navigator initialRouteName={"mapView"} mode={'modal'} screenOptions={{
                gestureDirection: 'vertical'
            }} >
                <Stack.Screen name={"mapView"} options={{ headerShown:false }}>
                    {(stackprops)=>{
                        return (
                        <View style={styles.container}>
                            <Drawer.Navigator  drawerPosition={'left'} drawerType={'slide'} initialRouteName="Home" drawerContent={(props:any)=><SideDrawer stack={stackprops} {...props}/>}>
                                <Drawer.Screen name="Home">
                                    {(props)=><MapViewRoute stackProps={stackprops}  {...props} returnNavigation={this.setNavigation}/>}
                                </Drawer.Screen>
                            </Drawer.Navigator>
                        </View>
                        )
                    }}
                </Stack.Screen>
                <Stack.Screen name={"reportAccident"} options={{ headerShown:false }}>
                    {(props)=>{
                        return ( <StartingPointComponent {...props}/>)
                    }}
                </Stack.Screen >
            </Stack.Navigator>
        );
    }
}
export const routeConfigs = {
    name: "home",
    component: home,
    options:{
        headerShown:false
    }
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1
    }
})
export default home;