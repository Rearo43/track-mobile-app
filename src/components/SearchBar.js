import * as React from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import fakeDATA from "./FakeData";

function SearchUsers() {
    
  const [searchUsers, setSearchUsers] = React.useState("");

  function onChangeSearch(query) {
    const enteredText = setSearchUsers(query);

  }

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchUsers}
      />
      <View>
        <Text>{searchUsers}</Text>
        {/* <Text>{JSON.stringify(fakeDATA)} === FAKE DATA</Text> */}
      </View>
    </>
  );
}

export default SearchUsers;
