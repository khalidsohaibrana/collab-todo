import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import  Constants  from 'expo-constants';
import SignupForm from '../components/signupScreen/SignupForm';
import { Image } from 'react-native';


function SignupScreen({navigation}) {
    const IG_LOGO =require('../../assets/pngwing.com.png');
    return (
        <SafeAreaView>
            <View style={styles.logoContainer}>
            <Image source={require('../../assets/pngwing.com.png')} style={{width:140, height:140}} />
            </View>
            <SignupForm navigation={navigation} />
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

export default SignupScreen;