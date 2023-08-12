// import { View, Text, Button, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
// import React, { useContext } from 'react'
// import { useEffect } from 'react'
// import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where,  arrayUnion } from 'firebase/firestore'
// import { FIREBASE_DB } from '../../firebaseConfig'
// import { useState } from 'react'
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Entypo, AntDesign } from '@expo/vector-icons';
// import { async } from '@firebase/util'
// import AuthContext from '../hooks/context'


// export default function Lists({navigation}) {
//     const [todos, setTodos] = useState([]);
//     const [todo, setTodo] = useState('');
//     const [collab, setCollab] = useState('');
//     const [uid, setUid] = useState([]);

//     const auth = useContext(AuthContext)
    
    
//     //console.log(auth.user.email)
//     useEffect(()=>{
    
//         setUid([auth.user.email]);
//         console.log(uid,"1: uid state veriable is updated");
//         //Retriving the collection of todos from firestore for logedin user
//         const todoRef = collection(FIREBASE_DB, 'todos');
//         const q = query(todoRef, where('userIds', 'array-contains', auth.user.email))
//         const subscriber = onSnapshot(q, {
//             next: (snapshot) => {

//                 console.log('UPDATED');

//                 const todos1=[]
                
//                 snapshot.docs.forEach((doc) =>{
//                     todos1.push({
//                         id: doc.id,
//                         ...doc.data()
//                     })
//                 })
//                 setTodos(todos1);

//             }
//         });
//         return () => {
//             subscriber();
//         };
//     },[])
   
//     //write to firestore
//     const AddTodo = async()=>{
//        const Doc = await addDoc(collection(FIREBASE_DB, 'todos'), 
//        {title:todo, done:false, userIds: [auth.user.email]});
//        console.log(Doc.id, "added successfully");
//     }


//     //testing//
//     const addCollab = async () => {
//         const currentUserUid = auth.user.email; // Replace with actual current user's UID
//         //console.log(currentUserUid);
        
//         const newUserIdToAdd = collab; // Replace with the new user ID you want to add
//         // setUid(prevUids => [...prevUids, newUserIdToAdd]);
//         // console.log(uid,"2: uid state veriable is updated");

//         // Reference to the todos collection
//     const todosRef = collection(FIREBASE_DB, 'todos');

//     // Get all documents in the todos collection
//     const querySnapshot = await getDocs(todosRef);

//     // Update the user IDs array for each document
//     querySnapshot.forEach(async (doc) => {
//         const todoData = doc.data();
        
//         if (todoData.userIds && todoData.userIds.includes(currentUserUid)) {
//             const todoRef = doc.ref;
//             // Update the document's userIds array to include the new user
//             await updateDoc(todoRef, {
//                // userIds: arrayUnion(uid)
//                 userIds: arrayUnion(newUserIdToAdd)
//             });
//         }
//     });
// };
    


//     //end-testing///
 
//     //adding collaborator to user collection
//     // const addCollab =async()=>{
//     //     const ref = doc(FIREBASE_DB,`todos/${item.id}`)
//     //     const cq= query(ref, where('userId', '==', auth.user.uid))
//     //     updateDoc(cq,{ emailId: auth.user.email});
//     // }

//     //rendring the collection
//     const renderTodo = ({item}) => {
//         const ref = doc(FIREBASE_DB,`todos/${item.id}`)
//         //todo toggle update to firestore
//         const toggleDone = async()=>{
//         updateDoc(ref,{ done: !item.done});
//         };
       
//         //deleting todo from firestore
//         const deleteItem = async()=>{
//             deleteDoc(ref);
//         };
//         return(
//           <View style={styles.item}>
//               <TouchableOpacity style={styles.todos} onPress={toggleDone}>
  
//               {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green" />}
//               {!item.done && <Entypo name="circle" size={24} color="black" />}
//               </TouchableOpacity>
//               <Text style={styles.title}>{item.title}</Text>
//               <TouchableOpacity onPress={deleteItem}>
//                   <AntDesign style={styles.delete} name="delete" size={24} color="red" />
//               </TouchableOpacity>
//           </View>
  
//           );
//     };
    
//   return (
//     <>
//     <View style={styles.container}>
//         <View style={styles.form}>
//             <TextInput style={styles.input} placeholder='Add Todo here' value={todo} onChangeText={(text)=> setTodo(text)} ></TextInput>
//             <Button title='Add Todo' onPress={()=>AddTodo()} disabled={todo===''}/>
//         </View>
//         <View style={styles.form}>
//             <TextInput 
//                     style={styles.input} 
//                     placeholder='Add Collaborator' 
//                     value={collab} 
//                     onChangeText={(text)=> setCollab(text)}
//                     keyboardType='email-address'
//                     autoCapitalize='none'
//                     autoFocus={false}

//             ></TextInput>

//             <Button title='Add Collaborator' onPress={()=>addCollab()} disabled={collab===''}/>
//         </View>
        
//     </View>

//     <View style={styles.list}>
//     <FlatList
//         data={todos}
//         renderItem={renderTodo}
//         //=> <Item title={item.title} done={item.done} item={item} />}
//         keyExtractor={item => item.id}
//       />
//     </View>
//     </>

//   )
// }
// const styles = StyleSheet.create({
//     container:{
//         marginHorizontal:20,
//     },
//     form: {
//         alignItems:'center',
//         flexDirection: 'row',
//         padding: 5,
//         marginVertical: 10,
        
//     },
//     input: {
//         flex:1,
//         paddingHorizontal:10,
//         height:60,
//         fontSize: 32,
//         borderWidth:1,
//         borderRadius:8,

        
//     },
//     list:{
//         marginTop: 10,
//         height: 600, // Set a specific height here
//     },
//     item: {
//         backgroundColor: 'white',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         flexDirection:'row',
//         alignItems:'center',
        
//       },
//       title: {
//         paddingStart:10,
//         fontSize: 32,
//         flex:1
//       },
//       todos:{
//         flexDirection:'row',
//         alignItems:'center',

//       },
//       delete:{
       
        
//       }
    
// })