import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigationProp } from '@/constants/types';
import { useState } from 'react';
import LogInModal from "@/app/(Auth)/LogInModal";
import SignUpModal from "@/app/(Auth)/SignUpModal";
import {getData} from "@/app/(Backend)/BackendFunc"; 
import SubmissionModal from '../(Backend)/SubmissionModal';
import { map_meta_info } from '@/app/(Backend)/BackendFunc';
// testing
const Homepage = () => {
  // Access navigation via useNavigation hook
  const navigation = useNavigation<HomeNavigationProp>();
  const [isLogInVisible, setLogInVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isSubmitVisible, setSubmitVisible] = useState(false);
    const toggleLogIn = () => {
        setLogInVisible(!isLogInVisible);
    }

    const toggleSignUp = () => {
        setSignUpVisible(!isSignUpVisible);
    }

    const toggleSubmit = () => {
        setSubmitVisible(!isSubmitVisible);
    }
    const map_Info: map_meta_info = {}
  return (
    <View style={styles.container}>
      <Text>This is the Tester Version</Text>
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

      < SubmissionModal
        isVisible = {isSubmitVisible}
        onClose = {toggleSubmit}
        map_Info={map_Info}
      />

      <Button
        title="Go to Login"
        onPress={() => {
          getData("Kemper")
          toggleSubmit()
          // toggleLogIn()
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