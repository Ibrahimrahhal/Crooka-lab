import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScene from "../scenes/get-started/get-started-scene";
import AppTourScene from "../scenes/get-started/app-tour-scene";
const Stack = createStackNavigator();

export default (props) => {
  return (
    <Stack.Navigator
      initialRouteName={"get-started"}
      mode={"modal"}
      screenOptions={{
        gestureDirection: "vertical",
      }}
    >
      <Stack.Screen
        name="get-started"
        component={GetStartedScene}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="app-tour"
        component={AppTourScene}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
