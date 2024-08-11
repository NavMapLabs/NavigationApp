import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '@/constants/types';
import { getData, logOut } from './(Auth)/firebaseAuth';

const Homepage = () => {
  // Access navigation via useNavigation hook
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Hi Honghui</Text>
      <View style={[{ height: 10, backgroundColor: '#000' }]} />

      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('LogInScreen')
          console.log("Pressed")
        }}
      />
      
      <View style={[{ height: 10, backgroundColor: '#000' }]} />

      <Button
      title="Go to Editor"
      onPress={() => {
        navigation.navigate('MapEditor')
      }}
      />

      <Button
      title="Get Data"
      onPress={() => {getData()}}
      />

      <Button
      title="Log Out"
      onPress={() => {logOut()}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Homepage;