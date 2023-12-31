import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LetterButton: React.FC<LetterButtonProps> = ({ letter, handleLetterPress }) => {
    return (
        <TouchableOpacity style={styles.letterButton} onPress={handleLetterPress}>
            <Text style={styles.letterButtonText}>{letter}</Text>
        </TouchableOpacity>
    );
};

const BackspaceButton: React.FC<BackspaceButtonProps> = ({ handleBackspacePress }) => {
    return (
        <TouchableOpacity style={styles.backspaceButton} onPress={handleBackspacePress}>
            <Text style={styles.backspaceButtonText}>Backspace</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    letterButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    letterButtonText: {
        color: 'white',
        fontSize: 16,
    },
    backspaceButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    backspaceButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

type LetterButtonProps = {
    letter: string;
    handleLetterPress: () => void;
}

type BackspaceButtonProps = {
    handleBackspacePress: () => void;
};

export { LetterButton, BackspaceButton };
