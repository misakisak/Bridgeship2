import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';

import {View, Text} from 'react-native';

import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))

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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen, { Register } from './components/auth/Register';
import LoginScreen from './components/auth/Login'
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import {Main} from './components/Main';
import TeamScreen from './components/main/Team'

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
          loaded: true,
        })
      } else {
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
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{headerShown: false}}
            />
             <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
              <Stack.Screen 
                name="Add" 
                component={AddScreen} 
                navigation={this.props.navigation} 
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Save" 
                component={SaveScreen}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'}
                }}
              />
              <Stack.Screen 
                name="Team" 
                component={TeamScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>
      
    )
  }
}


export default App