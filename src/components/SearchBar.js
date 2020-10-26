import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

function SearchUsers() {
  const [searchUsers, setSearchUsers] = useState('');

  function onChangeSearch(query) {
    const enteredText = setSearchUsers(query);
  }

  return (
    <>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        // value={searchUsers}
      />
      <View>
        <Text>{searchUsers}</Text>
      </View>
    </>
  );
}

export default SearchUsers;
