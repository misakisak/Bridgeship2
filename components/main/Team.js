import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

require('firebase/firestore')


export default function Teamup ({route}) {
     const navigation = useNavigation()
     const resultTeam = route.params.resultTeam
     const [post, setPost] = useState([])
     

     useEffect(()=> {
          console.log(route.params.resultTeam)
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
          console.log(post)
          // console.log('--------------')
          // console.log(post[0])
     }, [])

    return (
          <View>
               <Text>{resultTeam.id}</Text>
               <Text>{resultTeam.teamName}</Text>
               <Text>{resultTeam.teamPassword}</Text>
               <Text></Text>
               <TouchableOpacity
                    onPress={() => navigation.navigate('TeamPost', {resultTeam})}
               >
                    <Text>Post</Text>
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
                              <Text>
                                   {item.caption}
                              </Text>
                              <TouchableOpacity>
                                   <Text>Like</Text>
                              </TouchableOpacity>
                         </View>
                       
                    )}
               />
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
