import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { RootStackParamList } from './constants/types';
import Homepage from './app/Homepage'
import LogInScreen from './app/(Auth)/LogIn';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Homepage'
        >
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
        </Stack.Navigator>
    )
}

export default App