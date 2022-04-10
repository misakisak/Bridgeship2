import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore')

import { connect } from 'react-redux';


function Profile(props) {
    const user = firebase.auth().currentUser
    const [posts, setPosts] = useState([])

    console.log(user.uid)
    firebase.firestore()
    .collection('posts')
    .doc(user.uid)
    .get()
    .then((snapshot) => {
        console.log(snapshot.exists)
        setPosts(snapshot.data)
    })
        
    
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    keyExtractor={post => post.id}
                    renderItem={({item}) => (
                        <View style={styles.image}>
                            <Image
                               style={styles.image}
                               source={{uri: item.downloadURL}}
                            />
                        </View>
                       
                    )}
                />
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 40,
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
    }
})

const mapStateToProps = (store) => ({
    // currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)
