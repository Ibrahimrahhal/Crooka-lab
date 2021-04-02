import { View } from "react-native-animatable";
import React from 'react'
export default (props:any)=>((props.if && props.children) || <View></View>);