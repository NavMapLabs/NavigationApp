import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { RootStackParamList } from './constants/types';
import datastore from './store/datastore';
import Homepage from './app/Homepage'
import MapEditor from './app/(Editor)/MapEditor';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Provider store={datastore}>
            <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='Homepage'
            >
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="MapEditor" component={MapEditor} />
            </Stack.Navigator>
        </Provider>
    )
}

export default App