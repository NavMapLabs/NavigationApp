import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Homepage: undefined;
    LogInScreen: undefined;
    SignUpScreen: undefined;
    MapEditor: undefined;
    SubMenu: undefined;
    //add more as you need navigation
}

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,'Homepage'>;
export type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LogInScreen'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUpScreen'>;
export type SubMenuNavigationProp = StackNavigationProp<RootStackParamList, 'SubMenu'>;
export type MapEditorNavigationProp = StackNavigationProp<RootStackParamList, 'MapEditor'>;