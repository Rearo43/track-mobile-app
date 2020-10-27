import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import Loading from '../components/Loading';
import ChatWindows from './ChatWindow';
import SearchBar from './SearchBar';

const Drawer = createDrawerNavigator();

const Add = (event) => {
  const grouping = [];
  grouping.push(event);
  Alert.alert(event, 'Added to Group');

  console.log('GROUPING', grouping);
};

const Item = ({ item, style }) => (
  <View key={item}>
    <View>
      <TouchableOpacity style={[styles.item, style]}>
        <Text style={styles.title}>{item}</Text>
        <Button title={'Add to Group'} onPress={() => Add(item)} />
      </TouchableOpacity>
    </View>
  </View>
);

const GroupChat = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [users, setUsers] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState('');

  function filterUsers(usersArr, query) {
    return usersArr.filter((name) => {
      return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  const getUsers = useEffect(() => {
    async function allUsers() {
      await axios
        .get('https://trackchat.herokuapp.com/getusers')
        // .get('http://localhost:3000/getusers')
        .then((users) => {
          setUsers(users.data);
          // console.log(filterUsers(users.data, searchedUsers));
          // console.log(searchedUsers);
        })
        .catch((error) => console.log(error));
    }
    allUsers();
  }, []);
  const names = users;

  function onChangeSearch(query) {
    console.log(names);
    setSearchedUsers(query);
    console.log('TEXT TYPED', query);
    // if(query === '') {
    //   setUsers(users)
    //   console.log('BLANK SEARCH', users);
    // } else {
      setUsers(filterUsers(names, query));
      // console.log('NOT BLANK SEARCH', users);
      // setUsers(users);
    // }

  }

  const renderItem = ({ item }) => {
    const backgroundColor = 'white';

    return (
      <Item
        item={item}
        // onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return !users ? (
    <Loading />
  ) : (
    <>
      <SafeAreaView style={styles.container}>
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          // value={searchedUsers}
        />
        <View>
          <Text>{searchedUsers}</Text>
        </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});

function sideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Find Users' component={GroupChat} />
      <Drawer.Screen name='Chat Window' component={ChatWindows} />
    </Drawer.Navigator>
  );
}

export default sideDrawer;
