import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Homepage: undefined;
    LogInScreen: undefined;
    SignUpScreen: undefined;
    //add more as you need navigation
}

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,'Homepage'>;
export type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LogInScreen'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;
