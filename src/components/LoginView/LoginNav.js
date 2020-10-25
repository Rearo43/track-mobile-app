import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from './LogIn2.js';
import SignUp from './SignUp.js';
import Map from '../Map.js';
import CreatGroup from '../CreatGroup';
import Chat from '../Chat'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

////////////////////////////////////////////////////////////////////
// Root component has tabs for the Map suite
function Root() {
  return (

      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Create Group" component={CreatGroup} />
        <Tab.Screen name="Chat Window" component={Chat} />
      </Tab.Navigator>
  );
}

////////////////////////////////////////////////////////////////////
// HideTabBar has the screen stack for the Login and Signup
function HideTabBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Track Chat" component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default HideTabBar;


