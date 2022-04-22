import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore')


export default function Teamup ({route}) {

    return (
        <View>
            <Text>{route.params.resultTeam.id}</Text>
            <Text>{route.params.resultTeam.teamName}</Text>
            <Text>{route.params.resultTeam.teamPassword}</Text>
            <Text></Text>
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
