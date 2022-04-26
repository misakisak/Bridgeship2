import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';

import {View, Text} from 'react-native';

import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const store = createStore(rootReducer, applyMiddleware(thunk))

// const firebaseConfig = {
//   apiKey: "AIzaSyAAHxpYwk9ef05B_Jlpa8S2DwP2T5hNgq8",
//   authDomain: "instagram-dev-5878d.firebaseapp.com",
//   projectId: "instagram-dev-5878d",
//   storageBucket: "instagram-dev-5878d.appspot.com",
//   messagingSenderId: "168302010238",
//   appId: "1:168302010238:web:96caf38d7f946905ea1d2f",
//   measurementId: "G-K1VFXSMWDG"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDLl9Ee2hrtqWWmpr-0OgEuZtZ5dijx8X4",
//   authDomain: "bridgeship2.firebaseapp.com",
//   projectId: "bridgeship2",
//   storageBucket: "bridgeship2.appspot.com",
//   messagingSenderId: "768368078030",
//   appId: "1:768368078030:web:5b111b501f4503f8eb349f"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDk9JZPBbcwXMAIb6wzbUS67xX93Di-GRY",
  authDomain: "bridgeship-a9ee6.firebaseapp.com",
  projectId: "bridgeship-a9ee6",
  storageBucket: "bridgeship-a9ee6.appspot.com",
  messagingSenderId: "61536606553",
  appId: "1:61536606553:web:8ae4e2b6bdbea8b0151448"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer, NavigationContext, NavigationHelpersContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen, { Register } from './components/auth/Register';
import LoginScreen from './components/auth/Login'
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import {Main} from './components/Main';
import TeamScreen from './components/main/Team'
import TeamPostScreen from './components/main/TeamPost'
import SettingScreen from './components/main/Setting'
import CommentScreen from './components/main/Comment'
import FollowingScreen from './components/main/Following'
import TeamSearchScreen from './components/main/TeamSeach'
import PostCommentScreen from './components/main/PostComment'
import FollowedScreen from './components/main/Followed'
import LikeScreen from './components/main/Like'
import FeedCommentScreen from './components/main/FeedComment'
import EditProfileScreen from './components/main/EditProfile'

const Stack = createStackNavigator();
// const [state1, setState1] = useState(true)

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
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    if(!loaded){
      return(
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>Every single have rights and power to change the world. It is up to you!!</Text>
          </View>
      )
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
                name="Post" 
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
              <Stack.Screen 
                name="TeamPost" 
                component={TeamPostScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Setting" 
                component={SettingScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Comment" 
                component={CommentScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Following" 
                component={FollowingScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Follower" 
                component={FollowedScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="TeamSearch" 
                component={TeamSearchScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="PostComment" 
                component={PostCommentScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="Like" 
                component={LikeScreen} 
                navigation={this.props.navigation}
                options={{
                  headerStyle: {backgroundColor: "#95E1D3"},
                  headerTintColor: "white",
                  headerTitleStyle: {fontWeight: 'bold'},
                }}
              />
              <Stack.Screen 
                name="FeedComment" 
                component={FeedCommentScreen} 
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