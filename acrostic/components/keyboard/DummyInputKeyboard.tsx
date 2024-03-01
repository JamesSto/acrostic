import React, { useState, ForwardedRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { LetterButton, BackspaceButton } from "./KeyboardButtons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const DummyInputKeyboard: React.FC<DummyInputKeyboard> = ({
  setSquareEntry,
  inputRef,
}) => {
  const handleLetterInput = (event: { nativeEvent: { key: string } }) => {
    if (event.nativeEvent.key === "Backspace") {
      setSquareEntry("");
    } else {
      setSquareEntry(event.nativeEvent.key.toUpperCase());
    }
  };

  return (
    <TextInput
      style={styles.dummyInput}
      value={""}
      onKeyPress={handleLetterInput}
      ref={inputRef}
      autoFocus
      autoComplete={"off"}
      autoCorrect={false}
      spellCheck={false}
      keyboardType="visible-password"
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
  testVisible: {},
});

export default DummyInputKeyboard;
