import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')


export class Teamup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            teamName: '',
            teamPassword: ''
        }
        this.onTeamUp = this.onTeamUp.bind(this)
    }

    onTeamUp () {
        const {teamName, teamPassword} = this.state;
        firebase.auth().createTeamWithTeamNameAndTeamPassword(teamName, teamPassword)
        .then((result) => {
            firebase.firestore().collection("team")
            .doc(firebase.auth().currentTeam.uid)
            .set({
                teamName,
                teamPassword
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render (){
        return (
            <View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <TextInput
                    placeholder="team name"
                    onChangeText={(teamName) => this.setState({ teamName })}
                    style={styles.input1}
                />
                <TextInput
                    placeholder="team password"
                    secureTextEntry={true}
                    onChangeText={(teamPassword) => this.setState({ teamPassword })}
                    style={styles.input1}
                />
                <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate('Register')}
                    style={[ styles.button2, styles.buttonOutline ]}
                >
                    <Text style={ styles.buttonOutlineText }>TeamUp</Text>
                </TouchableOpacity>
            </View>
        )
    }
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

export default Teamup