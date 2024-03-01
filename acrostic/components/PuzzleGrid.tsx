import React, { memo, useMemo, useEffect, useState, useCallback } from "react";

import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AcrosticSquare, BlackSquare } from "./AcrosticSquare";
import parseAcrosticPuzzle from "../puzzle_logic/PuzzleParser";
import { PUZZLE_TEXT } from "../puzzles/2023-05-21";
import {
  AcrosticPuzzleData,
  AcrosticSquareData,
} from "../puzzle_logic/AcrosticPuzzleData";
import { SQUARE_ROW_LENGTH, PuzzleSection } from "../constants/GridConstants";
import PuzzleClue from "./PuzzleClue";

const PuzzleGrid: React.FC<PuzzleGridProps> = memo(
  ({
    puzzle,
    userEntries,
    highlightedSquareNum,
    setHighlightedSquareNum,
    setSelectedSection,
  }) => {
    const handleSquarePress = useCallback(
      (squareNum: number, puzzleSection: PuzzleSection) => {
        setHighlightedSquareNum(squareNum);
        setSelectedSection(puzzleSection);
      },
      [setHighlightedSquareNum, setSelectedSection]
    );

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps={'always'}>
        <ActiveClue
          puzzle={puzzle}
          userEntries={userEntries}
          highlightedSquareNum={highlightedSquareNum}
          handleSquarePress={handleSquarePress}
          setHighlightedSquareNum={setHighlightedSquareNum}
          setSelectedSection={setSelectedSection}
        />
        <MainGrid
          puzzle={puzzle}
          userEntries={userEntries}
          highlightedSquareNum={highlightedSquareNum}
          handleSquarePress={handleSquarePress}
        />
        <AuthorGrid
          puzzle={puzzle}
          userEntries={userEntries}
          highlightedSquareNum={highlightedSquareNum}
          handleSquarePress={handleSquarePress}
        />
      </ScrollView>
    );
  }
);

const AuthorGrid: React.FC<AuthorGridProps> = ({
  puzzle,
  userEntries,
  highlightedSquareNum,
  handleSquarePress,
}) => {
  let authorRows = generateAuthorRows(puzzle);
  return (
    <View style={styles.authorGrid}>
      {authorRows.map((row: AcrosticSquareData[], index: number) => (
        <View style={styles.word} key={index + "authorView"}>
          {row.map((square: AcrosticSquareData, index: number) => {
            return (
              <AcrosticSquare
                key={square.squareNum + "mainSquare"}
                squareData={square}
                userEntry={userEntries[square.squareNum]}
                isHighlighted={highlightedSquareNum === square.squareNum}
                onSquarePress={() =>
                  handleSquarePress(square.squareNum, PuzzleSection.AuthorGrid)
                }
                showNumber={false}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

const ActiveClue: React.FC<ActiveClueProps> = ({
  puzzle,
  userEntries,
  highlightedSquareNum,
  setHighlightedSquareNum,
  setSelectedSection,
  handleSquarePress,
}) => {
  const clue = puzzle.getClueForSquare(highlightedSquareNum);
  return (
    <View style={styles.activeClue}>
      <PuzzleClue
        acrosticClueData={clue}
        userEntries={userEntries}
        highlightedSquareNum={highlightedSquareNum}
        setHighlightedSquareNum={setHighlightedSquareNum}
        setSelectedSection={setSelectedSection}
      />
    </View>
  );
};

const generateAuthorRows = (
  puzzle: AcrosticPuzzleData
): AcrosticSquareData[][] => {
  const squares: AcrosticSquareData[] = puzzle.grid.authorSquares;

  let chunkedSquares: AcrosticSquareData[][] = [];
  // Chunk array into size SQUARE_ROW_LENGTH
  for (let i = 0; i < squares.length; i += SQUARE_ROW_LENGTH) {
    chunkedSquares.push(squares.slice(i, i + SQUARE_ROW_LENGTH));
  }

  return chunkedSquares;
};

const MainGrid: React.FC<MainGridProps> = ({
  puzzle,
  userEntries,
  highlightedSquareNum,
  handleSquarePress,
}) => {
  let gridRows = generateGridRows(puzzle);

  return (
    <View style={styles.mainGrid}>
      {gridRows.map((row: AcrosticSquareData[], index: number) => (
        <View style={styles.word} key={index + "mainView"}>
          {row.map((square: AcrosticSquareData, index: number) => {
            if (square.isBlack) {
              return <BlackSquare key={index + "mainBlack"} />;
            } else {
              return (
                <AcrosticSquare
                  key={square.squareNum + "mainSquare"}
                  squareData={square}
                  userEntry={userEntries[square.squareNum]}
                  isHighlighted={highlightedSquareNum === square.squareNum}
                  onSquarePress={() =>
                    handleSquarePress(square.squareNum, PuzzleSection.MainGrid)
                  }
                />
              );
            }
          })}
        </View>
      ))}
    </View>
  );
};

const generateGridRows = (
  puzzle: AcrosticPuzzleData
): AcrosticSquareData[][] => {
  const flattenedSquares: AcrosticSquareData[] = puzzle.grid.quoteSquares
    .reduce((acc: AcrosticSquareData[], curr: AcrosticSquareData[]) => {
      return acc.concat(curr).concat([AcrosticSquareData.blackSquare()]);
    }, [])
    .slice(0, -1);

  let chunkedSquares: AcrosticSquareData[][] = [];
  // Chunk array into size SQUARE_ROW_LENGTH
  for (let i = 0; i < flattenedSquares.length; i += SQUARE_ROW_LENGTH) {
    chunkedSquares.push(flattenedSquares.slice(i, i + SQUARE_ROW_LENGTH));
  }
  // Pad the final row with black squares
  while (chunkedSquares[chunkedSquares.length - 1].length < SQUARE_ROW_LENGTH) {
    chunkedSquares[chunkedSquares.length - 1].push(
      AcrosticSquareData.blackSquare()
    );
  }
  return chunkedSquares;
};

interface MainGridProps {
  puzzle: AcrosticPuzzleData;
  userEntries: string[];
  highlightedSquareNum: number;
  handleSquarePress: (squareNum: number, puzzleSection: PuzzleSection) => void;
}

interface AuthorGridProps {
  puzzle: AcrosticPuzzleData;
  userEntries: string[];
  highlightedSquareNum: number;
  handleSquarePress: (squareNum: number, puzzleSection: PuzzleSection) => void;
}

interface ActiveClueProps {
  puzzle: AcrosticPuzzleData;
  userEntries: string[];
  highlightedSquareNum: number;
  handleSquarePress: (squareNum: number, puzzleSection: PuzzleSection) => void;
  setHighlightedSquareNum: (index: number) => void;
  setSelectedSection: (puzzleSection: PuzzleSection) => void;
}

interface PuzzleGridProps {
  puzzle: AcrosticPuzzleData;
  userEntries: string[];
  highlightedSquareNum: number;
  setHighlightedSquareNum: (index: number) => void;
  setSelectedSection: (puzzleSection: PuzzleSection) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 5,
    paddingHorizontal: 8,
  },
  mainGrid: {
    alignSelf: "center",
  },
  authorGrid: {
    marginTop: 12,
    alignSelf: "center",
    marginBottom: 50,
  },
  activeClue: {
    height: 81,
    width: "100%",
  },
  word: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default PuzzleGrid;
