import React, { memo } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN, PUZZLE_SELECTOR_SCREEN } from '../constants/NavigationConstants';
import { SQUARE_ROW_LENGTH } from '../constants/GridConstants';
import { AcrosticSquare, BlackSquare } from './AcrosticSquare';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import { AcrosticPuzzleData, AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

const PuzzleGrid: React.FC<Props> = memo(({ puzzle }) => {
    return (
        <View style={[styles.grid]}>
            {
                flattenWords(puzzle.grid.quoteSquares).map((row: JSX.Element[], index: number) =>
                    <View style={styles.word} key={index}>{row}</View>)
            }
        </View>
    );
}, (prevProps, nextProps) => { return prevProps.puzzle.equals(nextProps.puzzle); });

const flattenWords = function (squares: AcrosticSquareData[][]): JSX.Element[][] {
    let acc: JSX.Element[][] = [];
    let count = 0;
    let curr_arr: JSX.Element[] = [];
    squares.forEach((word: AcrosticSquareData[], index: number) => {
        if (index != 0) {
            curr_arr.push(<BlackSquare key={count++} />);
        }
        if (curr_arr.length == SQUARE_ROW_LENGTH) {
            acc.push(curr_arr);
            curr_arr = [];
        }
        word.forEach((square: AcrosticSquareData) => {
            curr_arr.push(
                <AcrosticSquare key={count++} squareData={square} isHighlighted={false} onSquarePress={() => null} />
            );
            if (curr_arr.length == SQUARE_ROW_LENGTH) {
                acc.push(curr_arr);
                curr_arr = [];
            }
        });
    });
    if (curr_arr.length > 0) {
        acc.push(curr_arr);
    }
    while (curr_arr.length < SQUARE_ROW_LENGTH) {
        curr_arr.push(<BlackSquare key={count++} />);
    }
    return acc;
}

interface Props {
    puzzle: AcrosticPuzzleData,
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '3%'
    },
    word: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    grid: {
        marginTop: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
});

export default PuzzleGrid;
