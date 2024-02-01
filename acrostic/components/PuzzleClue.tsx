import React, { useCallback } from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AcrosticSquare, BlackSquare } from "./AcrosticSquare";
import {
  AcrosticClueData,
  AcrosticSquareData,
} from "../puzzle_logic/AcrosticPuzzleData";

const PuzzleClue: React.FC<Props> = ({
  acrosticClueData,
  userEntries,
  highlightedSquareNumber,
  setHighlightedSquareNumber,
}) => {
  const handleSquarePress = useCallback(
    (squareNumber: number) => {
      setHighlightedSquareNumber(squareNumber);
    },
    [setHighlightedSquareNumber]
  );
  return (
    <View style={styles.clueContainer}>
      <View style={styles.clueLabelContainer}>
        <Text style={styles.clueLetter}>{acrosticClueData.letter}.</Text>
        <Text style={styles.clueText}>{acrosticClueData.clue}</Text>
      </View>
      <View style={styles.answerContainer}>
        {acrosticClueData.answer.map((square, index) => (
          <AcrosticSquare
            key={index}
            userEntry={userEntries[square.squareNumber]}
            squareData={square}
            isHighlighted={highlightedSquareNumber == square.squareNumber}
            onSquarePress={() => handleSquarePress(square.squareNumber)}
          />
        ))}
      </View>
    </View>
  );
};

interface Props {
  acrosticClueData: AcrosticClueData;
  userEntries: string[];
  highlightedSquareNumber: number;
  setHighlightedSquareNumber: (index: number) => void;
}

const styles = StyleSheet.create({
  clueContainer: {
    marginBottom: 14,
  },
  clueLabelContainer: {
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 40,
  },
  clueLetter: {
    fontWeight: "bold",
    color: "red",
    fontSize: 16,
    width: 25,
  },
  clueText: {
    color: "black",
    fontSize: 16,
  },
  answerContainer: {
    flexDirection: "row",
    marginLeft: 25,
  },
});

export default PuzzleClue;
