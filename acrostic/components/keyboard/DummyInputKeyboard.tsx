import React, { useState, ForwardedRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { LetterButton, BackspaceButton } from "./KeyboardButtons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const DummyInputKeyboard: React.FC<DummyInputKeyboard> = ({ setSquareEntry, inputRef }) => {
  const [currText, setCurrText] = useState('key:');

  const handleLetterInput = (newText: String) => {
    if (newText.length == currText.length - 1) {
      setSquareEntry('');
    } else {
      setSquareEntry(newText.slice(-1).toUpperCase());
    }
  }

  return (
    <TextInput
      style={styles.dummyInput}
      value={currText}
      onChangeText={handleLetterInput}
      ref={inputRef}
      autoFocus
    />
  );
};

interface DummyInputKeyboard {
  setSquareEntry: (entry: string) => void;
  inputRef: ForwardedRef<TextInput>;
}

const styles = StyleSheet.create({
  dummyInput: {
    height: 0,
    width: 0,
  },
  testVisible: {
  }
});

export default DummyInputKeyboard;
