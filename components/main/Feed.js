import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons'; 
import firebase from 'firebase';
require('firebase/firestore')
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

function Feed() {
    const loggedInUser = firebase.auth().currentUser
    const [authors, setAuthors] = useState([]);
    const navigation = useNavigation()
    const [state, setState] = useState(true)



    useEffect(async()=> {
        const followingResult = await
            firebase.firestore()
                .collection('following')
                .doc(loggedInUser.uid)
                .collection('userFollowing')
                .get();
        
        const followingIds= [];
        followingResult.forEach (following => {
            followingIds.push(following.id);
        });
        // console.log('followingIds')
        // console.log(followingIds)

        // const newFollowing = []
        // for await (const followingId of followingIds) {
        let posts = []
        for (let i = 0 ; i < followingIds.length; i++) { await
            firebase.firestore()
                .collection("posts")
                .doc(followingIds[i])
                .collection('userPosts')
                .get()
                .then(snapshot => {
                    const newAuthors = [];
                        snapshot.forEach(querySnapshot => {
                            const author = {
                                ...querySnapshot.data(),
                                id: querySnapshot.id
                            }
                            newAuthors.push(author);
                        // console.log('-------------1')
                        // console.log(posts)
                        // console.log('-------------2')
                        })
                    posts=[...posts, ...newAuthors]
                    posts.sort(function(x,y) {
                        return x.creation -y.creation;
                    })
                    // setAuthors(posts)
                    // console.log('p--------------------')
                    // console.log(posts)
                    // setAuthors(newAuthors)
                    // authors=[...authors, ...newAuthors]
                    // [...theArray, `Entry ${theArray.length}`]
                })
                
        }
        setAuthors(posts)
        setState(true)
    }, [loggedInUser, state])

    if (authors === null) {
        return <View/>
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={{marginTop: 50, marginRight: 10, marginBottom: 10, alignSelf: 'flex-end'}}
                onPress={()=> setState(false)}
            >
                <MaterialCommunityIcons name="reload" color={'#95E1D3'} size={30}/>
            </TouchableOpacity>
            
            <FlatList
                numColumns={1}
                horizontal={false}
                data={authors}
                keyExtractor={post => post.id}
                renderItem={({item}) => (
                    <View style={styles.containerImage}>
                        <View style={{flexDirection: 'column', marginLeft: 15}} >
                            <View style={{flexDirection: 'row'}}>
                                <Image
                                    style={styles.image}
                                    source={{uri: item.icon}}
                                />
                                <Text style={{fontSize: 16, margin: 10, fontWeight: '300'}}>{item.details}</Text>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize:16, marginLeft: 10, marginTop: 3, fontWeight: '300'}}>{item.caption}</Text>
                            </View>
                        </View>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'flex-end', marginRight: 15}}>
                            <TouchableOpacity style={{margin: 5}}>
                                <MaterialCommunityIcons name="thumb-up-outline" color={'#FCE38A'} size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 5}}>
                                <FontAwesome name="handshake-o" size={25} color={'#FCE38A'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate("FeedComment", {nowUser: item.user, userIcon: item.icon, post: item.id})}
                                style={{margin: 5}}
                            >
                                <MaterialCommunityIcons name="chat-outline" color={'#FCE38A'} size={30}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor: '#D8F5B4', height: 1}}></View>
                    </View>     
            )}/>
        </View>
    )   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#EAFFD0',
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
        // flex: 1,
        // aspectRatio: 1/1,
        height: 40, 
        width: 40, 
        borderRadius: 100,
        margin: 5
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
})

export default connect(mapStateToProps, null)(Feed)