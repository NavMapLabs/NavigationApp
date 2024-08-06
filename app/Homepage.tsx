import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '@/constants/types';


const Homepage = () => {
  // Access navigation via useNavigation hook
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Hi Honghui</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('LogInScreen')
          console.log("Pressed")
        }}
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