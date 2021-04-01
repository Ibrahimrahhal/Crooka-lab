import React, { Component } from 'react';
import { Input as Inp } from 'react-native-elements';

class Input extends Component<any,any> {
    render() {
        return (
            <Inp {...this.props} />
        );
    }
}

export default Input;