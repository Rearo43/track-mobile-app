import React, { useEffect, useState } from 'react'
import { Dimensions, Form, Image, FlatList, Platform, StyleSheet, Switch, TabBarIOS, Text, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import SignUp from './LoginView/SignUp.js';

// function Footer() {

//   return (
//     <SignUp />
//   )
// }

function Footer() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>CURRENTLY ON "HOME"</Text>
      <SignUp />
    </View>
  );
}
export default Footer;
