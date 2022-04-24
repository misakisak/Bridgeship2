import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
// import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

require('firebase/firestore')

export default function Teamup ({route}) {
     const navigation = useNavigation()
     const resultTeam = route.params.resultTeam
     const [post, setPost] = useState([])
     const [post1, setPost1] = useState([])
     //  

     useEffect(()=> {
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

     const onCountLike = () => {
          firebase.firestore()
          .collection("teams")
          .doc(resultTeam.id)
          .collection("like")
          .set({})
          .then(() => {
              setFollowing(true)
          })
     }

     // const onComment = () => {
     //      firebase.firestore()
     //      .collection("teams")
     //      .doc(resultTeam.id)
     //      .collection("comment")
     //      .set({})
     //      .then(() => {
     //          setFollowing(true)
     //      })
     // }
     // console.log('post.id')

     // console.log(post.id)

    return (
          // <ScrollView>
          <View style={{backgroundColor: 'white'}}>
               <Text>{resultTeam.id}</Text>
               <Text>{resultTeam.teamName}</Text>
               <Text>{resultTeam.teamPassword}</Text>
               <Text></Text>
               <TouchableOpacity
                    onPress={() => navigation.navigate('TeamPost', {resultTeam})}
               >
                    <Text>Post</Text>
               </TouchableOpacity>
               <ScrollView>
               <Text></Text>
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
                                   <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignContent: 'stretch', marginLeft: 15}}>
                                        <TouchableOpacity style={{margin: 5}}>
                                             <MaterialCommunityIcons name="thumb-up-outline" color={'#FCE38A'} size={25}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{margin: 5}}>
                                             <FontAwesome name="handshake-o" size={25} color={'#FCE38A'} />
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity>
                                             <Text>Like</Text>
                                             <FontAwsome5 name="thumbs-up" size={24} color={'#FCE38A'} />
                                        </TouchableOpacity> */}
                                        <TouchableOpacity 
                                             onPress={() => navigation.navigate("Comment", {resultTeam: resultTeam.id, post: item.id})}
                                             style={{margin: 5}}
                                        >
                                             <MaterialCommunityIcons name="chat-outline" color={'#FCE38A'} size={30}/>
                                        </TouchableOpacity>
                              </View>
                         </View>
                       
                    )}
               />
               </ScrollView>
          </View>
          // </ScrollView>
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
         fontSize: 15,
         marginLeft: 15
    },
    color: {
         color: '#EAFFD0'
    }
})
