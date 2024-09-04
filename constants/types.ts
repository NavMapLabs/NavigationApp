import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Homepage: undefined;
    MapEditor: undefined;
    //add more as you need navigation
}

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,'Homepage'>;
export type MapEditorNavigationProp = StackNavigationProp<RootStackParamList, 'MapEditor'>;