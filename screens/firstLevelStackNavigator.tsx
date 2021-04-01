import React, { Component } from 'react';
import { routeConfigs as getStartedConfigs} from './getStartedScreen/getStartedScreen';
import { routeConfigs as appTourConfigs} from './appTour/appTour';
import { routeConfigs as signInUpConfigs} from './loginSignUp/loginSignup';
import { routeConfigs as homeConfig} from './home/home';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
class firstLevelStackNavigator extends Component {
    render() {
        return (
        <Stack.Navigator initialRouteName={"getStarted"} mode={'modal'} screenOptions={{
            gestureDirection: 'vertical'
        }} >
            <Stack.Screen {...(getStartedConfigs as any)} />
            <Stack.Screen {...(appTourConfigs as any)} />
            <Stack.Screen {...(signInUpConfigs as any)} />
            <Stack.Screen {...(homeConfig as any)} />
        </Stack.Navigator>
        );
    }
}

export default firstLevelStackNavigator;