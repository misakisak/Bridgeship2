import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';



export default function PostComment ({route}) {
     const [comment, setComment] = useState("")
     // const resultTeam = route.params.resultTeam
     const [ state, setState ] = useState('')
     const loggedInUser = firebase.auth().currentUser
     const userId = loggedInUser.uid
     const [comments, setComments] =useState([])
     // console.log(teamUser.id)
     const navigation = useNavigation()
     // const post = route.params.post
     // console.log(resultTeam.id)
     // console.log(post)

     // const saveComments = (downloadURL) => {
     //      firebase.firestore()
     //          .collection('teams')
     //          .doc(resultTeam.id)
     //          .collection('teamPost')
     //          .doc(post)
     //          .collection("comments")
     //          .add({
     //           //    downloadURL,
     //              userId,
     //              comment,
     //              creation: firebase.firestore.FieldValue.serverTimestamp()
     //          })
     //          setState('Success!!')
     //          navigation.navigate('Team', {resultTeam})
     // }

     // useEffect(() => {
     //      firebase.firestore()
     //      .collection('teams')
     //      .doc(resultTeam.id)
     //      .collection('teamPost')
     //      .doc(post)
     //      .collection('comments')
     //      .then((snapshot) => {
     //           const newAuthors = [];
     //           snapshot.forEach(querySnapshot => {
     //                const author = {
     //                     ...querySnapshot.data(),
     //                     id: querySnapshot.id
     //                }
     //           newAuthors.push(author);
     //           setComments(newAuthors) 
     //           // console.log(comments)
     //           })
     //      })
     // },[])
     
    return (
        <View>
            {/* <Text>{state}</Text> */}
            <TextInput
               placeholder="Write a Comment..."
               onChangeText={(comment) => setComment(comment)}
            />
            <Text></Text>
            <Text></Text>
            <Text></Text>

            <TouchableOpacity
               onPress={() => saveComments()}
            >
                 <Text>Post</Text>
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
                              {/* <Text>{item.comment}</Text> */}
                              {/* <Image
                                   style={styles.image}
                                   source={{uri: item.downloadURL}}
                              /> */}
                         </View>
                       
                    )}
               />
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
