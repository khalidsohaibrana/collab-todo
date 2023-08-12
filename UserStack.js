import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Lists from './app/screens/Lists';
import Details from './app/screens/Details';
import Home from './app/screens/Home';
import { Button } from 'react-native';
import AuthContext from './app/hooks/context';



const Stack = createNativeStackNavigator();

// const screenOption = () => ({
//     title: 'Home',
//     headerRight: () => (
//       <Button title="LOGOUT"   />
//     ),
//   });



export default function UserStack() {
    const Auth = useContext(AuthContext);
    const logout=()=>{Auth.setUser(null)};
  return (
    <NavigationContainer >
            <Stack.Navigator initialRouteName='Home'  >
                <Stack.Screen  
                        name='Home' 
                        component={Home} 
                        options={
                            {headerRight: () => (
                            <Button title="LOGOUT" onPress={logout}  />
                            )}
                        }
                />
                
                <Stack.Screen name='Details' component={Details}/>       
                {/* <Stack.Screen name='MyTodos' component={Lists}/>        */}
            </Stack.Navigator>
        </NavigationContainer>
  );
}


