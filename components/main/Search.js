import React, {useState} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore')

export default function Search(props) {
     const [users, setUsers] = useState([])

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

    return (
        <View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            <View style={styles.input1}>
                <TextInput 
                    placeholder="Type Here..."
                    onChangeText={(search)=> fetchUsers(search)}
                    // style={ styles.input1 }
                />
            </View>

            <View style={styles.flatlist}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={users}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("Profile", {uid: item.id})}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                />
            </View>
        </View>
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
        marginTop: 5
    },
    inputContainer: {
        width: '100%',
        padding: 10,
    },
    flatlist: {
        fontSize: 30
    }
})