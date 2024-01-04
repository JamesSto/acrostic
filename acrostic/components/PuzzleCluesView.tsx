import React, { memo } from 'react';

import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AcrosticSquare, BlackSquare } from './AcrosticSquare';
import PuzzleClue from './PuzzleClue';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import { AcrosticPuzzleData } from '../puzzle_logic/AcrosticPuzzleData';

const PuzzleCluesView: React.FC<Props> = memo(({ puzzle }) => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {puzzle.clues.map((clueData, index) => (
                    <PuzzleClue key={index} acrosticClueData={clueData} />
                ))}
            </View>
        </ScrollView>
    );
}, (prevProps, nextProps) => { return prevProps.puzzle.equals(nextProps.puzzle); });

interface Props {
    puzzle: AcrosticPuzzleData,
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
