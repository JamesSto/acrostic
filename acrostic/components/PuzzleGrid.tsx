import React, { memo, useEffect, useState } from "react";

import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ACROSTIC_SCREEN,
  PUZZLE_SELECTOR_SCREEN,
} from "../constants/NavigationConstants";
import { SQUARE_ROW_LENGTH } from "../constants/GridConstants";
import { AcrosticSquare, BlackSquare } from "./AcrosticSquare";
import parseAcrosticPuzzle from "../puzzle_logic/PuzzleParser";
import { PUZZLE_TEXT } from "../puzzles/2023-05-21";
import {
  AcrosticPuzzleData,
  AcrosticSquareData,
} from "../puzzle_logic/AcrosticPuzzleData";

const PuzzleGrid: React.FC<Props> = memo(
  ({
    puzzle,
    userEntries,
    highlightedSquareNumber,
    setHighlightedSquareNumber,
  }) => {
    const [gridRows, setGridRows] = useState<AcrosticSquareData[][]>([]);

    useEffect(() => {
      console.log("PuzzleGrid useEffect called");
      const flattenedSquares: AcrosticSquareData[] = puzzle.grid.quoteSquares
        .reduce((acc: AcrosticSquareData[], curr: AcrosticSquareData[]) => {
          return acc.concat(curr).concat([new AcrosticSquareData("", "", 0)]);
        }, [])
        .slice(0, -1);

      let chunkedSquares: AcrosticSquareData[][] = [];
      // Chunk array into size SQUARE_ROW_LENGTH
      for (let i = 0; i < flattenedSquares.length; i += SQUARE_ROW_LENGTH) {
        chunkedSquares.push(flattenedSquares.slice(i, i + SQUARE_ROW_LENGTH));
      }

      // Pad the final row with black squares
      while (
        chunkedSquares[chunkedSquares.length - 1].length < SQUARE_ROW_LENGTH
      ) {
        chunkedSquares[chunkedSquares.length - 1].push(
          new AcrosticSquareData("", "", 0)
        );
      }
      setGridRows(chunkedSquares);
    }, []);

    return (
      <View style={[styles.grid]}>
        {gridRows.map((row: AcrosticSquareData[], index: number) => (
          <View style={styles.word} key={index}>
            {row.map((square: AcrosticSquareData, index: number) => {
              if (square.isBlack) {
                return <BlackSquare key={index} />;
              } else {
                return (
                  <AcrosticSquare
                    key={index}
                    squareData={square}
                    userEntry={userEntries[square.squareNumber]}
                    isHighlighted={
                      highlightedSquareNumber == square.squareNumber
                    }
                    onSquarePress={() =>
                      setHighlightedSquareNumber(square.squareNumber)
                    }
                  />
                );
              }
            })}
          </View>
        ))}
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.puzzle.equals(nextProps.puzzle) &&
      prevProps.userEntries == nextProps.userEntries &&
      prevProps.highlightedSquareNumber == nextProps.highlightedSquareNumber
    );
  }
);

interface Props {
  puzzle: AcrosticPuzzleData;
  userEntries: string[];
  highlightedSquareNumber: number;
  setHighlightedSquareNumber: (index: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "3%",
  },
  word: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  grid: {
    marginTop: 6,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
  },
});

export default PuzzleGrid;
