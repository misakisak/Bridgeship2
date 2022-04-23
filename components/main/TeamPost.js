import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';



export default function Teamup ({route}) {
     const [caption, setCaption] = useState("")
     const resultTeam = route.params.resultTeam
     const [ state, setState ] = useState('')
     // console.log(teamUser.id)
     const navigation = useNavigation()

     const savePostData = (downloadURL) => {
          firebase.firestore()
              .collection('teams')
              .doc(resultTeam.id)
              .collection("teamPost")
              .add({
               //    downloadURL,
                  caption,
                  creation: firebase.firestore.FieldValue.serverTimestamp()
              })
              setState('Success!!')
              navigation.navigate('Team', {resultTeam})

     }

    return (
        <View>
            <Text>{state}</Text>
            <TextInput
               placeholder="Write a Caption..."
               onChangeText={(caption) => setCaption(caption)}
            />
            <Text></Text>
            <Text></Text>
            <Text></Text>

            <TouchableOpacity
               onPress={() => savePostData()}
            >
                 <Text>Post</Text>
            </TouchableOpacity>

            <View>

            </View>

            <TouchableOpacity>
                 <Text>Choose Pic</Text>
            </TouchableOpacity>
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
