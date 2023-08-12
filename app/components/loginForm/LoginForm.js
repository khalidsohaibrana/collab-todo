import React, { useContext } from 'react';
import {  Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { Formik} from 'formik';
import * as yup from 'yup';
import firebase from '../../../firebaseConfig';
import AuthContext from '../../hooks/context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



function LoginForm({navigation}) {
  const auth = getAuth();
const Validator = require("email-validator");
const authContext = useContext(AuthContext)

const LoginValidationSchema = yup.object().shape(
    {
        email: yup.string().email().required('An email is required'),
        password: yup.string().required().min(8,'Your password has to have atleast 8 characters')
    }
)

const onLogin = async (email, password) => {
    try {
        var result = await signInWithEmailAndPassword(auth, email, password);
        //var result = await firebase.auth().signInWithEmailAndPassword(email, password);
        if(result) { authContext.setUser(result.user); 
        
        
        console.log("Firebase Login Successful", email, password, result.user.uid)}
        
    } catch (error) {
        Alert.alert(error.message);
    }
}


    return (

        <Formik 
            initialValues={{email:'', password:''}}
            onSubmit={(values) => onLogin(values.email, values.password)}
            validationSchema={LoginValidationSchema}
            validateOnMount={true}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid
                    }) =>(

                    <View>
                        <View style={[
                            styles.inputContainer,
                            {
                                borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'
                            }
                            ]}>
                            <TextInput
                                style={styles.inputField}
                                placeholder='Phone number, username or email'
                                placeholderTextColor={'#444'}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoFocus={true}

                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                                value={values.email}
                                

                                
                            />
                        </View>
                        <View style={[
                            styles.inputContainer,
                            {
                                borderColor: 
                                            1 > values.password.length || values.password.length > 7 ? '#ccc' : 'red'
                            }
                            ]}>
                            <TextInput
                                style={styles.inputField}
                                placeholder='Password'
                                placeholderTextColor={'#444'}
                                keyboardType='default'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                autoFocus={true}
                                textContentType={'password'}

                                onBlur={handleBlur('password')}
                                onChangeText={handleChange('password')}
                                value={values.password}
                                
                            />
                        </View>
                            <TouchableOpacity style={{alignItems:'flex-end',padding:6, }}>
                                <Text style={{color:'dodgerblue'}} >Forgot password?</Text>
                            </TouchableOpacity>

                             {/* Submit Button  */}
                            <Pressable 
                                style={styles.button(isValid)} 
                                onPress={handleSubmit} 
                                 disabled={!isValid} 
                                >
                                <Text style={styles.buttonText}>Log In</Text>
                            </Pressable>

                            <View style={styles.signupContainer}>
                                <Text>Don't have an account? </Text>
                                <TouchableOpacity onPress={()=> navigation.push('SignupScreen')} >
                                    <Text style={{color:'dodgerblue'}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            
                    </View>
                )}
            

        </Formik>

    );
}
const styles = StyleSheet.create({
    inputContainer:{
        margin:6,
        borderColor:'#444',
        borderWidth:1.2,
        borderRadius:4,

    },
    inputField:{
        padding:12,
        fontSize:18,
    },
    button:(isValid)=>(
       { margin:6,
        marginVertical:25,
        alignItems:'center',
        backgroundColor: isValid ? 'dodgerblue' : '#6BB0F5' ,
        minHeight:40,
        justifyContent:'center'}
),
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'600',

    },
    signupContainer:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        margin:12
    }
})
export default LoginForm;