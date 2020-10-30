import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from './LogIn2.js';
import SignUp from './SignUp.js';
import Map from '../Map.js';
import CreatGroup from '../CreatGroup';
import Chat from '../Chat';
import { color } from 'react-native-reanimated';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

////////////////////////////////////////////////////////////////////
// Root component has tabs for the Map suite
function Root() {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#181818' }}
      activeColor='#FFFFFF'
      inactiveColor='#3a3a3a'
    >
      <Tab.Screen name='Create Group' component={CreatGroup} />
      <Tab.Screen name='Map' component={Map} />
      <Tab.Screen name='Chat Window' component={Chat} />
    </Tab.Navigator>
  );
}

////////////////////////////////////////////////////////////////////
// HideTabBar has the screen stack for the Login and Signup
function HideTabBar() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Root'>
        {/* <Stack.Screen name='Sign Up' component={SignUp} /> */}
        {/* <Stack.Screen name='Log In' component={LogIn} /> */}
        <Stack.Screen
          name='Track Chat'
          component={Root}

          // option={{
          //   headerStyle: { backgroundColor: '#181818' },
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HideTabBar;
