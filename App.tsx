import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { RootStackParamList } from './constants/types';
import Homepage from './app/Homepage'

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Homepage'
        >
            <Stack.Screen name="Homepage" component={Homepage} />
        </Stack.Navigator>
    )
}

export default App