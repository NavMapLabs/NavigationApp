import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Homepage: undefined;
    MapEditor: undefined;
    Gallery: undefined;
    SearchHistory: undefined;
    //add more as you need navigation
}

export type HomeNavigationProp = StackNavigationProp<RootStackParamList,'Homepage'>;
export type MapEditorNavigationProp = StackNavigationProp<RootStackParamList, 'MapEditor'>;
export type GalleryNavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;
export type SearchHistoryNavigationProp = StackNavigationProp<RootStackParamList, 'SearchHistory'>;
