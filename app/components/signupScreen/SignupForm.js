import React from 'react';
import {  Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { Formik} from 'formik';
import * as yup from 'yup';
import firebase, { FIREBASE_AUTH } from '../../../firebaseConfig';

function SignupForm({navigation}) {
    const Validator = require("email-validator");

const LoginValidationSchema = yup.object().shape(
    {
        email: yup.string().email().required('An email is required'),
        username: yup.string().required().min(2,'A username is required'),
        password: yup.string().required().min(8,'Your password has to have atleast 8 characters')
    }
)

const onSignUp = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        navigation.navigate('LoginScreen');
        console.log("Firebase User Created Successfully", email , password)
    } catch (error) {
        Alert.alert(error.message)
    }
}

    return (

        <Formik 
            initialValues={{email:'', password:'', username:''}}
            onSubmit={(values) => onSignUp(values.email, values.password)}
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
                                placeholder='Email'
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
                                            1 > values.username.length || values.username.length > 1 ? '#ccc' : 'red'
                            }
                            ]}>
                            <TextInput
                                style={styles.inputField}
                                placeholder='Username'
                                placeholderTextColor={'#444'}
                                keyboardType='username'
                                autoCapitalize='none'
                                autoFocus={true}

                                onBlur={handleBlur('username')}
                                onChangeText={handleChange('username')}
                                value={values.username}
                                

                                
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
                            
                            

                             {/* Submit Button  */}
                            <Pressable 
                                style={styles.button(isValid)} 
                                onPress={handleSubmit} 
                                 disabled={!isValid} 
                                >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </Pressable>

                            <View style={styles.signupContainer}>
                                <Text>Already have an account? </Text>
                                <TouchableOpacity onPress={()=> navigation.push('LoginScreen')} >
                                    <Text style={{color:'dodgerblue'}}>Log In</Text>
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
        marginVertical:60,
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
export default SignupForm;