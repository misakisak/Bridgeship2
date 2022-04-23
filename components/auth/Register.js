import React, { Component, useCallback } from 'react';
import { View, Button, TextInput, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';

import firebase from 'firebase';

const OpenURLButton = ({ url, children, style, style2, style3, style4}) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
        }, [url]);

    return <View style={style4}>
         <TouchableOpacity onPress={handlePress} style={[style, style2]} ><Text style={style3}>{children}</Text></TouchableOpacity>
        </View>;
};

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            bio: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name, bio } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((result) => {
              firebase.firestore().collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                      name,
                      email,
                      bio,
                  })
            //   console.log(result)
          })
          .catch((error) => {
             console.log(error)
          })
    }

    render () {
        return (
            <SafeAreaView style={{backgroundColor: 'white'}}>
                <View style={styles.color}>
                    <Text style={[styles.paragraph2, {flexDirection: "column"}]}>Bridgeship</Text>

                    <View style={styles.container}>
                    <Image
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-dev-5878d.appspot.com/o/Ellipse%203.png?alt=media&token=fd22f7f9-09e4-4d11-86b7-15043784c2d6' }}
                        style={{ height: 110, width: 110, shape: 'curcl' }}
                    />
                    </View>

                    <Text style={[styles.paragraph1, {flexDirection: "column"}]}>Let's start your journey to change the world with us!</Text>
            
                    <View style={[styles.inputContainer, {flexDirection: "column"}]}>
                        <TextInput
                            placeholder="name"
                            onChangeText={(name) => this.setState({ name })}
                            style={styles.input1}
                        />

                        <TextInput
                            placeholder="email"
                            onChangeText={(email) => this.setState({ email })}
                            style={styles.input1}
                        />

                        <TextInput
                            placeholder="password"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                            style={styles.input1}
                        />
                        
                        <TextInput
                            placeholder="Bio"
                            onChangeText={(bio) => this.setState({ bio })}
                            style={styles.input1}
                        />
                    </View>

                    <View styles={[styles.buttonContainer, {flexDirection: "column"}]}>
                        <TouchableOpacity
                            onPress={() => this.onSignUp()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>  

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={[styles.button2, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Login</Text>
                        </TouchableOpacity>  
                    </View>

                    <View styles={[ styles.buttonContainer]}>

                        <OpenURLButton url={'https://thirtytg88.wixsite.com/bridgeship'} style={styles.buttonOutline3} style2={styles.button3} style3={styles.buttonText3} style4={styles.button33} > 
                            Official Web Site
                        </OpenURLButton>
                        <OpenURLButton url={'https://twitter.com/TgThirty'} style={styles.buttonOutline3} style2={styles.button3} style3={styles.buttonText3} > 
                            Twitter: @TgThirty
                        </OpenURLButton>

                    </View>

                </View>
            </SafeAreaView> 
        )
    }
}

export default Register

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
        marginTop:5,
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
    paragraph1:{
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        margin:10,
        marginRight:16,
        color:'black',
        fontWeight:'200',
        fontSize:15,
    },
    paragraph2:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        color:'#FCE38A',
        fontWeight:'800',
        fontSize:30,
    },
    background:{
        color:'#EAFFD0'
    },
    color: {
        color: 'white',
        height: '100%'
    },
    container2: {
        height: '100%' 
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
    buttonOutline3:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#FCE38A',
        borderWidth: 2,
        alignItems: 'center',
     },
    buttonText3:{
        textAlign:'center',
        justifyContent:'center',
        color:'grey',
        fontWeight:'600',
        fontSize:12,
        margin:5,
        alignItems: 'center',
    },
    button33: {
        flexWrap: 'wrap',
        alignContent: 'space-around',
        marginTop: 8
    }
})