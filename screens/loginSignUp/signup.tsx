import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import Text from '../../shared/Text';

class signup extends Component<any,any> {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text tooBig bold style={styles.text}>
                اهلا بعودتك
                </Text>
                <Text h5 style={{...styles.text, ...styles.firstInputFeild}}>
                    ادخل رقم هاتفك وكلمة المرور لتسجيل الدخول الى كروكا لاب
                </Text>
                <Input label="رقم الهاتف"  placeholder={"07XXXXXX"}/>
                <Input label="كلمة المرور"  placeholder={"*****"} secureTextEntry={true}  />
                <Button title={"تسجيل الدخول"} containerStyle={styles.button}/>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:'10%',
        paddingLeft:'5%',
        paddingRight:'5%'
      },
      text:{
          color:'#333',
          textAlign: "right",
      },
      firstInputFeild:{
          marginBottom:'10%'
      },
      button:{
          marginTop:"7%"
      }
});
export default signup;