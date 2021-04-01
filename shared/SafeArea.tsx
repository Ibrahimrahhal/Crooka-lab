import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBarHeight } from '../modules/utils';

class SafeArea extends Component<any,any> {
    render() {
        return (
            <View style={{...styles.safeArea, ...(this.props.backgroundColor?{backgroundColor:this.props.backgroundColor}:{})}}>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: '#fff',
    }
})
export default SafeArea;