import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import  Constants  from 'expo-constants';
import LoginForm from '../components/loginForm/LoginForm';


function LoginScreen({navigation}) {

    const IG_LOGO =require('../../assets/pngwing.com.png');
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/pngwing.com.png')} style={{width:140, height:140}} />
            </View>
            <LoginForm navigation={navigation}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        
        flex:1,
        paddingTop: Constants.statusBarHeight,
      },
    logoContainer:{
        alignItems:'center',
        paddingVertical:40,

    }
      
})

export default LoginScreen;