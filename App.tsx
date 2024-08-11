import React from 'react';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import { RootStackParamList } from './constants/types';
import datastore from './store/datastore';
import Homepage from './app/Homepage'
import MapEditor from './app/(Editor)/MapEditor';
import SubMenu from './components/SubMenu';
import LogInScreen from './app/(Auth)/LogIn';
import SignUpScreen from './app/(Auth)/SignUp';

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
                {/* <Stack.Screen name="SubMenu" component={SubMenu} /> error here, somewhere*/}
                <Stack.Screen name="LogInScreen" component={LogInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            </Stack.Navigator>
        </Provider>
    )
}

export default App