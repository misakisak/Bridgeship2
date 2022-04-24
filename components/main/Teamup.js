import React, {useState, useEffect, Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Alert, Keyboard } from 'react-native';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
require('firebase/firestore')

import Team from './Team'
// import AndroidTextInputNativeComponent from 'react-native/Libraries/Components/TextInput/AndroidTextInputNativeComponent';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function Teamup () {
    // const [ teamMember, setTeamMember] = useState([])
    const [ teamName, setTeamName ] = useState("")
    const [ teamPassword, setTeamPassword] = useState("")
    // const [ teams2, setTeams2 ] = useState([])
    const [ teams, setTeams ] = useState([])

    const [ teamName2, setTeamName2 ] = useState("")
    const [ teamPassword2, setTeamPassword2 ] = useState("")
    const [ theTeam, setTheTeam] = useState("")
    // const [ theTeamPassword, setTheTeamPassword ] = useState("")
    const [ resultTeam, setResultTeam ] = useState("") 
    const [ state, setState ] = useState('b')
    // const [ state1, setState1 ] = useState(true)

    const navigation = useNavigation()

    const createTwoButtonAlert = () =>
        Alert.alert(
        "Your Team is taken",
        "Please change it to another team name.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createTwoButtonAlert2 = () =>
        Alert.alert(
        "Wrong Password",
        "Your team name or password is incrrect",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createTwoButtonAlert3 = () =>
        Alert.alert(
        "Successfully Teamup",
        "Please Join Team",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const onTeamUp = () => {
        setState(true)
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
            // console.log(teams)
        })
        // console.log('onTeamUp teams2')
        // console.log(teams)
        // console.log(teams.length)
        for (let i = 0; i < teams.length; i++) {
            const team2 = teams[i]
            // console.log(team2)
            if (team2.teamName === teamName) {
                setState(false)
                break
            } 
            // console.log('onTeamUp team2')
            // console.log(team2.teamName)
        }
        if (state === true) {
            firebase.firestore()
                .collection('teams')
                .add({
                    teamName,
                    teamPassword
                })
            createTwoButtonAlert3()
            setTeamName('')
            setTeamPassword('')
        } else {
            createTwoButtonAlert()
        }
        // console.log('-------------------')
    }

    const onJoinTeam =  () => {
        // const navigation = useNavigation()
        // console.log(teamName2)
        // console.log(teamPassword2)
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
        // console.log(teams.length)
        for (let i = 0; i < teams.length; i++) {
            const team2 = teams[i]
            // console.log(team2.teamName)
            if (team2.teamName === teamName2) {
                if (team2.teamPassword === teamPassword2) {
                    setResultTeam(team2)
                    // console.log('yay')
                    // console.log(resultTeam)
                    navigation.navigate("Team" , {resultTeam})
                    // console.log(resultTeam)
                } else {
                    setState('a')
                }
            } else {
                // console.log('onTeamup no')
                setState('a')
            }
            //     createTwoButtonAlert2()
        }
        if (state === 'a') {
            createTwoButtonAlert2()
        }
        // console.log('-------------------')
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
                    clearButtonMode="always"
                    />
                    
                    <TextInput
                        placeholder="team password"
                        secureTextEntry={true}
                        onChangeText={(teamPassword) => setTeamPassword( teamPassword )}
                        style={styles.input1}
                        clearButtonMode="always"
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
                    clearButtonMode="always"
                    />
                    <TextInput
                        placeholder="team password"
                        secureTextEntry={true}
                        onChangeText={(teamPassword) => setTeamPassword2( teamPassword )}
                        style={styles.input1}
                        clearButtonMode="always"
                    />
                    <TouchableOpacity
                        onPress={()=> onJoinTeam()}
                        style={[ styles.button2, styles.buttonOutline ]}
                    >
                        <Text style={ styles.buttonOutlineText }>Join Team</Text>
                    </TouchableOpacity>
                </View>
        </View>
        // </TouchableWithoutFeedback>
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
