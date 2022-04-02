import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import {View, Text} from 'react-native';
import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAAHxpYwk9ef05B_Jlpa8S2DwP2T5hNgq8",
  authDomain: "instagram-dev-5878d.firebaseapp.com",
  projectId: "instagram-dev-5878d",
  storageBucket: "instagram-dev-5878d.appspot.com",
  messagingSenderId: "168302010238",
  appId: "1:168302010238:web:96caf38d7f946905ea1d2f",
  measurementId: "G-K1VFXSMWDG"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/Landing';
import RegisterScreen from './components/Register';


const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lodaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: TabRouter
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }

    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false}} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
  }
}


export default App