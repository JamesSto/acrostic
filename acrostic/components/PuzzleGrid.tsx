import React, { memo, useMemo, useEffect, useState, useCallback } from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AcrosticSquare, BlackSquare } from "./AcrosticSquare";
import parseAcrosticPuzzle from "../puzzle_logic/PuzzleParser";
import { PUZZLE_TEXT } from "../puzzles/2023-05-21";
import {
  AcrosticPuzzleData,
  AcrosticSquareData,
} from "../puzzle_logic/AcrosticPuzzleData";

const PuzzleGrid: React.FC<Props> = memo(
  ({
    gridRows,
    userEntries,
    highlightedSquareNum,
    setHighlightedSquareNum,
  }) => {
    const handleSquarePress = useCallback((squareNum: number) => {
      setHighlightedSquareNum(squareNum);
    }, [setHighlightedSquareNum]);
    return (
      <View style={[styles.grid]}>
        {gridRows.map((row: AcrosticSquareData[], index: number) => (
          <View style={styles.word} key={index + "view"}>
            {row.map((square: AcrosticSquareData, index: number) => {
              if (square.isBlack) {
                return <BlackSquare key={index + "black"} />;
              } else {
                return (
                  <AcrosticSquare
                    key={square.squareNum + "square"}
                    squareData={square}
                    userEntry={userEntries[square.squareNum]}
                    isHighlighted={
                      highlightedSquareNum == square.squareNum
                    }
                    onSquarePress={() => handleSquarePress(square.squareNum)}
                  />
                );
              }
            })}
          </View>
        ))}
      </View>
    );
  }
);

interface Props {
  gridRows: AcrosticSquareData[][];
  userEntries: string[];
  highlightedSquareNum: number;
  setHighlightedSquareNum: (index: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30%",
  },
  word: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  grid: {
    marginTop: 12,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
  },
});

export default PuzzleGrid;
