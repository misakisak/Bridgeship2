import React, {useState} from 'react'
import { View, TextInput, Image, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")
// import { useNavigation } from '@react-navigation/native';



export default function Post(props, {naivgation}) {
     // console.log(props.route.params.image)
     const [caption, setCaption] = useState("")
     const user = firebase.auth().currentUser.uid
     const like = 0
     const [icon, setIcon] = useState('')
     const [details, setDetails] = useState([])


     firebase.firestore()
          .collection('users')
          .doc(user)
          .get()
          .then((snapshot) => { 
               setDetails(snapshot.data().name)
               setIcon(snapshot.data().icon)
          })
          // console.log('icon')
          // console.log(icon)
          // setIcon(details.icon)
          

     // const navigation = useNavigation()

     // const uploadImage = async () => {
     //      const uri = props.route.params.image;
     //      const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
     //      // console.log(childPath)

     //      const response = await fetch(uri);
     //      const blob = await response.blob();

     //      const task = firebase
     //           .storage()
     //           .ref()
     //           .child(childPath)
     //           .put(blob);

     //      const taskProgress = snapshot => {
     //           // console.log(`transferred: ${snapshot.bytesTransferred}`)
     //      }

     //      const taskCompleted = () => {
     //           task.snapshot.ref.getDownloadURL().then((snapshot) => {
     //                savePostData(snapshot);
     //                // console.log(snapshot)
     //           })
     //      }

     //      const taskError = snapshot => {
     //           console.log(snapshot)
     //      }

     //      task.on("state_changed", taskProgress, taskError, taskCompleted);
     // }

     const savePostData = () => {
          

          firebase.firestore()
              .collection('posts')
              .doc(firebase.auth().currentUser.uid)
              .collection("userPosts")
              .add({
               //    downloadURL,
                  caption,
                  creation: firebase.firestore.FieldValue.serverTimestamp(),
                  user,
                  like,
                  icon,
                  details,

              }).then((function () {
                  props.navigation.popToTop()
              }))
     }

     return (
          <View style={{flex: 1}}>
               {/* <Image source={{uri: props.route.params.image}}/> */}
               <TextInput
                    style={styles.input1}
                    placeholder="Write a Caption..."
                    onChangeText={(caption) => setCaption(caption)}
               />
               {/* <Button title="Save" onPress={() => uploadImage()}/> */}
               {/* <Button title="Post" onPress={() => savePostData()}/> */}
               <TouchableOpacity 
                    onPress={()=> savePostData()}
                    style={styles.button}
               >
                    <Text>Post</Text>
               </TouchableOpacity>
          </View>
     )
}

const styles = StyleSheet.create({
     container:{
         flex: 1,
     },
     containerInfo: {
         margin: 20,
 
     },
     containerGallery: {
         flex: 1,
     },
     containerImage: {
         flex: 1/3,
         flexDirection: 'row'
     },
     image: {
         flex: 1,
         aspectRatio: 1/1,
     },
     input1: {
         backgroundColor: 'white',
         paddingVertical:10,
         borderRadius: 0,
         borderColor:'#95E1D3',
         borderWidth:2,
         margin:10,
         padding:10,
         marginTop: 5,
         height: '20%'
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
      text1: {
           fontSize: 15,
           marginLeft: 7,
           marginBottom: 4
      },
      text2: {
           fontSize: 18,
           marginLeft: 7,
           marginBottom: 4
      },
 })
 