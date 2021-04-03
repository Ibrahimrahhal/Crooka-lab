import SplashScreen from "../shared/components/splash-screen"
import React from "react";
import { View } from "react-native-animatable";


export default ({ loading, render }) => {
  const RenderElm = render;
    if(loading)
      return <SplashScreen />
    else
      return (
        <View style={{flex: 1}} animation="fadeIn" duration={400}>
          <RenderElm />
        </View>
      )
}