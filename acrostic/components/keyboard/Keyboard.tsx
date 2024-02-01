import React from "react";
import { View, StyleSheet } from "react-native";
import { LetterButton, BackspaceButton } from "./KeyboardButtons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Keyboard: React.FC<KeyboardProps> = ({
  userEntries,
  setUserEntries,
  highlightedSquareNumber,
  setHighlightedSquareNumber,
}) => {
  const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const middleRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const bottomRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleLetterPress = (letter: string) => {
    console.log(letter, highlightedSquareNumber);
    const newEntries = [...userEntries];
    newEntries[highlightedSquareNumber] = letter;
    setUserEntries(newEntries);
  };

  const handleBackspacePress = () => {
    // Handle backspace press logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyboardRow}>
        {topRow.map((letter) => (
          <LetterButton
            key={letter}
            letter={letter}
            onPress={() => handleLetterPress(letter)}
          />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        {middleRow.map((letter) => (
          <LetterButton
            key={letter}
            letter={letter}
            onPress={() => handleLetterPress(letter)}
          />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        {bottomRow
          .map((letter) => (
            <LetterButton
              letter={letter}
              key={letter}
              onPress={() => handleLetterPress(letter)}
            />
          ))
          .concat([
            <BackspaceButton key="backspace" onPress={handleBackspacePress} />,
          ])}
      </View>
    </View>
  );
};

interface KeyboardProps {
  userEntries: string[];
  setUserEntries: (entries: string[]) => void;
  highlightedSquareNumber: number;
  setHighlightedSquareNumber: (index: number) => void;
}

const styles = StyleSheet.create({
  keyboardRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  container: {
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "lightgray",
    padding: 5,
  },
});

export default Keyboard;
