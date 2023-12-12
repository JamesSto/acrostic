
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

interface AcrosticSquareProps {
    squareData: AcrosticSquareData;
    isHighlighted: boolean;
    onSquarePress: () => void;
}

const AcrosticSquare: React.FC<AcrosticSquareProps> = ({ squareData, isHighlighted, onSquarePress }) => {

    return (
        <TouchableOpacity onPress={onSquarePress} style={[styles.container, isHighlighted && styles.highlighted]}>
            <View style={styles.content}>
                <Text style={[styles.squareNumber, styles.squareLabel]}>{squareData.squareNumber}</Text>
                <Text style={[styles.clueLetter, styles.squareLabel]}>{squareData.clueLetter}</Text>
                <Text style={styles.answerLetter}>{squareData.answerLetter}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderWidth: 1.5,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: -0.75,
        backgroundColor: '#f0f0f0',
    },
    highlighted: {
        backgroundColor: 'yellow',
    },
    square: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
        fontSize: 10,
        top: '-5%',
        color: 'gray',
    },
    squareNumber: {
        left: '5%',
    },
    clueLetter: {
        right: '5%',
    },
    answerLetter: {
        fontSize: 24,
        top: '5%',
        textAlign: 'center',
    }
});

export default AcrosticSquare;
