import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/constants/types';

type HomeNavigationProp = StackNavigationProp<RootStackParamList,'Homepage'>;

const Homepage: React.FC = () => {
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