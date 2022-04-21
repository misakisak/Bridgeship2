import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
require('firebase/firestore')


export default function Teamup () {
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


    const onTeamUp = () => {
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
        console.log('onTeamUp teams2')
        console.log(teams)

        // for (let i = 0; i < teams2.length; i++) {
        for (let i = 0; i < 5; i++) {
            const team2 = teams2[i]
            console.log('onTeamUp team2')
            console.log(team2)
            firebase.firestore()
            .collection('teams')
            .doc(team2)
            .collection('teamName')
            .get()
            .then(snapshot => {
                const a = [];
                snapshot.forEach(querySnapshot => {
                  a.push(querySnapshot.id);
                });
            setTheTeam(a)
            console.log('onTeamUp theTeam1')
            console.log(theTeam)
            })

            if (teamName === theTeam) {
                break
            } else {
                firebase.firestore()
                .collection('teams')
                .doc()
                .add({
                    teamName,
                    teamPassword
                })
                // for (let i = 0; i < props.teams2.length; i++) {
                for (let i = 0; i < props.teams2.length; i++) {
                    const team2 = teams2[i]
                    firebase.firestore()
                    .collection('teams')
                    .doc(team2)
                    .collection('teamName')
                    .get()
                    .then(snapshot => {
                        const a = [];
                        snapshot.forEach(querySnapshot => {
                            a.push(querySnapshot.id);
                            console.log('onTeamUp a')
                            console.log(a)
                    });
                    setTheTeam(a)
                    console.log('onTeamUp theTeam2')
                    console.log(theTeam)
                    })

                    if (teamName === theTeam) {
                        setResultTeam(team2)
                        console.log('onTeamUp resultTeam')
                        console.log(resultTeam)
                    }
                }
            }
        }
        
    }

    const onJoinTeam = () => {
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
            firebase.firestore()
            .collection('teams')
            .doc(team2)
            .collection('teamName')
            .get()
            .then(snapshot => {
                const a = [];
                snapshot.forEach(querySnapshot => {
                  a.push(querySnapshot.id);
                });
                console.log('onJoinTeam a')
                console.log(a)
            setTheTeam(a)
            console.log('onJoinTeam theTeam')
            console.log(theTeam)
            })

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
        <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
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
                    style={styles.input1}
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
