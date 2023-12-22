import React from 'react';

import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AcrosticSquare, BlackSquare } from './AcrosticSquare';
import PuzzleClue from './PuzzleClue';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import { AcrosticPuzzleData } from '../puzzle_logic/AcrosticPuzzleData';

const PuzzleCluesView: React.FC<Props> = ({ navigation }) => {
    let puzzleData = parseAcrosticPuzzle(PUZZLE_TEXT);
    return (
        <ScrollView>
            <View style={styles.container}>
                {puzzleData.clues.map((clueData, index) => (
                    <PuzzleClue key={index} acrosticClueData={clueData} />
                ))}
            </View>
        </ScrollView>
    );
};

interface Props {
    navigation: NativeStackNavigationProp<any, any>;
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});


export default PuzzleCluesView;
