import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';

export default function Teamup ({route}) {
     const [comment, setComment] = useState([])
     const resultTeam = route.params.resultTeam
     const caption = route.params.caption
     const [ state, setState ] = useState('')
     const loggedInUser = firebase.auth().currentUser
     const userId = loggedInUser.uid
     const [comments, setComments] =useState([])
     const navigation = useNavigation()
     const post = route.params.post
     const [icon, setIcon] = useState([])
     const [details, setDetails] =useState([])
     const [commentsUser, setCommentsUser] = useState([])

     

     useEffect(async() => {
          firebase.firestore()
          .collection('teams')
          .doc(resultTeam)
          .collection('teamPost')
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
               // console.log('comments')
               // console.log(comments)
               })
          })
          firebase.firestore()
               .collection('users')
               .doc(loggedInUser.uid)
               .get()
               .then((snapshot) => {
                    setDetails(snapshot.data())
                    console.log(snapshot.data())
               })
               console.log('details')
               
               setCommentsUser(details.name)
               setIcon(details.icon)
               console.log(icon)
          
      
     },[])
     const saveComment = async() => {await
          
          
               // console.log(icon)
               // console.log(commentsUser)
          firebase.firestore()
              .collection('teams')
              .doc(resultTeam)
              .collection('teamPost')
              .doc(post)
              .collection("comments")
              .add({
                  userId,
                  icon,
                  commentsUser,
                  comment,
                  creation: firebase.firestore.FieldValue.serverTimestamp()
              })
              setState('Success!!')      
              console.log('pressed')    
     }
     // console.log(comments.icon)
     
    return (
          <View>
               <Text style={{margin: 13, fontSize: 15, fontWeight: '200'}}>{caption}</Text>
               <TextInput
                    multiline
                    style={styles.input1}
                    placeholder="Write a Comment..."
                    onChangeText={(comment) => setComment(comment)}
               />
               <TouchableOpacity
                    style={styles.button}
                    onPress={() => saveComment()}
               >
                    <Text style={{color: 'white'}}>Comment</Text>
               </TouchableOpacity>
               <Text>{state}</Text>
               <ScrollView>
                    <FlatList
                         numColumns={1}
                         horizontal={false}
                         data={comments}
                         keyExtractor={post => post.id}
                         renderItem={({item}) => (
                         <View style={{flexDirection: 'row'}}>
                              <Image
                                   style={{ height: 50, width: 50, borderRadius: 100, margin: 3}}
                                   source={{uri: item.icon}}
                              />
                              <View style={{flexDirection: 'column'}}>
                                   <Text style={styles.text1}>{item.commentsUser}</Text>
                                   <Text style={styles.text2}>
                                        {item.comment}
                                   </Text>
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
         margin:15,
         padding:10,
         marginTop: 5,
         height: '30%'
     },
     button: {
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
          fontSize: 13,
          marginLeft: 7,
          marginBottom: 4,
          fontWeight: '300'
     },
     text2: {
          fontSize: 16,
          marginLeft: 7,
          marginBottom: 4,
          fontWeight: '300'
     },
})