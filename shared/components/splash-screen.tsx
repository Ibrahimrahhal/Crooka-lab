import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
export default () => {
    return (
        <View style={styles.mainContainer}>
            <Animatable>
                <Image
                    source={require('../../assets/images/logo-center.png')}
                />
            </Animatable>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})