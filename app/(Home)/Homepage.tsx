import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '@/constants/types';
import { useState } from 'react';
import LogInModal from "@/app/(Auth)/LogInModal";
import SignUpModal from "@/app/(Auth)/SignUpModal";

const Homepage = () => {
  // Access navigation via useNavigation hook
  const navigation = useNavigation<HomeNavigationProp>();
  const [isLogInVisible, setLogInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);

    const toggleLogIn = () => {
        setLogInVisible(!isLogInVisible);
    }

    const toggleSignUp = () => {
        setSignUpVisible(!isSignUpVisible);
    }

  return (
    <View style={styles.container}>
      <Text>Hi Honghui</Text>
      <View style={[{ height: 10, backgroundColor: '#000' }]} />

      <LogInModal
        isVisible={isLogInVisible}
        onClose={toggleLogIn}
        toggleSignUp={toggleSignUp}
      />

      <SignUpModal
        isVisible={isSignUpVisible}
        onClose={toggleSignUp}
        toggleLogIn={toggleLogIn}
      />

      <Button
        title="Go to Login"
        onPress={() => {
          toggleLogIn()
          console.log("Pressed")
        }}
      />

      <View style={[{ height: 10, backgroundColor: '#000' }]} />

      <Button 
        title="Go to SignUp"
        onPress={() => {
          toggleSignUp()
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