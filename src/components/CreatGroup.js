import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import Loading from '../components/Loading'

const Add = () => {
  Alert.alert("Added to Group");
};

const Item = ({ item, style }) => (
  <View key={item}>
    <View>
      <TouchableOpacity style={[styles.item, style]}>
        <Text style={styles.title}>{item}</Text>
        <Button title={"Add to Group"} onPress={Add} />
      </TouchableOpacity>
    </View>
  </View>
);

const GroupChat = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
      async function allUsers() {
        await axios
          .get("https://trackchat.herokuapp.com/getusers")
          .then((users) => {
            setUsers(users.data);
            console.log(users);
          })
          .catch((error) => console.log(error));
      }
      allUsers();
  }, [])

  const renderItem = ({ item }) => {
    const backgroundColor = "white";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    !users ? <Loading /> :
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.linearGradient}>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </SafeAreaView>
    </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  linearGradient: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});

export default GroupChat;
