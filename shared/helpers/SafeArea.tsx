import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBarHeight } from '../../modules/utils';

const styles = StyleSheet.create({
    safeArea:{
        width:'100%',
        height:StatusBarHeight,
        backgroundColor: '#fff',
    }
})
export default (props) => <View style={{...styles.safeArea, ...(props.backgroundColor?{backgroundColor:props.backgroundColor}:{})}} />;