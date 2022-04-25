import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
     }, [resultTeam])

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
          <View style={{backgroundColor: '#EAFFD0', height: '100%'}}>
               <View style={{flexDirection: 'row'}}>
                    <Image
                         style={{ height: 60, width: 60, borderRadius: 100, margin: 5}}
                         source={{uri: 'https://cdn.discordapp.com/attachments/929157237929287811/941309322242170910/IMG_0568.jpg'}}
                    />
                    <Text style={styles.text1}>{resultTeam.teamName}</Text>
                    
               </View>
                    <Text style={{marginLeft: 15}}>adklfajkfjaj</Text>
                    <View style={{alignSelf: 'flex-end', marginRight: 10, flexDirection: 'row'}}>
               
                         <TouchableOpacity
                              onPress={() => navigation.navigate('TeamPost', {resultTeam})}
                              style={styles.button}
                         >
                              <Text style={{color: 'white'}}>Post</Text>
                         </TouchableOpacity>
                    </View>
               
               <ScrollView>
               <Text></Text>
                    <FlatList
                         numColumns={1}
                         horizontal={false}
                         data={post}
                         keyExtractor={post => post.id}
                         renderItem={({item}) => (
                              <View style={styles.containerImage}>
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
                                             onPress={() => navigation.navigate("Comment", {resultTeam: resultTeam.id, post: item.id, caption: item.caption})}
                                             style={{marginBottom: 5, marginLeft: 15,}}
                                        >
                                             <MaterialCommunityIcons name="chat-outline" color={'#FCE38A'} size={30}/>
                                        </TouchableOpacity>
                              </View>
                              <View style={{backgroundColor: '#D8F5B4', height: 1, width: '100%'}}></View>
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
      backgroundColor: '#F38181',
      width: '45%',
      padding: 8,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:10,
      alignSelf: 'center'
     },
      text1: {
          fontSize: 20,
          margin: 10,
          color: '#424949',
          fontWeight: '400'
      },
      text2: {
           fontSize: 18,
           marginLeft: 7,
           marginBottom: 4
      },
 })
 