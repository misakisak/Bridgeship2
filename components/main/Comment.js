import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';



export default function Teamup ({route}) {
     const [comment, setComment] = useState("")
     const resultTeam = route.params.resultTeam
     const [ state, setState ] = useState('')
     const loggedInUser = firebase.auth().currentUser
     const userId = loggedInUser.uid
     const [comments, setComments] =useState([])
     // console.log(teamUser.id)
     const navigation = useNavigation()
     const post = route.params.post
     // console.log(resultTeam.id)
     // console.log(post)

     const saveComment = () => {
          firebase.firestore()
              .collection('teams')
              .doc(resultTeam)
              .collection('teamPost')
              .doc(post)
              .collection("comments")
              .add({
                  userId,
                  comment,
                  creation: firebase.firestore.FieldValue.serverTimestamp()
              })
              setState('Success!!')
          //     console.log(post)
     }

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
     //           console.log(comments)
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
               onPress={() => saveComment()}
            >
                 <Text>Comment</Text>
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
                              {/* <Text style={styles.post}>
                                   {item.caption}
                              </Text>
                              <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'stretch'}}>
                                   <TouchableOpacity>
                                        <Text>Like</Text>
                                        <MaterialCommunityIcons name="heart" color={'#FCE38A'} size={25}/>
                                   </TouchableOpacity>
                                   <TouchableOpacity>
                                        <Text>Like</Text>
                                        <MaterialCommunityIcons name="account-group" color={'#FCE38A'} size={25}/>
                                   </TouchableOpacity>
                                   <TouchableOpacity>
                                        <Text>Like</Text>
                                        <MaterialCommunityIcons name="hand-peace" color={'#FCE38A'} size={25}/>
                                   </TouchableOpacity>
                                   <TouchableOpacity onPress={() => navigation.navigate("Comment", {resultTeam, post})}>
                                        <Text>Like</Text>
                                        <MaterialCommunityIcons name="chat" color={'#FCE38A'} size={25}/>
                                   </TouchableOpacity>
                              </View> */}
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
