import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddCars from './AddCars';
import { Accident } from '../../../models/accident';
import SelectCrashPlaces from './SelectCrashPlaces';
import { Car } from '../../../models/car';
import TakePicturesOfCar from './takePicturesOfCar';
import ScanDocs from './scanDocs/ScanDocs';
import AddOneCar from './addOneCar';
import { StoreType } from '../../../app-state/store-type';
import { getActiveAccident, getActiveCar } from '../../../app-state/store';
import { connect }  from 'react-redux';
import { initAccident } from '../../../actions/actions';
const Stack = createStackNavigator();

class StartingPointComponent extends Component<any, any> {

    componentDidMount(){
        this.props.initAccident();
        setTimeout(()=>{
            console.log("sasasasa",this.props.accident)
        }, 20)
    }

    render() {
        return (
            <Stack.Navigator initialRouteName={"addCars"} mode={'modal'} screenOptions={{
                gestureDirection: 'vertical'
            }} >
                <Stack.Screen name={'addCars'} options={{
                    // headerShown:false,
                    headerTitle:"المركبات المتضمنة بالحادث",
                    title:"المركبات المتضمنة بالحادث",
                    headerTitleStyle:{
                        fontFamily:'custom-bold',
                        textAlign:'left'
                    },
                    headerTitleAlign:'center'

                }}>
                    {(props)=>{
                       return ( <AddCars {...props} cars={this.state && this.state.accident && this.state.accident.getCars()}/> )
                    }}
                </Stack.Screen>
                <Stack.Screen name={'selectCrashPlaces'} options={{
                    // headerShown:false,
                    headerTitle:"اختيار مكان اصابة مكان المركبة",
                    title:"اختيار مكان اصابة مكان المركبة",
                    headerTitleStyle:{
                        fontFamily:'custom-bold',
                        textAlign:'left'
                    },
                    headerStyle:{
                        direction:'rtl'
                    }

                }}>
                    {(props)=>{
                        return <SelectCrashPlaces {...props}/>
                    }}
                </Stack.Screen>
                <Stack.Screen name={'addOneCar'} options={{
                    // headerShown:false,
                    headerTitle:"اضافة مركبة",
                    title:"اضافة مركبة",
                    headerTitleStyle:{
                        fontFamily:'custom-bold',
                        textAlign:'left'
                    },
                    headerStyle:{
                        direction:'rtl'
                    }
                }}>
                    {(props)=>{
                        return <AddOneCar {...props}/>
                    }}
                </Stack.Screen>
                <Stack.Screen name={'takePicturesOfCar'} options={{
                    // headerShown:false,
                    headerTitle:"اختيار مكان اصابة مكان المركبة",
                    title:"اختيار مكان اصابة مكان المركبة",
                    headerTitleStyle:{
                        fontFamily:'custom-bold',
                        textAlign:'left'
                    },
                    headerStyle:{
                        direction:'rtl'
                    }

                }}>
                    {(props)=>{
                        return <TakePicturesOfCar {...props}/>
                    }}
                </Stack.Screen>
                <Stack.Screen name={'scanDocs'} options={{
                    // headerShown:false,
                    headerTitle:"مسح الوثائق المطلوبة",
                    title:"مسح الوثائق المطلوبة",
                    headerTitleStyle:{
                        fontFamily:'custom-bold',
                        textAlign:'left'
                    },
                    headerStyle:{
                        direction:'rtl'
                    }

                }}>
                    {(props)=>{
                        return <ScanDocs {...props}/>
                    }}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }
}

const mapStateToProps = (state:StoreType) => {
    return {
      accident: getActiveAccident(state),
    }
  }
const mapDispatchToProps = { initAccident }
  
export default connect(mapStateToProps, mapDispatchToProps)(StartingPointComponent)