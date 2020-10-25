import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Loading() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/loadingdots.jpg')}
      />
    </View>
  )
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading;
