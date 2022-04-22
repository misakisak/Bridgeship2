import React, {useState, useEffect, Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
require('firebase/firestore')


export default function Teamup (navigate) {
    const [ teamMember, setTeamMember] = useState([])
    const [ teamName, setTeamName ] = useState("")
    const [ teamPassword, setTeamPassword] = useState("")
    const [ teams2, setTeams2 ] = useState([])
    const [ teams, setTeams ] = useState([])

    const [ teamName2, setTeamName2 ] = useState("")
    const [ teamPassword2, setTeamPassword2 ] = useState("")
    const [ theTeam, setTheTeam] = useState("")
    const [ theTeamPassword, setTheTeamPassword ] = useState("")
    const [ resultTeam, setResultTeam ] = useState("") 

    const navigation = useNavigation()

    const onTeamUp = (navigate) => {
        console.log(teamName)
        firebase.firestore()
        .collection('teams')
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
            setTeams(newAuthors)
        })
        // console.log('onTeamUp teams2')
        // console.log(teams)
        console.log(teams.length)
        for (let i = 0; i < 4; i++) {
            const team2 = teams[i]
            if (team2.teamName === theTeam) {
                break
            }
            // console.log('onTeamUp team2')
            // console.log(team2.teamName)
        }
            // if (team2.teamName === theTeam) {
            //     return
            // } else {
        firebase.firestore()
        .collection('teams')
        // .doc()
        .add({
            teamName,
            teamPassword
        })
                    
        firebase.firestore()
            .collection('teams')
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
                    setTeams(newAuthors)
            })
            console.log(teams)

        for (let i = 0; i < 5; i++) {
            const team2 = teams[i]
            console.log(team2.teamName)
            if (team2.teamName === teamName) {
                setResultTeam(team2.id)
                // console.log('onTeamUp resultTeam')
                // console.log(resultTeam)
                navigation.navigate("Team", {resultTeam})
            } else {
                console.log('onTeamup no')
            }
        }
    }

    const onJoinTeam = async () => {
        console.log(teamName2)
        console.log(teamPassword2)
        firebase.firestore()
        .collection('teams')
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
            setTeams2(newAuthors)
        })
        console.log('onJoinTeam teams2')
        console.log(teams2)

        for (let i = 0; i < 5; i++) {
            const team2 = teams2[i]
            console.log('onJoinTeam team2')
            console.log(team2)
            // firebase.firestore()
            // .collection('teams')
            // .doc(team2)
            // .collection('teamName')
            // .get()
            // .then(snapshot => {
            //     const a = [];
            //     snapshot.forEach(querySnapshot => {
            //       a.push(querySnapshot.id);
            //     });
            //     console.log('onJoinTeam a')
            //     console.log(a)
            // setTheTeam(a)
            // console.log('onJoinTeam theTeam')
            // console.log(theTeam)
            // })
            const team2Snapshot = await
            firebase.firestore()
            .collection('teams')
            .doc(team2)
            .collection('teamName')
            .get();
            // team2Snapshot.forEach(querySnapshot => {
            //     ...querySnapshot.data(),
            //     id: querySnapshot.id
            // });
            setTheTeam(team2Snapshot)
           
            if (teamName2 === theTeam) {
                const team2 = teams2[i]
                firebase.firestore()
                .collection('teams')
                .doc(team2)
                .collection('teamPassword')
                .then(snapshot => {
                    const a = [];
                    snapshot.forEach(querySnapshot => {
                      a.push(querySnapshot.id);
                    });
                setTheTeamPassword(a)
                })

                if ( teamPassword2 === theTeamPassword ) {
                    setResultTeam(teams2)
                    console.log('onJoinTeam resultTeam')
                    console.log(resultTeam)
                    navigation.navigate("Team", {resultTeam})
                } else {
                    console.log('onJoinTeam resultTeam')
                    console.log('no')
                    break
                }
            } else {
                console.log('onJoinTeam resultTeam')
                console.log('no')
                break
            }
        }
    }

    return (
        <View style={[styles.color, {backgroundColor: 'white'}]}>
                <View>
                    <Text style={[styles.paragraph2, {flexDirection: "column"}]}>Bridgeship</Text>
                </View>
                <View style={styles.container2}>
                    <Image
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-dev-5878d.appspot.com/o/Ellipse%203.png?alt=media&token=fd22f7f9-09e4-4d11-86b7-15043784c2d6' }}
                        style={{ height: 80, width: 80, shape: 'curcl', }}
                    />
                </View>
                <View>
                    <TextInput
                    placeholder="new team name"
                    onChangeText={(teamName) => setTeamName( teamName )}
                    style={styles.input1}
                    />
                    <TextInput
                        placeholder="team password"
                        secureTextEntry={true}
                        onChangeText={(teamPassword) => setTeamPassword( teamPassword )}
                        style={styles.input1}
                    />
                    <TouchableOpacity
                        onPress={()=> onTeamUp()}
                        style={[ styles.button2, styles.buttonOutline ]}
                    >
                        <Text style={ styles.buttonOutlineText }>Create Team</Text>
                    </TouchableOpacity>

                    <TextInput
                    placeholder="team name"
                    onChangeText={(teamName) => setTeamName2( teamName )}
                    style={styles.input}
                    />
                    <TextInput
                        placeholder="team password"
                        secureTextEntry={true}
                        onChangeText={(teamPassword) => setTeamPassword2( teamPassword )}
                        style={styles.input1}
                    />
                    <TouchableOpacity
                        onPress={()=> onJoinTeam()}
                        style={[ styles.button2, styles.buttonOutline ]}
                    >
                        <Text style={ styles.buttonOutlineText }>Join Team</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        padding:5,
        marginTop:10,
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
        marginTop: 20,
        width: '90%',
        alignSelf: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingVertical:10,
        borderRadius: 0,
        borderColor:'#95E1D3',
        borderWidth:2,
        margin:10,
        padding:10,
        marginTop: 30,
        width: '90%',
        alignSelf: 'center'
    },
    button2: {
        // buttonAlign:'center',
        // buttonJustify:'center',
        backgroundColor: 'white',
        width: '65%',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        marginLeft:30,
        marginRight:30,
        marginTop:20,
        alignSelf: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 10,
        // borderColor: '#F38181',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    color: {
        color: 'white',
        height: '100%'
    },
    paragraph2:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:60,
        color:'#FCE38A',
        fontWeight:'800',
        fontSize:30,
    },
})
