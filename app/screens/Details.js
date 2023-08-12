import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { Component, useState, useContext } from 'react'
import { useEffect } from 'react';


import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where,  arrayUnion } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign  from '@expo/vector-icons/AntDesign';
import Entypo  from '@expo/vector-icons/Entypo';

import AuthContext from '../hooks/context'

export default function Details({navigation, route}) {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [collab, setCollab] = useState('');
    const [uid, setUid] = useState([]);
    //const [data, setData] = useState('');
    
    const auth = useContext(AuthContext);

    const data = route.params.item;
    console.log(data)

    // parent document
    const parentDocRef = doc(FIREBASE_DB, 'TodosList', data?.id);
    console.log(data.id)
    // subcollection under the parent document
    const subcollectionRef = collection(parentDocRef, 'todos');
    
    
    useEffect(() => {

            const subscriber = onSnapshot(subcollectionRef, {
            next: (snapshot) => {

                console.log('UPDATED');
                const todos1=[]
                snapshot.docs.forEach((doc) =>{
                    todos1.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setTodos(todos1);
                //console.log(todos1)
            }
        });

        return () => {
            subscriber();
        };   
    }, []);

    
    //write to firestore
    const AddTodo = async()=>{
        // adding documents to the subcollection using subcollectionRef
        try {
            const newSubDocRef = await addDoc(subcollectionRef, 
                {title:todo, done:false});
                setTodo('');
            console.log('Subcollection document added with ID:', newSubDocRef.id);
        } catch (error) {
            console.error('Error adding subcollection document:', error);
        }
        
    }

    //Update UserIds Array / Adding collaborator to list of todos//
    const addCollab = async () => { 
        const newUserIdToAdd = collab; 
        const listRef = parentDocRef;
        await updateDoc(listRef, {
            userIds: arrayUnion(newUserIdToAdd)
        });
        setCollab('');
        alert('Collaborater added successfully')
    };

    //rendring the collection
    const renderTodo = ({item}) => {
        const ref = doc(subcollectionRef,`/${item.id}`)
        //todo toggle update to firestore
        const toggleDone = async()=>{
        updateDoc(ref,{ done: !item.done});
        };
       
        //deleting todo from firestore
        const deleteItem = async()=>{
            deleteDoc(ref);
        };
        // rendering flat list
        return(
          <View style={styles.item}>
              <TouchableOpacity style={styles.todos} onPress={toggleDone}>
  
              {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
              {!item.done && <Entypo name="circle" size={24} color="black" />}
              </TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={deleteItem}>
                  <AntDesign style={styles.delete} name="delete" size={24} color="red" />
              </TouchableOpacity>
          </View>
          );
        };
   
  return (
    <>
        <View style={styles.container}>
            <View>
            <Text> Title: {data.title}</Text>
            </View>


            <View style={styles.form}>
                <TextInput style={styles.input} placeholder='Add Todo here' value={todo} onChangeText={(text)=> setTodo(text)} ></TextInput>
                <Button title='Add Todo' onPress={()=>AddTodo()} disabled={todo===''}/>
            </View>
            <View style={styles.form}>
                <TextInput 
                        style={styles.input} 
                        placeholder='Add Collaborator' 
                        value={collab} 
                        onChangeText={(text)=> setCollab(text)}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoFocus={false}

                ></TextInput>

                <Button title='Add Collaborator' onPress={()=>addCollab()} disabled={collab===''}/>
            </View>

            <View style={styles.list}>
                <FlatList
                    data={todos}
                    renderItem={renderTodo}
                    //=> <Item title={item.title} done={item.done} item={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
 
    </>
    
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginTop:80,
    },
    form: {
        alignItems:'center',
        flexDirection: 'row',
        padding: 5,
        marginVertical: 10,
        
    },
    input: {
        flex:1,
        paddingHorizontal:10,
        height:60,
        fontSize: 32,
        borderWidth:1,
        borderRadius:8,

        
    },
    list:{
        marginTop: 10,
        height: 600, // Set a specific height here
    },
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection:'row',
        alignItems:'center',
        
      },
      title: {
        paddingStart:10,
        fontSize: 32,
        flex:1
      },
      todos:{
        flexDirection:'row',
        alignItems:'center',

      },
      delete:{
       
        
      }
    
})