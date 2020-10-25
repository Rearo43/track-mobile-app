import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchUsers from "./SearchBar";
import fakeDATA from "./FakeData";

const Item = ({ item, onPress, style }) => (
  <View>
    <View key={fakeDATA.phone}>
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>{item.phone}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

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
    <>
      <SafeAreaView style={styles.container}>
        <SearchUsers />
        <View style={styles.linearGradient}>
          <FlatList
            data={fakeDATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
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

export default App;

// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   FlatList,
//   TouchableOpacity
// } from "react-native";

// const Line = ({ person, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text>{person.name}</Text>
//     <Text>{person.phone}</Text>
//   </TouchableOpacity>
// );

// function List() {
//   const [people, setPeople] = useState([
//     { name: "Cas", phone: "2061111111" },
//     { name: "Rea", phone: "2062222222" },
//     { name: "Josh", phone: "2063333333" },
//     { name: "Chris", phone: "2064444444" },
//     { name: "JB", phone: "2065555555" },
//   ]);
//   return (
//     <View>
//       <ScrollView>
//         {people.map((person) => (
//           <View key={person.phone}>
//             <SafeAreaView style={styles.container}>
//               <Text>{person.name}</Text>
//               <Text>{person.phone}</Text>
//             </SafeAreaView>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 100,
//     borderStyle: 'solid',
//     borderColor: 'black',

//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default FakeDate;

//____________________________________NO COLOR, NO SPLIT, LIST

// import React, { useState } from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from "react-native";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// const Item = ({ item, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={styles.title}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const App = () => {
//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({ item }) => {
//     // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         // style={{ backgroundColor }}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,

//     elevation: 12,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default App;

//____________________________________COLOR GRADIENT, NO SPLIT, LIST

// import React, { useState } from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//   },
// ];

// const Item = ({ item, onPress, style }) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//     <Text style={[styles.item, style]}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const App = () => {
//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({ item }) => {

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//       />
//     );
//   };

//   return (
//     <>
//       <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]}>
//         <FlatList
//           data={DATA}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           extraData={selectedId}
//         />
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     padding: 20,
//     // borderBottomColor: "grey",
//     // borderBottomWidth: 2,
//     marginBottom: 4,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 3,
//   },
//   title: {
//     fontSize: 32,

//     marginLeft: 110,
//   },
// });

// export default App
