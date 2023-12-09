import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN, PUZZLE_SELECTOR_SCREEN } from '../constants/NavigationConstants';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';

const PuzzleMain: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>TODO: The actual puzzle view</Text>
            <Button
                title="Go to Puzzle Selector"
                onPress={() => navigation.navigate(PUZZLE_SELECTOR_SCREEN)}
            />
            <Text>{JSON.stringify(parseAcrosticPuzzle(PUZZLE_TEXT))}</Text>
        </View>
    );
};

interface Props {
    navigation: NativeStackNavigationProp<any, any>;
}

export default PuzzleMain;
