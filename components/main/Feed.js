import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';

import firebase from 'firebase';
require('firebase/firestore')

import { connect } from 'react-redux';


function Feed() {
    const loggedInUser = firebase.auth().currentUser
    const [ posts, setPosts ] = useState([])
    // const [ user, setUser ] = useState({name: "", email: ""})
    const [ following, setFollowing ] = useState([])
    // const [ posts1, setPosts1] = useState([])
    const [authors, setAuthors] = useState([]);

    useEffect(async()=> {
        const user = loggedInUser;

        const followingResult = await
            firebase.firestore()
            .collection('following')
            .doc(user)
            .collection('userFollowing')
            .get();
        
        const followingIds= [];
        followingResult.forEach (following => {
            followingIds.push(following.id);
        });

        console.log(followingResult)
          
        console.log(following)
        const newFollowing = []
        for await (const followingId of followingIds) {
            const authorResults = await 
                firebase.firestore()
                .collection("posts")
                .doc(followingId)
                .collection('userPosts')
                .get();
            authorResults.forEach(author => {
                newFollowing.push({
                    ...author.data(),
                    id: author.id,
                });
            });
        }
        setAuthors(newFollowing)

    }, [])

    if (authors === null) {
        return <View/>
    }
    
    return (

        <View style={styles.container}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>a</Text>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={authors}
                keyExtractor={posts => authors.id}
                renderItem={({item}) => (
                    <View style={styles.containerImage}>
                        <Text style={styles.container}>{item.posting}</Text>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
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
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
})

export default connect(mapStateToProps, null)(Feed)


// import React, {useState, useEffect} from 'react';
// import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';

// import firebase from 'firebase';
// require('firebase/firestore')

// import { connect } from 'react-redux';


// function Feed(props) {
//     const [ posts, setPosts ] = useState([])
//     const [ following, setFollowing] = useState([])

//     const loggedInUser = firebase.auth().currentUser

//     useEffect(()=> {
//         let posts = [];
//         console.log(loggedInUser.uid)
//         if (props.usersLoaded == props.following.length) {
//             for ( let i = 0; i < props.following.length; i++){
//                 firebase.firestore()
//                 .collection('following')
//                 .doc(loggedInUser.uid)
//             }
//         }
    
//         // if (props.usersLoaded == props.following.length) {
//         //     for (let i = 0; i < props.following.length; i++) {
//         //         const user = props.users.find(el => el.uid === props.following[i]);
//         //         if (user != undefined) {
//         //             posts = [...posts, ...user.posts]
//         //         }
//         //     }

//         //     posts.sort(function (x, y) {
//         //         return x.creation - y.creation;
//         //     })

//         //     setPosts(posts);
        
//         // console.log(user.uid)
//         //     setUser(loggedInUser)
//         //     firebase.firestore()
//         //     .collection('posts')
//         //     .doc(loggedInUser.uid)
//         //     .collection('userPosts')
//         //     .get()
//         //     .then((snapshot) => {
//         //         const newAuthors = [];
//         //         snapshot.forEach(querySnapshot => {
//         //             const author = {
//         //                 ...querySnapshot.data(),
//         //                 id: querySnapshot.id
//         //             }
//         //         newAuthors.push(author);
//         //     });
//         //     setPosts(newAuthors);
//         //     console.log(snapshot.exists)
//         //     })
//         console.log(props)
//     }, [props.usersLoaded])

//     return (
//         <View style={styles.container}>
//                 <FlatList
//                     numColumns={1}
//                     horizontal={false}
//                     data={posts}
//                     renderItem={({item}) => (
//                         <View style={styles.containerImage}>
//                             <Text style={styles.container}>{item.user.name}</Text>
//                             <Image
//                                style={styles.image}
//                                source={{uri: item.downloadURL}}
//                             />
//                         </View>
                       
//                     )}
//                 />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//     },
//     containerInfo: {
//         margin: 20,

//     },
//     containerGallery: {
//         flex: 1,
//     },
//     containerImage: {
//         flex: 1/3,
//     },
//     image: {
//         flex: 1,
//         aspectRatio: 1/1,
//     }
// })

// const mapStateToProps = (store) => ({
//     currentUser: store.userState.currentUser,
//     following: store.userState.following,
//     users: store.userState.users,
//     usersLoaded: store.usersState.usersLoaded,
// })

// export default connect(mapStateToProps, null)(Feed);