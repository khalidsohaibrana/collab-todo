import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react';
//import AppStyles from '../appStyles/AppStyles';


export default function AddListModal(props){
    let [title, setTitle] = React.useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDos List</Text>
      <TextInput 
          style={[styles.textInput, styles.darkTextInput]} 
          placeholder='Title'
          value={title}
          onChangeText={setTitle} />
          
      <View style={[styles.rowContainer, styles.rightAligned, styles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addToDo(title);
          setTitle("");
          props.onClose();
        }} />
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    },

    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "stretch",
      marginVertical: 4,
    },

    rightAligned: {
      justifyContent: "flex-end"
    },
    

    header: {
      fontSize: 20,
      alignSelf: "center"
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 8,
      borderBottomWidth: 2,
      marginVertical: 8
    },
    lightTextInput: {
      borderBottomColor: "#ffffff"
    },
    darkTextInput: {
      borderBottomColor: "#000000"
    },

})