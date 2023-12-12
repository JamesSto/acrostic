import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN, PUZZLE_SELECTOR_SCREEN } from '../constants/NavigationConstants';
import AcrosticSquare from './AcrosticSquare';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import { AcrosticPuzzleData, AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

const PuzzleMain: React.FC<Props> = ({ navigation }) => {
    let puzzle = parseAcrosticPuzzle(PUZZLE_TEXT);
    return (
        <View>
            <Button
                title="Go to Puzzle Selector"
                onPress={() => navigation.navigate(PUZZLE_SELECTOR_SCREEN)}
            />
            {puzzle.grid.quoteSquares.map((word: AcrosticSquareData[], index: number) => 
                <View style={styles.word} key={index}>{word.map((square: AcrosticSquareData) => 
                    <AcrosticSquare key={square.squareNumber} squareData={square} isHighlighted={false} onSquarePress={() => null} />)}
                </View>
            )}
        </View>
    );
};

interface Props {
    navigation: NativeStackNavigationProp<any, any>;
}

const styles = StyleSheet.create({
    word: {
        flexDirection: 'row',
    }
});

export default PuzzleMain;
