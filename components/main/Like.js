import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';



export default function Like ({route}) {
     const [comment, setComment] = useState("")
     const nowUser = route.params.nowUser
     const postId = route.params.postId
     const [ state, setState ] = useState('')
     const loggedInUser = firebase.auth().currentUser
     const userId = loggedInUser.uid
     const [comments, setComments] =useState([])
     const [commentsUser, setCommentsUser] = useState([])
     const navigation = useNavigation()
     const [details, setDetails] = useState([]) 
     const [icon, setIcon] = useState([])
     
     // console.log('nowUser')
     // console.log(nowUser)
     // console.log('post')
     // console.log(post)

     useEffect(() => {
          // const a = await
          firebase.firestore()
          .collection('posts')
          .doc(nowUser)
          .collection('userPosts')
          .doc(postId)
          .collection('like')
          .get()

          // const followingIds= [];
          //      a.forEach (following => {
          //      followingIds.push(following.id);
          // });
          // console.log(followingIds)
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

     },[])
     
    return (
          <View>
            {/* <Text>{state}</Text> */}
               <ScrollView>
                    <FlatList
                         numColumns={1}
                         horizontal={false}
                         data={comments}
                         keyExtractor={post => post.id}
                         renderItem={({item}) => (
                         <View style={styles.containerImage}>
                              <Image
                                   style={{ height: 70, width: 70, borderRadius: 100}}
                                   source={{uri: item.icon}}
                              />
                              <Text>{item.commentsUser}</Text>
                              <Text>{item.comment}</Text>
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
        marginTop: 5
    },
})
