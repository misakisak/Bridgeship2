import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import firebase from 'firebase';
require('firebase/firestore')
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';



import { connect } from 'react-redux';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
// import { SafeAreaView } from 'react-native-web';


function Profile(props) {
    // const[userPosts, setUserPosts] = useState([]);
    // const[user, serUser] = useState(null);


    const loggedInUser = firebase.auth().currentUser
    const [ posts, setPosts ] = useState([])
    const [ user, setUser ] = useState({name: "", email: ""})
    const [ following, setFollowing ] = useState(false)
    const [ icon, setIcon ] = useState(null)
    const [ userIcon, setUserIcon] = useState([])
    const [ followed, setFollowed ] = useState([])
    const navigation = useNavigation()
    const [ details, setDetails ] = useState([])
    const [ bio, setBio ] =useState('')
    // console.log(loggedInUser)
    const [ nowUser, setNowUser ] = useState('')
    const [ state, setState ] = useState(false)

    useEffect(()=> {
        const { currentUser, posts } = props;

        setUser(loggedInUser)
        firebase.firestore()
        .collection('following')
        .doc(loggedInUser.uid)
        .collection('userFollowing')
        .get()
        .then(snapshot => {
            const followingIds = [];
            snapshot.forEach(querySnapshot => {
                const followings = {
                    ...querySnapshot.data(),
                    id: querySnapshot.id
                }
                followingIds.push(followings);
            });
            setFollowed(followingIds);
        })

        if (followed.indexOf(props.route.params.uid) > -1 ) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            console.log(user.uid)
            setUser(loggedInUser.uid)
            setNowUser(loggedInUser.uid)
            firebase.firestore()
            .collection('posts')
            .doc(loggedInUser.uid)
            .collection('userPosts')
            .get()
            .then((snapshot) => {
                const newAuthors = [];
                snapshot.forEach(querySnapshot => {
                    const author = {
                        ...querySnapshot.data(),
                        id: querySnapshot.id
                    }
                newAuthors.push(author);
            });
            setPosts(newAuthors);
            })

            firebase.firestore()
            .collection('users')
            .doc(loggedInUser.uid)
            .get()
            .then((snapshot) => {
                setDetails(snapshot.data())
            })            
    
        } else {
            setState(true)
            setNowUser(props.route.params.uid)
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    setUser(snapshot.data())
                })
            firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .get()
            .then((snapshot) => {
                const newAuthors = [];
                snapshot.forEach(querySnapshot => {
                    const author = {
                        ...querySnapshot.data(),
                        id: querySnapshot.id
                    }
                newAuthors.push(author);
            });
            setPosts(newAuthors);
            // console.log(snapshot.exists)
            console.log(props.route.params.uid)

            firebase.firestore()
            .collection('users')
            .doc(nowUser)
            .get()
            .then((snapshot) => {
                setDetails(snapshot.data())
            })  
            console.log(details)
        })
        }

        // if (followed.indexOf(props.route.params.uid) > -1 ) {
        //     setFollowing(true);
        // } else {
        //     setFollowing(false);
        // }

    }, [props.route.params.uid, props.following, nowUser])

    const onFollow = () => {
        firebase.firestore()
        .collection("following")
        .doc(firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .doc(props.route.params.uid)
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

    const onLikePress = (postId) => {
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            firebase.firestore()
            .collection("posts")
            .doc(loggedInUser)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})


        }
    }
 
    if (user === null) {
        return <View/>
    }
    
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{backgroundColor: 'white'}}>

                <View style={{flexDirection:'row'}}>
                {/* <Image
                   source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/cat.gif' }}
                   style={{ height: 70, width: 70}}
                /> */}
                    <Image
                        source={{uri: details.icon}}
                        style={{ height: 70, width: 70, borderRadius: 100}}
                    />

                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.text1}>{details.name}</Text>
                        <Text>{details.email}</Text>
                        <Text style={{flexDirection:'column'}}>{details.bio}</Text>
                    </View>

                </View>

                <View style={[styles.buttonContainer, {flexDirection: 'row'}]}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Following', {nowUser})}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Follower', {nowUser})}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Follower</Text>
                    </TouchableOpacity>
                </View>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title= "Followed"
                                onPress={() => onUnfollow()}
                            />
                        ) : (
                            <Button
                                title="Follow"
                                onPress={() => onFollow()}
                            />
                        )}
                    </View>
                ) : 
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Setting', {loggedInUser})}
                        style={styles.buttonEdit}
                    >
                        <Text style={styles.buttonText}>edit</Text>
                    </TouchableOpacity>
                }
            </View>

            <ScrollView>

                <View style={{backgroundColor: 'white'}} >
                    <FlatList
                        numColumns={1}
                        horizontal={false}
                        data={posts}
                        keyExtractor={post => post.id}
                        renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Image
                               style={styles.image}
                               source={{uri: item.downloadURL}}
                            />
                            <Text style={styles.text}>
                                {item.caption}
                            </Text>

                            <View style={{flexDirection: 'row', marginBottom: 3}}>
                                <TouchableOpacity onPress={()=> onLikePress({postId: item.id})}>
                                    <MaterialCommunityIcons name="heart" color={'#FCE38A'} size={30}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="account-group" color={'#FCE38A'} size={30}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="hand-peace" color={'#FCE38A'} size={30}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("PostComment", {nowUser: nowUser, post: item.id})}>
                                    <MaterialCommunityIcons name="chat" color={'#FCE38A'} size={30}/>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}/>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
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
        alignSelf: 'center'
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
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom: 3,
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
        fontSize: 15,
        margin: 3
    },
    text1: {
        fontSize: 20,
        margin: 3
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
    buttonEdit: {
        width: '30%',
        alignSelf: 'center',
        backgroundColor: '#F38181',
        borderRadius: 20,

    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
})

export default connect(mapStateToProps, null)(Profile)
