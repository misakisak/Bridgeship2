import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import firebase from 'firebase';
// import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing } from '../redux/actions/index';
// import { TabActions } from '@react-navigation/native';

import FeedScreen from './main/Feed';
// import AddScreen from './main/Add';
import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';
import TeamupScreen from './main/Teamup'



const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    // componentDidMount(){
    //     this.props.fetchUser();
    //     this.props.fetchUserPosts(); //前に動かなくてcomponentDidMountコメントアウトしていた
    //     this.props.fetchUserFollowing();
    // }

    render() {
        return ( 
           <Tab.Navigator 
                initialRouteName="Feed" 
                labeled={false}
                barStyle={{ backgroundColor: "#95E1D3" }}
            >
               <Tab.Screen name="Feed" component={FeedScreen}
                    options={{
                       tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="home" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                    options={{
                       tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                        ),
                    }}
                />
                <Tab.Screen name="Teamup" component={TeamupScreen}
                    options={{
                       tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="account-group" color={color} size={26}/>
                        ),
                    }}
                />
               <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                       tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                        ),
                    }}
                />
               <Tab.Screen name="Profile" component={ProfileScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }})}
                    options={{
                       tabBarIcon: ({ color, size }) => (
                           <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                        ),
                    }}
                />
           </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
