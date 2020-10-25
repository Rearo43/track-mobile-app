import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Dimensions, Image, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from 'react-redux';


import MapScreen from './components/Map.js';
import SignUp from './components/EntryPoint.js';
import LogIn from './components/LoginView/LogIn2.js';

import LoginNav from './components/LoginView/LoginNav.js';

import Chat from './components/Chat.js'

import FlatListDemo from './components/CreatGroup';


import store from './store/index'

import { connect } from "react-redux";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );

}

function MainScreen(props) {

  return (
    !props.loggedIn
      ? <LoginNav />
      : <MapScreen />

  )

}

const mapStateToProps = store => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username
  }
}

connect(mapStateToProps)(MainScreen);

export default App;