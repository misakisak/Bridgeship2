import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


require('firebase/firestore')


export default function Teamup ({route}) {
     const navigation = useNavigation()
     const resultTeam = route.params.resultTeam
     const [post, setPost] = useState([])
     const [post1, setPost1] = useState([])
     const [ following, setFollowing ] = useState(false)

     if (followed.indexOf(props.route.params.uid) > -1 ) {
          setFollowing(true);
     } else {
          setFollowing(false);
     }

     useEffect(()=> {
          // console.log(route.params.resultTeam)
          firebase.firestore()
          .collection('teams')
          .doc(resultTeam)
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

     const onFollow = () => {
          firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("teamFollowing")
          .doc(resultTeam)
          .set({})
          .then(() => {
              setFollowing(true)
          })
     }
  
     const onUnfollow = () => {
          firebase.firestore()
          .collection("following")
          .doc(firebase.auth().currentUser.uid)
          .collection("userFollowing")
          .doc(props.route.params.uid)
          .delete()
          .then(() => {
              setFollowing(false)
          })
     }

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
          <View>
               <Text>{resultTeam.id}</Text>
               <Text>{resultTeam.teamName}</Text>
               <Text>{resultTeam.teamPassword}</Text>
               <Text></Text>
               <TouchableOpacity
                    onPress={() => navigation.navigate('TeamPost', {resultTeam})}
               >
                    <Text>Follow</Text>
               </TouchableOpacity>
               <TouchableOpacity
                    onPress={() => navigation.navigate('TeamPost', {resultTeam})}
               >
                    <Text>Followed</Text>
               </TouchableOpacity>
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
                                        <TouchableOpacity onPress={() => navigation.navigate("Comment", {resultTeam: resultTeam, post: post})}>
                                             <Text>Like</Text>
                                             <MaterialCommunityIcons name="chat" color={'#FCE38A'} size={25}/>
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
         fontSize: 20,
         margin: 10
    },
    color: {
         color: '#EAFFD0'
    }
})
