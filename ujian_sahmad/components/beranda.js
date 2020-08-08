import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BasicFaltData from './BasicFlatListData'

// Screen Home
function HomeScreen({ navigation }) {
  return (
    <View style={styles.box1}>
      <Button
        title="Lihat Daftar Menu"
        onPress={() => navigation.navigate('Menu')}
      />
   </View>
  );
}



// Stack berguna untuk routing aplikasi
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" style={{}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={BasicFaltData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;







const styles = StyleSheet.create({
//header
box1: {
  flex: 1,
  backgroundColor: '#2196F3'
},
//content
box2: {
  flex: 10,
  backgroundColor: '#8BC34A'
},
//footer
box3: {
  flex: .5,
  backgroundColor: '#e3aa1a'
}

})