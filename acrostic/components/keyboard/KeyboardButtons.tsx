import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LetterButtonProps = {
    letter: string;
    onPress: () => void;
}

type BackspaceButtonProps = {
    onPress: () => void;
};

const LetterButton: React.FC<LetterButtonProps> = ({ letter, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const ghostButton = <View style={[styles.button, styles.ghostButton]}><Text style={styles.buttonText}>{letter}</Text></View>;

    return (
        <Pressable 
            style={[styles.button, styles.letterButton]} 
            hitSlop={2} 
            onPress={onPress} 
            unstable_pressDelay={0}
            onPressIn={() => setIsPressed(true)} 
            onPressOut={() => setIsPressed(false)}
        >
            {isPressed ? ghostButton : null}
            <Text style={styles.buttonText}>{letter}</Text>
        </Pressable>
    );
};

const BackspaceButton: React.FC<BackspaceButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, styles.backspaceButton]} onPress={onPress}>
            <Ionicons name="md-backspace" size={28} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 55,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        backgroundColor: '#f9f9f9',
    },
    ghostButton: {
        position: 'absolute',
        top: -63,
        width: '100%',
        backgroundColor: '#e0e0e0',
        opacity: 1,
    },
    letterButton: {
        width: '9%',
    },
    backspaceButton: {
        width: '12%',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
    },
    backspaceButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export { LetterButton, BackspaceButton };
