import React, {useState} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard, SafeAreaView } from 'react-native';

import firebase from 'firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
require('firebase/firestore')

export default function Search(props) {
     const [users, setUsers] = useState([])
     const [teams, setTeams] = useState([])

     const fetchUsers = (search) => {
          firebase.firestore()
               .collection('users')
               .where('name', '>=', search)
               .get()
               .then((snapshot) => {
                    let users = snapshot.docs.map(doc => {
                         const data = doc.data();
                         const id = doc.id;
                         return { id, ...data }
                    });
                    setUsers(users);
               })        
          
     }

     const fetchTeams = (search) => {
        firebase.firestore()
             .collection('teams')
             .where('teamName', '>=', search)
             .get()
             .then((snapshot) => {
                  let users = snapshot.docs.map(doc => {
                       const data = doc.data();
                       const id = doc.id;
                       return { id, ...data }
                  });
                  setTeams(users);
             })        
        
        }

    return (
        <TouchableWithoutFeedback
            onPress={()=> {Keyboard.dismiss();
            }}
        >
        <SafeAreaView>
        <View>
            <Text style={{marginLeft: 13, fontSize: 16, fontWeight: '200'}}>Search User</Text>
            <TextInput 
               placeholder="Type Username Here..."
               onChangeText={(search)=> fetchUsers(search)}
               style={ styles.input1 }/>
            <View style={{marginBottom: 10}}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}
                    >
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>

                )}
                />
            </View>

        </View>
        <View style={{backgroundColor: '#424949', height: 0.3, width: '100%'}}></View>
        <View>
            <Text style={{marginLeft: 13, marginTop: 5, fontSize: 16, fontWeight: '200'}}>Search Team</Text>
            <TextInput 
               placeholder="Type Teamname Here..."
               onChangeText={(search)=> fetchTeams(search)}
               style={ styles.input1 }/>
            <FlatList
               numColumns={1}
               horizontal={false}
               data={teams}
               renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("TeamSearch", {resultTeam: item})}
                    >
                        <Text style={styles.text}>{item.teamName}</Text>
                    </TouchableOpacity>

               )}
            />

        </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input1: {
        backgroundColor: 'white',
        paddingVertical:10,
        borderRadius: 0,
        borderColor:'#95E1D3',
        borderWidth:2,
        margin:10,
        padding:10,
        fontWeight: '300'
        // marginTop: 50
    },
    inputContainer: {
        width: '100%',
        padding: 10,
    },
    flatlist: {
        fontSize: 30
    },
    text: {
        marginLeft: 13,
        fontSize: 16,
        marginBottom: 3,
        fontWeight: '300'
        // fontStyle: addEventistener,
        
    }
})