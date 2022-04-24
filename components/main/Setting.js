import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
require('firebase/firestore')


export default function Setting ({route}) {
     const navigation = useNavigation()
     const loggedInUser = firebase.auth().currentUser
     const [post, setPost] = useState([])
     const [ bio, setBio] = useState('')
     const [ icon, setIcon] = useState('')
     // console.log(loggedInUser.uid)

     const onLogout = () => {
          firebase.auth().signOut();
     }
     
     const updateBio = () => {
          firebase.firestore()
          .collection('users')
          .doc(loggedInUser.uid)
          // .collection('userIcon')
          .update({'bio': bio})
    }

    const uploadImage = async() => {
          firebase.firestore()
          .collection('users')
          .doc(loggedInUser.uid)
          .update({'icon': icon })
        const childPath = `profileImage/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
          // console.log(childPath)

        const response = await fetch(icon);
          const blob = await response.blob();

          const task = firebase
               .storage()
               .ref()
               .child(childPath)
               .put(blob);

          const taskProgress = snapshot => {
               // console.log(`transferred: ${snapshot.bytesTransferred}`)
          }

          const taskCompleted = () => {
               task.snapshot.ref.getDownloadURL().then((snapshot) => {
                    saveUserIcon(snapshot);
                    // console.log(snapshot)
               })
          }

          const taskError = snapshot => {
               console.log(snapshot)
          }

          task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const saveUserIcon = (downloadURL) => {
        firebase.firestore()
          .collection('users')
          .doc(loggedInUser.uid)
          .update({'icon': downloadURL })
    }

  
    const pickIcon = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //   mediaTypes: ImagePicker.MediaTypeOptions.All, <- if it was all it allow any type of image, video...
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
          });
          // console.log('result')
          // console.log(result);
    
          if (!result.cancelled) {
              setIcon(result.uri);
          }
          // console.log('icon')
          console.log(icon)
     }; 
     
    //  useEffect(()=> {
         
    //  }, [])

    return (
               <View>
                    <Text>{loggedInUser.uid}</Text> 
                    <TextInput
                         placeholder="Write a Bio..."
                         onChangeText={(bio) => setBio(bio)}
                    />
                    <Text></Text>
                    <Text></Text>

                    <TouchableOpacity 
                        onPress={()=> updateBio()}
                        style={[styles.button2, styles.buttonOutline]}
                    >
                        <Text>Update Bio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=> onLogout()}
                        style={[styles.button2, styles.buttonOutline]}
                    >
                        <Text>Log out</Text>
                     </TouchableOpacity>
               
                    <View style={[styles.buttonContainer, { flexDirection: "row"}]}>
                    
                         <TouchableOpacity
                              onPress={() => pickIcon()}
                              style={styles.button}
                         >
                              <Text style={styles.buttonText}>Pick Icon</Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              onPress={() => uploadImage()}
                              style={styles.button}
                         >
                              <Text style={[styles.buttonText]}>Save Icon</Text>
                         </TouchableOpacity>
                    </View>
               </View>
     )
}

const styles = StyleSheet.create({
     container:{
         flex: 1,
     },
     containerGallery: {
         flex: 1,
     },
     containerImage: {
         flex: 1/3,
         alignItems: 'center'
     },
     image: {
         flex: 1,
         aspectRatio: 1/1,
         width: '70%'
     },
     buttonText: {
         color: 'white',
         fontWeight: '500',
         fontSize: 12,
     },
     buttonContainer: {
         width: '30%',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         margin: 3
     },
     button: {
         // buttonAlign:'center',
         // buttonJustify:'center',
         backgroundColor: '#F38181',
         width: '85%',
         padding: 8,
         borderRadius: 20,
         alignItems: 'center',
         justifyContent: 'center',
         marginLeft:30,
         marginRight:30,
         marginTop:10,
         alignSelf: 'center'
     },
     button3:{
         backgroundColor: 'white',
         width: '50%',
         padding: 10,
         alignItems: 'center',
         margin:5,
         borderRadius:40,
         // marginLeft: 40,
         // marginRight: 40,
         // marginTop: 10,
         alignSelf: 'center',
     },
     text: {
         fontSize: 20,
     },
     button2: {
         // buttonAlign:'center',
         // buttonJustify:'center',
         backgroundColor: 'white',
         width: '30%',
         padding: 10,
         borderRadius: 0,
         alignItems: 'center',
         // marginLeft:30,
         // marginRight:30,
         // marginTop:20,
         alignSelf: 'center'
     },
     buttonOutline: {
         backgroundColor: 'white',
         marginTop: 5,
         // borderColor: '#F38181',
         borderWidth: 1,
     },
 
 })