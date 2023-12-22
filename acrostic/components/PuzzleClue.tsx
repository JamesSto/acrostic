import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AcrosticSquare, BlackSquare } from './AcrosticSquare';
import { AcrosticClueData, AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

const PuzzleClue: React.FC<Props> = ({ acrosticClueData }) => {
    return (
        <View style={styles.clueContainer}>
            <View style={styles.clueLabelContainer}>
                <Text style={styles.clueLetter}>{acrosticClueData.letter}.</Text>
                <Text style={styles.clueText}>{acrosticClueData.clue}</Text>
            </View>
            <View style={styles.answerContainer}>
                {acrosticClueData.answer.map((squareData, index) => (
                    <AcrosticSquare key={index} squareData={squareData} isHighlighted={false} onSquarePress={() => null} />
                ))}
            </View>
        </View>
    );
};

interface Props {
    acrosticClueData: AcrosticClueData;
}

const styles = StyleSheet.create({
    clueContainer: {
        marginBottom: 14,
    },
    clueLabelContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        marginRight: 30,
    },
    clueLetter: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 16,
        width: 25,
    },
    clueText: {
        color: 'black',
        fontSize: 16,
    },
    answerContainer: {
        flexDirection: 'row',
        marginLeft: 25
    },
});

export default PuzzleClue;
