import React, { Component } from 'react'
import { Camera } from 'expo-camera';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
export default class CameraComponent extends Component<any,any> {
    state = {
        camPrem:null
    }
    camera:Camera | null;
    locked:boolean = true;;
    async componentDidMount(){
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({...this.state, camPrem:status});
    }
    render() {
        return (
            <View style={styles.containerFull}>
                {
                this.state.camPrem?
                <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}  
                onCameraReady={()=>this.locked = false}
                ref={ref => {
                    this.camera = ref;
                  }} >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                        style={{
                        flex: 0.1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        }}
                        onPress={async () => {
                            if(this.locked)
                                return;
                            this.locked = true;
                            var photo;
                            try{
                                if (this.camera) {
                                    photo = await this.camera.takePictureAsync({  base64: true });
                                    this.props.onShot(photo);
                                }
                            }catch(e){

                            }finally{
                                this.locked = false;
                            }
                            console.log(photo)
                            
                        }}>
                        <View style={styles.shotButton}>

                        </View>
                    </TouchableOpacity>
                    </View>
                </Camera>
                 : <View/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerFull:{
        flex:1
    },
    shotButton: {
        height: 65,
        width: 65,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginBottom: '7%'
    }
})
