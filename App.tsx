import React from 'react';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './constants/types';
import datastore from './store/datastore';
import Homepage from './app/(Home)/Homepage'
import MapEditor from './app/(Editor)/MapEditor';
import Gallery from './app/(Editor)/Gallery';
import SearchHistory from './app/(Editor)/SearchHistory';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <Provider store={datastore}>
            <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='Homepage'
            >
                <Stack.Screen name="Homepage" component={Homepage} />
                <Stack.Screen name="MapEditor" component={MapEditor} />
                <Stack.Screen name="Gallery" component={Gallery} />
                <Stack.Screen name="SearchHistory" component={SearchHistory} />
            </Stack.Navigator>
        </Provider>
    )
}

export default App