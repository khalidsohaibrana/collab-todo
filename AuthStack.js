import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignUpScreen';

const Stack = createNativeStackNavigator();
const screenOption ={
    
        headerShown:false
    
}

function AuthStack(props) {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOption}>
    
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='SignupScreen' component={SignupScreen} />
                
                
            </Stack.Navigator>
        </NavigationContainer>
        
    );
           
}

export default AuthStack;
