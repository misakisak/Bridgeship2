import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function FeedComment ({route}) {
     const [comment, setComment] = useState("")
     const nowUser = route.params.nowUser
     const post = route.params.post
     const icon = route.params.userIcon
     const [ state, setState ] = useState('')
     const loggedInUser = firebase.auth().currentUser
     const userId = loggedInUser.uid
     const [comments, setComments] =useState([])
     const [commentsUser, setCommentsUser] = useState([])
     const navigation = useNavigation()
     const [details, setDetails] = useState([]) 
     // const [icon, setIcon] = useState([])
     const [state1, setState1] = useState(true)
 
     
     // console.log('nowUser')
     // console.log(nowUser)
     // console.log('post')
     // console.log(post)
     if (state1 === false) {
          firebase.firestore()
          .collection('posts')
          .doc(nowUser)
          .collection('userPosts')
          .doc(post)
          .collection('comments')
          .get()
          .then((snapshot) => {
               const newAuthors = [];
               snapshot.forEach(querySnapshot => {
                    const author = {
                         ...querySnapshot.data(),
                         id: querySnapshot.id
                    }
               newAuthors.push(author);
               setComments(newAuthors) 
               console.log('author')
               console.log(author)
               })
               // setComments(newAuthors) 
               console.log(comments.icon)
          })
          firebase.firestore()
          .collection('users')
          .doc(loggedInUser.uid)
          .get()
          .then((snapshot) => {
               setCommentsUser(snapshot.data().name)
          })
          setState('')
          setState1(true)
     }

     useEffect(() => {
          firebase.firestore()
          .collection('posts')
          .doc(nowUser)
          .collection('userPosts')
          .doc(post)
          .collection('comments')
          .get()
          .then((snapshot) => {
               const newAuthors = [];
               snapshot.forEach(querySnapshot => {
                    const author = {
                         ...querySnapshot.data(),
                         id: querySnapshot.id
                    }
               newAuthors.push(author);
               setComments(newAuthors) 
               console.log('author')
               console.log(author)
               })
               // setComments(newAuthors) 
               console.log(comments.icon)
          })
          firebase.firestore()
          .collection('users')
          .doc(loggedInUser.uid)
          .get()
          .then((snapshot) => {
               setCommentsUser(snapshot.data().name)
          })
          setState('')
          setState1(true)

     },[])
     

     const saveComments = () => {
          
          // console.log('details')
          // console.log(details.name)

          // setCommentsUser(details.name)
          // setIcon(details.icon)
          // console.log(icon)

          firebase.firestore()
              .collection('posts')
              .doc(nowUser)
              .collection('userPosts')
              .doc(post)
              .collection("comments")
              .add({
                  commentsUser,
                  icon,
                  userId,
                  comment,
                  creation: firebase.firestore.FieldValue.serverTimestamp()
              })
              setState('Success!!')
          //     navigation.navigate('Team', {resultTeam})
     }

    return (
          <View>
               <TouchableOpacity 
                    style={{marginTop: 6, alignSelf: 'center'}}
                    onPress={()=>setState1(false)}
               >
                    <MaterialCommunityIcons name="reload" color={'#F38181'} size={30}/>
               </TouchableOpacity>
            {/* <Text>{state}</Text> */}
               <TextInput
                    multiline
                    style={styles.input1}
                    placeholder="Write a Comment..."
                    onChangeText={(comment) => setComment(comment)}
               />

               <TouchableOpacity
                    onPress={() => saveComments()}
                    style={styles.button}
               >
                    <Text style={{color: 'white'}}>Post</Text>
               </TouchableOpacity>
               <Text>{state}</Text>

               <ScrollView>
                    <FlatList
                         numColumns={1}
                         horizontal={false}
                         data={comments}
                         keyExtractor={post => post.id}
                         renderItem={({item}) => (
                         <View style={styles.containerImage}>
                              <Image
                                   style={{ height: 70, width: 70, borderRadius: 100, margin: 4}}
                                   source={{uri: item.icon}}
                              />
                              <View style={{flexDirection: 'column'}}>
                                   <Text style={styles.text1}>{item.commentsUser}</Text>
                                   <Text style={styles.text2}>{item.comment}</Text>
                              </View>
                         </View>
                    )}/>
               </ScrollView>

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
      alignSelf: 'center',
      },
      text1: {
           fontSize: 16,
           marginLeft: 7,
           marginBottom: 4,
           fontWeight: '300'
      },
      text2: {
           fontSize: 18,
           marginLeft: 7,
           marginBottom: 4,
           fontWeight: '300'
      },
 })
 
