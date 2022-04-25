import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
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
          <ScrollView style={{backgroundColor: 'white'}}>
          <View style={{backgroundColor: '#EAFFD0', height: '100%'}}>
               <View style={{flexDirection: 'row'}}>
                    <Image
                         style={{ height: 60, width: 60, borderRadius: 100, margin: 5}}
                         source={{uri: 'https://cdn.discordapp.com/attachments/929157237929287811/941309322242170910/IMG_0568.jpg'}}
                    />
                    <Text style={styles.text1}>{resultTeam.teamName}</Text>
               </View>
               <Text style={{marginLeft: 15, marginBottom: 10, fontWeight: '300'}}>adklfajkfjaj</Text>
               {/* <Text style={styles.text}>{resultTeam.teamName}</Text>              */}
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
                                   <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'flex-end', marginRight: 15}}>
                                        <TouchableOpacity style={{marginBottom: 5, marginLeft: 15,}}>
                                             <MaterialCommunityIcons name="thumb-up-outline" color={'#FCE38A'} size={25}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginBottom: 5, marginLeft: 15,}}>
                                             <FontAwesome name="handshake-o" size={25} color={'#FCE38A'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                             onPress={() => navigation.navigate("Comment", {resultTeam: resultTeam, post: post, caption: item.caption})}
                                             style={{marginBottom: 5, marginLeft: 15,}}
                                        >
                                             <MaterialCommunityIcons name="chat-outline" color={'#FCE38A'} size={25}/>
                                        </TouchableOpacity>
                                   </View>
                                   <View style={{backgroundColor: '#D8F5B4', height: 1}}></View>
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
     fontSize: 16,
     marginLeft: 15,
     marginRight: 15,
     marginTop: 10,
     alignSelf: 'flex-start',
     color: '#424949',
     fontWeight: '300'
 },
    color: {
         color: '#EAFFD0'
    },
    text1: {
     fontSize: 20,
     margin: 10,
     color: '#424949',
     fontWeight: '400'
 },
})
