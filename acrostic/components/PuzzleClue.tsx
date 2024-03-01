import React, { useCallback } from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AcrosticSquare, BlackSquare } from "./AcrosticSquare";
import {
  AcrosticClueData,
  AcrosticSquareData,
} from "../puzzle_logic/AcrosticPuzzleData";
import { PuzzleSection } from "../constants/GridConstants";

const PuzzleClue: React.FC<PuzzleClueProps> = ({
  acrosticClueData,
  userEntries,
  highlightedSquareNum,
  setHighlightedSquareNum,
  setSelectedSection,
}) => {
  const handleSquarePress = useCallback(
    (squareNum: number) => {
      setHighlightedSquareNum(squareNum);
      setSelectedSection(PuzzleSection.CluePage);
    },
    [setHighlightedSquareNum]
  );
  return (
    <View>
      <View style={styles.clueLabelContainer}>
        <Text style={styles.clueLetter}>{acrosticClueData.letter}.</Text>
        <View style={styles.clueTextBorder}><Text style={styles.clueText}>{acrosticClueData.clue}</Text></View>
      </View>
      <View style={styles.answerContainer}>
        {acrosticClueData.answer.map((square, index) => (
          <AcrosticSquare
            key={index}
            userEntry={userEntries[square.squareNum]}
            squareData={square}
            isHighlighted={highlightedSquareNum == square.squareNum}
            onSquarePress={() => handleSquarePress(square.squareNum)}
          />
        ))}
      </View>
    </View>
  );
};

interface PuzzleClueProps {
  acrosticClueData: AcrosticClueData;
  userEntries: string[];
  highlightedSquareNum: number;
  setHighlightedSquareNum: (index: number) => void;
  setSelectedSection: (puzzleSection: PuzzleSection) => void;
}

const styles = StyleSheet.create({
  clueLabelContainer: {
    flexDirection: "row",
    marginBottom: 5,
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
  clueTextBorder: {
    flexShrink: 1,
  }
});

export default PuzzleClue;
