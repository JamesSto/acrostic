import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN, PUZZLE_SELECTOR_SCREEN } from '../constants/NavigationConstants';


const PuzzleSelector: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Go to Current Puzzle"
                onPress={() => navigation.navigate(ACROSTIC_SCREEN)}
            />
        </View>
    );
};

interface Props {
    navigation: NativeStackNavigationProp<any, any>;
}

export default PuzzleSelector;
