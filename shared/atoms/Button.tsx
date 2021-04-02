import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, { Component } from 'react';
import { Button as ButtonC} from 'react-native-elements';
class Button extends Component<any,any> {


    getShadowConfig():any{
        this.props.shadow ? {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,    
        elevation: 23
    }:{};
    }

    render() {
        return (
            <ButtonC  {...this.props} containerStyle={{
                ...(this.props.containerStyle || {}),
                ...(this.getShadowConfig())
            }} />
                    )
        }
    }

export default Button;

