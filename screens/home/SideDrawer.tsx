import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../shared/Text';
import SafeArea from '../../shared/SafeArea';
import config from '../../config';
import Button from '../../shared/Button';
class SideDrawer extends Component<any,any> {
    render() {
        return (
            <View style={styles.container}>
                <SafeArea backgroundColor={config.mainColor} />
                <Button title={'asdasd'} onPress={()=>{
                    this.props.stack.navigation.replace('reportAccident')
                }}>
                    
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:config.mainColor
    }
})
export default SideDrawer;