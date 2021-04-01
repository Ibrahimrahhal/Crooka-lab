import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Image, TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import config from '../../../config';
import {View as A_View} from 'react-native-animatable';
import { connect } from 'react-redux';
import { addPoint, removePoint } from '../../../actions/actions';
import { getActiveCar } from '../../../app-state/store';
class carSelectComponent extends Component<any,any> {
    render() {
        return (
            <View style={styles.conatainer}>
                <TouchableWithoutFeedback  style={styles.conatainer} onPress={(event)=>{
                    let x = event.nativeEvent.locationX;
                    let y = event.nativeEvent.locationY;
                    if(!event.isTrusted)
                    console.log(x,y)
                    let cancel:any = this.props.points.find((point:any)=>{
                        return (x-(getPointDim()) < (true?point.locationX:point.locationY)) && ((true?point.locationX:point.locationY) < x+(getPointDim())) && 
                        (y-(getPointDim()) < (false?point.locationX:point.locationY)) && ((false?point.locationX:point.locationY) < y+(getPointDim())) 

                    });
                    cancel = cancel || (x <50 && y <50);
                    if(cancel){ console.log(cancel);
                        return;}
                    this.props.addPoint({
                        x,
                        y,
                        ID: Date.now().toString()
                    });
                    console.log(this.props.points)
                }}>
                    <View  style={styles.conatainer}>
                    <Image 
                        source={require('../../../assets/carTopView.png')} 
                        style={styles.carImage}   
                        resizeMode={"contain"}
                    />
                    <View style={styles.pointsContainer}>
                       {this.props.points.map((point:any)=>{
                           return ( <A_View animation={'bounceIn'} key={point.ID} style={{...styles.point,top:(point.locationY-(getPointDim()/2)) || 0, right:(point.locationX-(getPointDim()/2)) || 0}}>
                                        <TouchableOpacity style={styles.btnInnterContainer} onPress={(event)=>{
                                            event.stopPropagation();
                                            event.preventDefault();
                                            this.props.removePoint(point.ID);
                                        }}>
                                        <Icon
                                        name='x'
                                        type='feather'
                                        color={'#fff'}/>
                                        </TouchableOpacity>
                                    </A_View>)
                       })}
                    </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
const getPointDim=()=>{
    return Dimensions.get('window').width*0.12;
}
const styles = StyleSheet.create({

    conatainer:{
        height: Dimensions.get('window').height * 0.65,
        width: Dimensions.get('window').width,
        marginBottom: 30
    },
    carImage:{
        height:'100%',
        width:'100%'
    },
    pointsContainer:{
        position:'absolute',
        height:'100%',
        width:'100%'
    },
    point:{
        height: getPointDim(),
        width: getPointDim(),
        backgroundColor:config.mainColorDarken,
        position:'absolute',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',

    },
    btnInnterContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
const mapStateToProps = (state /*, ownProps*/) => {
    return {
      points: getActiveCar(state)?.crashPoints || [],
    }
  }
  
  const mapDispatchToProps = { addPoint, removePoint }
  
  export default connect(mapStateToProps, mapDispatchToProps)(carSelectComponent);
