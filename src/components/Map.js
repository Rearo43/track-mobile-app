import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Switch,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import socketIO from "socket.io-client";
import { connect } from "react-redux";
import { location } from "../store/login";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import AddGroupTab from '../components/GroupAdd.js';

// const Tab = createBottomTabNavigator();

import Loading from "../components/Loading.js";

const socket = socketIO("https://trackchat.herokuapp.com");

const Map = (props) => {
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [locationResult, setLocationResult] = useState("");
  const [currentLocations, setCurrentLocations] = useState({});
  const [sosLocation, setSosLocation] = useState(null);

  //key user: value: lat/lon
  const [everyonesPosition, setEveryonesPosition] = useState({});

  const grantLocationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setCurrentLocations("Permission to access location was denied");
    } else {
      setLocationPermissions(true);
      getStartingPosition();
    }
  };

  const grabLocation = (latitude, longitude) => {
    props.location({ latitude, longitude });
    // console.log(user, 'user')
    socket.emit("locationBroadcast", {
      user: props.loggedIn ? props.username : "user",
      latitude,
      longitude,
      color: props.color,
    });
    // socket.emit('locationBroadcast', { user: 'fake', latitude: 47.61625, longitude: -122.3119 })
  };

  useEffect(() => {
    grantLocationPermissions();
  }, []);

  useEffect(() => {
    socket.emit("join", { username: props.username || "user" });
    socket.on("location", (location) => {
      // console.log('location of a user:', location);
      // this is where we set everyones position
      addUsersToMap(location);
    });
    socket.on("sos", (alert) => {
      setSosLocation({
        latitude: alert.location.latitude,
        longitude: alert.location.longitude,
        user: alert.username,
      });
    });
    // socket.on('userLeaves', user => {
    //   let everyoneElse = currentLocations;
    //   delete everyoneElse[user];
    //   setEveryonesPosition(everyoneElse);
    // })
  }, []);

  const addUsersToMap = (location) => {
    // console.log("in add users to map", location.user);

    setEveryonesPosition((oldObj) => ({
      ...oldObj,
      [location.user]: {
        latitude: location.latitude,
        longitude: location.longitude,
        color: location.color,
      },
    }));
  };

  const repeatingLocations = () => {
    setInterval(async () => {
      // console.log("in interval");
      let location = await Location.getCurrentPositionAsync({});
      grabLocation(location.coords.latitude, location.coords.longitude);
    }, 3000);
  };

  useEffect(() => {
    // console.log("every position in use effect", everyonesPosition);
  }, [everyonesPosition]);

  const getStartingPosition = async () => {
    let location = await Location.getCurrentPositionAsync({});

    // setLocationResult({ locationResult: JSON.stringify(location) });

    grabLocation(location.coords.latitude, location.coords.longitude);

    setCurrentLocations({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setIsLoading(false);
    repeatingLocations();
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocations.latitude,
              longitude: currentLocations.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {sosLocation && (
              <Marker.Animated
                coordinate={{
                  latitude: sosLocation.latitude,
                  longitude: sosLocation.longitude,
                }}
                key={sosLocation.user}
                pinColor="red"
                title={sosLocation.user}
              />
            )}

            {Object.keys(everyonesPosition).map((user) => (
              <Marker.Animated
                coordinate={{
                  latitude: everyonesPosition[user].latitude,
                  longitude: everyonesPosition[user].longitude,
                }}
                key={user}
                pinColor={everyonesPosition[user].color}
                title={user}
              />
            ))}
          </MapView>
        )}

        {/* <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Create Group" component={AddGroupTab} />
          </Tab.Navigator>
        </NavigationContainer> */}
      </View>
    </>
  );
};

// STYLING

const getRandomColor = () => {
  let hexcode = "#" + Math.random().toString(16).slice(2, 8);
  return hexcode;
};

let pinColor = getRandomColor();
let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  coords: {
    height: 50,
  },
  sos: {
    marginTop: 65,
    marginHorizontal: "5%",
  },
});

// function MapScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>CURRENTLY ON "MAP SCREEN"</Text>
//       <Map />
//     </View>
//   );
// }

// export default Map;

function MapScreen(props) {
  return (
    <>
      {/* <MaterialCommunityIcons
        name="bell-alert-outline"
        size={50}
        color="red"
        style={styles.sos}
        onPress={() => sosAlert()}
      /> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>CURRENTLY ON "MAP SCREEN"</Text>
        <Map
          username={props.username}
          location={props.location}
          loggedIn={props.loggedIn}
          color={props.color}
        />
      </View>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username,
    color: store.logReducer.color,
  };
};

const mapDispatchToProps = { location };

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
