import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Header(){
    return(
    <View style={styles.Header}>
        <Text style={styles.title}>Daftar Menu Makanan</Text>
    </View>
        )
}
const styles = StyleSheet.create({
   Header: {
       height:80,
       paddingTop: 5
   },
   title: {
       textAlign: 'center',
       color: '#EFFBFB',
       fontSize:40,
       fontWeight:'bold',
       borderWidth: 4,
       borderRadius: 40,
      // fontFamily:
   }
});