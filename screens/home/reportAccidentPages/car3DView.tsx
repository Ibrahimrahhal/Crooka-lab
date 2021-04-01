import React, { Component } from 'react'
import { View } from 'react-native-animatable'
import { StatusBar, TextInput, StyleSheet } from 'react-native'
import Text from '../../../shared/Text';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Asset } from 'expo-asset';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import {
    AmbientLight,
    BoxBufferGeometry,
    Fog,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SpotLight,
  } from 'three';
import * as THREE from "three";
import  ExpoTHREE, {Renderer, TextureLoader}  from "expo-three";
import { View as GraphicsView } from 'expo-graphics';
import config from '../../../config';
export default class car3DView extends Component<any, any> {
    obj:any = null;
    state:any = {obj:{}};   
    renderer;
    scene;
    camera;
    cube;
    render() {
        return (
            <React.Fragment>
            <View style={styles.container}>
                <GraphicsView
                style={{ flex: 1 }}
                onContextCreate={this.onContextCreate}
                onRender={this.onRender}
                />
            </View>
            </React.Fragment>
        )
    }

    renderInit = async (gl: ExpoWebGLRenderingContext) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0x6ad6f0;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);

        const camera = new PerspectiveCamera(50, width / height, 0.01, 1000);
        camera.position.set(-1.07383, 16.3668, 1.25025);

        const scene = new Scene();
        scene.fog = new Fog(sceneColor, 1, 10000);

        const ambientLight = new AmbientLight(0x101010);
        scene.add(ambientLight);

        const pointLight = new PointLight(0xffffff, 2, 1000, 1);
        pointLight.position.set(0, 200, 200);
        scene.add(pointLight);

        const spotLight = new SpotLight(0xffffff, 0.5);
        spotLight.position.set(0, 500, 100);
        spotLight.lookAt(scene.position);
        scene.add(spotLight);

     //    const cube = new IconMesh();
         var obj = await getObject()
         // obj.children.forEach(x=>x.setHex)
         scene.add(obj);
         this.setState({obj:{x:obj.rotation.x, y:obj.rotation.y}})
         this.obj = obj
        //  this.obj = obj.rotateX(10)

        camera.lookAt(obj.position);

        function update() {
         //  obj.rotation.y += 0.05;
         //  obj.rotation.x = 45;
        }

        // Setup an animation loop
        const render = () => {
          let timeout = requestAnimationFrame(render);
          update();
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };
        render();
      }

      onChangeText =(numb:number, text:string)=>{
          let num = parseInt(text);
          this.obj.rotation[numb ==1 ? 'x':'y'] = num;
          this.state.obj[numb ==1 ? 'x':'y'] = num;
          this.setState({...this.state})
      }

        // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(config.mainColor)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.x = -1;
    this.camera.position.y = 16.3668;
    this.camera.position.z = 1.25025;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);
    //var obj = await getObject()
    //this.obj = obj;
    //this.scene.add(obj);

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  };

  onRender = delta => {
    // this.obj.rotation.x += 3.5 * delta;
    // this.obj.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}



async function getObject():Promise<THREE.Group>{
    return new Promise(async (resolve, reject)=>{
    const asset = Asset.fromModule(require('./tt.obj'));
    await asset.downloadAsync();
    const loader = new OBJLoader();
    if(asset.localUri != null)
    loader.load(asset.localUri, group => {
      resolve(group);
    });
    })
}

const styles = StyleSheet.create({
    safe:{
        flex:1,
        width:'100%',
    },
    container:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#121212'
    },
    text:{
        color:'#ffffff',
        fontSize:30,
        textAlign:'center'
    }
    
});
