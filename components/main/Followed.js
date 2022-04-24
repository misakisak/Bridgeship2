import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
require('firebase/firestore')


export default function Following ({route}) {
    //  const navigation = useNavigation()
    //  const loggedInUser = route.params.loggedInUser
    //  const [following, setFollowing] = useState([])
    //  const [ user, setUser] = useState([])
    //  // console.log(loggedInUser.uid)
    const nowUser = route.params.nowUser
    console.log('nowUser')
    console.log(nowUser)

    //  useEffect (() => {
    //       firebase.firestore()
        //   .collection('following')
        //   .doc(loggedInUser)
        //   .collection('userFollowing')
        //   .then((snapshot) => {
        //        const newAuthors = [];
        //            snapshot.forEach(querySnapshot => {
        //                const author = {
        //                     ...querySnapshot.data(),
        //                     id: querySnapshot.id
        //             }
        //                  newAuthors.push(author);
        //        })
        //   setFollowing(newAuthors) 
        //   console.log('following')
        //   console.log(following)
        //   })

          // firebase.firestore()
          // .collection('users')
          // .doc(following)
          // .then((snapshot) => {
          //      const newAuthors = [];
          //          snapshot.forEach(querySnapshot => {
          //              const author = {
          //                   ...querySnapshot.data(),
          //                   id: querySnapshot.id
          //           }
          //                newAuthors.push(author);
          //      })
          // setUser(newAuthors)
          // console.log(user) 
          // })


    //  }, [])

    return (
          // <ScrollView>
               <View>
               {/* <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={user}
                    keyExtractor={post => post.id}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Image
                               style={styles.image}
                               source={{uri: item.downloadURL}}
                            />
                            <Text>
                                {item.name}
                            </Text>
                            <TouchableOpacity>
                                <Text>Like</Text>
                            </TouchableOpacity>
                        </View>
                       
                    )}
               /> */}
               </View>
          //* </ScrollView> */}
          // {/* </TouchableWithoutFeedback> */}
     )
}

const styles = StyleSheet.create({
     container:{
         flex: 1,
     },
     // containerInfo: {
     //     margin: 20,
 
     // },
     containerGallery: {
         flex: 1,
     },
     containerImage: {
         flex: 1/3,
         alignItems: 'center'
     },
     image: {
         flex: 1,
         aspectRatio: 1/1,
         width: '70%'
     },
     buttonText: {
         color: 'white',
         fontWeight: '500',
         fontSize: 12,
     },
     buttonContainer: {
         width: '30%',
         justifyContent: 'center',
         alignItems: 'center',
         alignSelf: 'center',
         margin: 3
     },
     button: {
         // buttonAlign:'center',
         // buttonJustify:'center',
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
     button3:{
         backgroundColor: 'white',
         width: '50%',
         padding: 10,
         alignItems: 'center',
         margin:5,
         borderRadius:40,
         // marginLeft: 40,
         // marginRight: 40,
         // marginTop: 10,
         alignSelf: 'center',
     },
     text: {
         fontSize: 20,
     },
     button2: {
         // buttonAlign:'center',
         // buttonJustify:'center',
         backgroundColor: 'white',
         width: '30%',
         padding: 10,
         borderRadius: 0,
         alignItems: 'center',
         // marginLeft:30,
         // marginRight:30,
         // marginTop:20,
         alignSelf: 'center'
     },
     buttonOutline: {
         backgroundColor: 'white',
         marginTop: 5,
         // borderColor: '#F38181',
         borderWidth: 1,
     },
 
 })