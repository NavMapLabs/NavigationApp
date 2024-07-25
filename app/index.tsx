import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import RootStackParamList from '../App';

// Define the navigation prop type for this component
type IndexScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Index'
>;

const Index: React.FC<IndexScreenNavigationProp> = () => {
  const navigation = useNavigation<IndexScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Hi Honghui</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('LogIn')}
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

export default Index;