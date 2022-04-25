import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons'; 

require('firebase/firestore')


export default function Teamup ({route}) {
     const navigation = useNavigation()
     const resultTeam = route.params.resultTeam
     const [post, setPost] = useState([])

     useEffect(async()=> {
          // console.log(route.params.resultTeam)
          firebase.firestore()
          .collection('teams')
          .doc(resultTeam.id)
          .collection('teamPost')
          .get()
          .then((snapshot) => {
               const newAuthors = [];
                   snapshot.forEach(querySnapshot => {
                       const author = {
                            ...querySnapshot.data(),
                            id: querySnapshot.id
                    }
                         newAuthors.push(author);
               })
          setPost(newAuthors) 
          })


          // console.log(post)
          // console.log('--------------')
          // console.log(post[0])
     }, [])

     // const onCountLike = () => {
     //      firebase.firestore()
     //      .collection("teams")
     //      .doc(resultTeam)
     //      .collection("like")
     //      .set({})
     //      .then(() => {
     //          setFollowing(true)
     //      })
     // }

     // console.log('post.id')

     // console.log(post)

    return (
          <ScrollView>
          <View style={styles.containerImage}>
               <Text style={styles.text}>{resultTeam.teamName}</Text>             
                    <FlatList
                         numColumns={1}
                         horizontal={false}
                         data={post}
                         keyExtractor={post => post.id}
                         renderItem={({item}) => (
                              <View style={styles.containerImage}>
                                   {/* <Image
                                        style={styles.image}
                                        source={{uri: item.downloadURL}}
                                   /> */}
                                   <Text style={styles.post}>
                                        {item.caption}
                                   </Text>
                                   <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'stretch'}}>
                                        <TouchableOpacity style={{margin: 5}}>
                                             <MaterialCommunityIcons name="thumb-up-outline" color={'#FCE38A'} size={25}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{margin: 5}}>
                                             <FontAwesome name="handshake-o" size={25} color={'#FCE38A'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                             onPress={() => navigation.navigate("Comment", {resultTeam: resultTeam, post: post})}
                                             style={{margin: 5}}
                                        >
                                             <MaterialCommunityIcons name="chat-outline" color={'#FCE38A'} size={25}/>
                                        </TouchableOpacity>
                                   </View>
                              </View>
                    )}
               />
          </View>
          </ScrollView>
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
        height: '100%',
        backgroundColor: 'white',
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
    post: {
         fontSize: 20,
         margin: 10
    },
    color: {
         color: '#EAFFD0'
    }
})
