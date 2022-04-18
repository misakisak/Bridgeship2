import React, { Component, useCallback } from 'react';
import { View, Button, TextInput, StyleSheet, Image, SafeAreaView, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Constants } from 'expo-constants';

import firebase from 'firebase';

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);

    return <Button title={children} onPress={handlePress} />;
};

export class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render () {
        return (
            <SafeAreaView style={{ backgroundColor: 'white' }}> 
                <View style={styles.color}>
                    <Text style={[ styles.paragraph2, { flexDirection: "column" }]}> Bridgeship </Text>

                    <View 
                        style={ styles.container }
                        onPress={this.OpenWEB}
                    >
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-dev-5878d.appspot.com/o/Ellipse%203.png?alt=media&token=fd22f7f9-09e4-4d11-86b7-15043784c2d6' }}
                                style={{ height: 110, width: 110, shape:'cercle' }}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[ styles.paragraph1,{ flexDirection:"column" }]}>Let's start your journey to change the world with us!</Text>

                    <View style={[ styles.inputContainer, { flexDirection: "column" }]}>
                        <TextInput
                            placeholder="email"
                            onChangeText={(email) => this.setState({ email })}
                            style={ styles.input1 }
                        />

                        <TextInput
                            placeholder="password"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            style={ styles.input2 }
                        />
                    </View>

                    <View styles={[ styles.buttonContainer, { flexDirection: "column" }]}>
                        <TouchableOpacity
                            style={ styles.button }
                            onPress={() => this.onSignUp()}
                        >
                            <Text style={ styles.buttonText }>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={ styles.button }
                            onPress={()=> this.props.navigation.navigate('Register')}
                            style={[ styles.button2, styles.buttonOutline ]}
                        >
                            <Text style={ styles.buttonOutlineText }>Register</Text>
                        </TouchableOpacity>

                        <OpenURLButton url={'https://thirtytg88.wixsite.com/bridgeship'}>
                            Official Web Site
                        </OpenURLButton>

                        <OpenURLButton url={'https://twitter.com/TgThirty'}>
                            Twitter: @TgThirty
                        </OpenURLButton>
                    </View>
                </View>
            </SafeAreaView> 
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
        padding:10,
        marginTop:5,
    },
    inputContainer: {
        width: '100%',
        padding:10,
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
    input2: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 0,
        borderColor:'#95E1D3',
        borderWidth:2,
        margin:10,
        padding:10,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    button: {
        // buttonAlign:'center',
        // buttonJustify:'center',
        backgroundColor: '#F38181',
        width: '85%',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        marginLeft:30,
        marginRight:30,
        marginTop:10,
    },
    button2: {
        // buttonAlign:'center',
        // buttonJustify:'center',
        backgroundColor: 'white',
        width: '85%',
        padding: 15,
        borderRadius: 0,
        alignItems: 'center',
        marginLeft:30,
        marginRight:30,
        marginTop:10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: '#F38181',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#F38181',
        fontWeight: '700',
        fontSize: 16,
    },
    paragraph1: {
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        margin:10,
        marginRight:16,
        color:'black',
        fontWeight:'200',
        fontSize:15,
    },
    paragraph2: {
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        color:'#FCE38A',
        fontWeight:'800',
        fontSize:30,
    },
    background: {
        color:'#EAFFD0',
    },
    color: {
        color: 'white',
        height: '100%',
    },
})