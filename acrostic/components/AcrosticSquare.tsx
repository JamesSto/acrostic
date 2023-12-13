
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SQUARE_ROW_LENGTH, SQUARE_BORDER_WIDTH } from '../constants/GridConstants';
import { AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

interface AcrosticSquareProps {
    squareData: AcrosticSquareData;
    isHighlighted: boolean;
    onSquarePress: () => void;
}

export const AcrosticSquare: React.FC<AcrosticSquareProps> = ({ squareData, isHighlighted, onSquarePress }) => {

    return (
        <TouchableOpacity onPress={onSquarePress} style={[styles.square, styles.standardSquare, isHighlighted && styles.highlighted]}>
            <View style={styles.content}>
                <Text style={[styles.squareNumber, styles.squareLabel]}>{squareData.squareNumber}</Text>
                <Text style={[styles.clueLetter, styles.squareLabel]}>{squareData.clueLetter}</Text>
                <Text style={styles.answerLetter}>{squareData.answerLetter}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const BlackSquare: React.FC = () => {
    return <View style={[styles.square, styles.blackSquare]} />
}

const styles = StyleSheet.create({
    square: {
        width: `${100 / SQUARE_ROW_LENGTH - 0.1}%`,
        aspectRatio: '1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: -1 * SQUARE_BORDER_WIDTH / 2,
    },
    standardSquare: {
        backgroundColor: '#f0f0f0',
        zIndex: 1,
        borderColor: 'gray',
        borderWidth: SQUARE_BORDER_WIDTH,
    },
    blackSquare: {
        backgroundColor: '#333333',
        zIndex: 2,
    },
    highlighted: {
        backgroundColor: '#ffcd33',
    },
    content: {
        // Style to position the number and letter
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareLabel: {
        position: 'absolute',
        fontSize: 9,
        top: '-5%',
        color: '#707070',
    },
    squareNumber: {
        left: '3%',
    },
    clueLetter: {
        right: '4%',
    },
    answerLetter: {
        fontSize: 17,
        top: '9%',
        textAlign: 'center',
        fontWeight: '500',
    }
});
