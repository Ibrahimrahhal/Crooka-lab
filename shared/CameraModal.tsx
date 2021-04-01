import React, { Component } from 'react'
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
import CameraComponent from './CameraComponent';

export default class CameraModal extends Component<any, any> {
    
    render() {
        return (
            <Modal  
            animationType="slide"
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => {
              this.props.closeModal();
            }}>
                {this.props.visible && <View style={styles.ViewContainer}><CameraComponent onShot={this.props.onShot}/></View>}
            </Modal>
        )
    }


}

const styles=  StyleSheet.create({
    ViewContainer: {
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width
    }
})
