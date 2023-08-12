import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where,  arrayUnion } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useState } from 'react'

import AuthContext from '../hooks/context';
import AddListModal from './AddListModel'
import AntDesign  from '@expo/vector-icons/AntDesign'; 

export default function Home({navigation}) {

    let [modalVisible, setModalVisible] = React.useState(false);
    //let [listTitle, setListTitle] = React.useState('');
    const [todos, setTodos] = useState([]);

    const auth = useContext(AuthContext)
    
    
    //console.log(auth.user.email)
    useEffect(()=>{
        //setUid([auth.user.email]);
        //console.log(uid,"1: uid state veriable is updated");
        //Retriving the collection of todos from firestore for logedin user
        const todoRef = collection(FIREBASE_DB, 'TodosList');
        const q = query(todoRef, where('userIds', 'array-contains', auth.user.email))
        const subscriber = onSnapshot(q, {
            next: (snapshot) => {
                console.log('UPDATED');
                const todos=[]
                snapshot.docs.forEach((doc) =>{
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setTodos(todos);

            }
        });
        return () => {
            subscriber();
        };
    },[])


    //write to firestore//
    const AddTodoList = async(title)=>{
        //setListTitle(title);
        const Doc = await addDoc(collection(FIREBASE_DB, 'TodosList'), 
        {title:title, userIds: [auth.user.email]});
        //{title:listTitle, userIds: [auth.user.email]});
        console.log(Doc.id, "added successfully");

        }
        //navigation details page
    const openDetails=(item)=>{
        navigation.navigate('Details',{item});
    }

        const renderTodo = ({item}) => {
            const ref = doc(FIREBASE_DB,`TodosList/${item.id}`)

           
            //deleting todolist from firestore
            const deleteItem = async()=>{
                deleteDoc(ref);
                console.log("delete", item.title, ref);
            };
            return(
              <TouchableOpacity onPress={()=>openDetails(item)} style={styles.item}>
                  <Text style={styles.title}>{item.title}</Text>
                  <TouchableOpacity onPress={deleteItem}>
                      {/* <AntDesign style={styles.delete} name="delete" size={24} color="red" /> */}
                      <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
              </TouchableOpacity>
      
              );
        };

  return (
    <>
    <View style={styles.container}>
    
        <TouchableOpacity 
        style={styles.button}
        onPress={() => setModalVisible(true)} 
        >
          <Text>Add New List</Text>
          
        </TouchableOpacity>
        
        <View style={styles.list}>
            <FlatList
                data={todos}
                renderItem={renderTodo}
                //=> <Item title={item.title} done={item.done} item={item} />}
                keyExtractor={item => item.id}
            />
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddListModal 
          onClose={() => setModalVisible(false)}
          addToDo={(title)=>AddTodoList(title)} 
         />
        </Modal>
        
    </View>
    </>
  )
}
const styles = StyleSheet.create({
    container:{
        marginHorizontal:20,
        marginTop: 80
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
    button:
        { margin:6,
         marginVertical:25,
         alignItems:'center',
         backgroundColor: 'dodgerblue',
         minHeight:40,
         justifyContent:'center',
        },
        list:{
            marginTop: 10,
            height: 600, // Set a specific height here
        },
        item: {
            backgroundColor: 'white',
            borderColor:'grey',
            borderWidth:2,
            borderRadius:20,
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