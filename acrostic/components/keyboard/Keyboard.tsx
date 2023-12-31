import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LetterButton, BackspaceButton } from './KeyboardButtons';

const Keyboard: React.FC = () => {
    const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const handleLetterPress = (letter: string) => {
        // Handle letter press logic here
    };

    const handleBackspacePress = () => {
        // Handle backspace press logic here
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {topRow.map((letter) => (<LetterButton key={letter} onPress={() => handleLetterPress(letter)} />))}
                {middleRow.map((letter) => (<LetterButton key={letter} onPress={() => handleLetterPress(letter)} />))}
                {
                    bottomRow.map((letter) => (<LetterButton key={letter} onPress={() => handleLetterPress(letter)} />))
                        .concat([<BackspaceButton key="backspace" onPress={handleBackspacePress} />])
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});


export default Keyboard;
