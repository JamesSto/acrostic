import React, { useEffect, useState, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PUZZLE_TEXT } from "../puzzles/2023-05-21";
import { PuzzleSection, SQUARE_ROW_LENGTH } from "../constants/GridConstants";
import PuzzleGrid from "./PuzzleGrid";
import PuzzleCluesView from "./PuzzleCluesView";
import {
  AcrosticPuzzleData,
  AcrosticSquareData,
  AcrosticGridData,
} from "../puzzle_logic/AcrosticPuzzleData";
import Keyboard from "./keyboard/Keyboard";
import PagerView from "react-native-pager-view";
import parseAcrosticPuzzle from "../puzzle_logic/PuzzleParser";

enum PuzzlePage {
  Grid = "Grid",
  Clues = "Clues",
}

const PuzzleMain: React.FC<PuzzleMainProps> = ({ navigation }) => {
  const puzzle = parseAcrosticPuzzle(PUZZLE_TEXT);
  const [userEntries, setUserEntries] = useState<string[]>(
    Array(puzzle.grid.quoteSquares.length + 1).fill("")
  );

  const [highlightedSquareNum, setHighlightedSquareNum] = useState(1);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: PuzzlePage.Grid, title: "Grid" },
    { key: PuzzlePage.Clues, title: "Clues" },
  ]);

  const pagerSectionRef = useRef<PagerView>(null);
  const [selectedPage, setSelectedPage] = useState(PuzzlePage.Grid);
  const [selectedSection, setSelectedSection] = useState(
    PuzzleSection.MainGrid
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            pagerSectionRef.current?.setPage(
              selectedPage == PuzzlePage.Grid ? 1 : 0
            );
          }}
          title={
            "See " +
            (selectedPage == PuzzlePage.Grid
              ? PuzzlePage.Clues
              : PuzzlePage.Grid)
          }
        />
      ),
    });
  }, [navigation, selectedPage]);

  const setSquareEntry = (entry: string) => {
    const newEntries = [...userEntries];
    newEntries[highlightedSquareNum] = entry;
    setUserEntries(newEntries);
    // Empty entry means backspace
    const newSquareNum =
      entry === ""
        ? getPrevSquareNum(puzzle, highlightedSquareNum, selectedSection)
        : getNextSquareNum(puzzle, highlightedSquareNum, selectedSection);
    console.log("new square " + newSquareNum);
    setHighlightedSquareNum(newSquareNum);
  };

  const handlePageChange = (e: any) => {
    if (e.nativeEvent.position == 0) {
      setSelectedPage(PuzzlePage.Grid);
      setSelectedSection(PuzzleSection.MainGrid);
    } else {
      setSelectedPage(PuzzlePage.Clues);
      setSelectedSection(PuzzleSection.CluePage);
    }
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerSectionRef}
        onPageSelected={handlePageChange}
      >
        <View key="1">
          <PuzzleGrid
            puzzle={puzzle}
            userEntries={userEntries}
            highlightedSquareNum={highlightedSquareNum}
            setHighlightedSquareNum={setHighlightedSquareNum}
            setSelectedSection={setSelectedSection}
          />
        </View>
        <View key="2">
          <PuzzleCluesView
            puzzle={puzzle}
            userEntries={userEntries}
            highlightedSquareNum={highlightedSquareNum}
            setHighlightedSquareNum={setHighlightedSquareNum}
            setSelectedSection={setSelectedSection}
          />
        </View>
      </PagerView>
      <Keyboard setSquareEntry={setSquareEntry} />
    </View>
  );
};

const getNextSquareNum = (
  puzzleData: AcrosticPuzzleData,
  currSquareNum: number,
  currSection: PuzzleSection
): number => {
  if (currSection === PuzzleSection.MainGrid) {
    return (currSquareNum % puzzleData.grid.quoteSquares.flat().length) + 1;
  } else if (currSection === PuzzleSection.CluePage) {
    const clue = puzzleData.getClueForSquare(currSquareNum);
    for (var i = 0; i < clue.answer.length - 1; i++) {
      if (clue.answer[i].squareNum === currSquareNum) {
        return clue.answer[i + 1].squareNum;
      }
    }
    // This means we're at the last number of the clue
    return currSquareNum;
  } else if (currSection === PuzzleSection.AuthorGrid) {
    let authorSquares = puzzleData.grid.authorSquares;
    for (var i = 0; i < authorSquares.length - 1; i++) {
      if (authorSquares[i].squareNum === currSquareNum) {
        return authorSquares[i + 1].squareNum;
      }
    }
    // This means we're at the last number of the clue
    return currSquareNum;
  }
  throw new Error("Invalid puzzle section for next square num");
};

const getPrevSquareNum = (
  puzzleData: AcrosticPuzzleData,
  currSquareNum: number,
  currSection: PuzzleSection
): number => {
  if (currSection === PuzzleSection.MainGrid) {
    const numSquares = puzzleData.grid.quoteSquares.flat().length;
    return (
      ((currSquareNum - 2 + numSquares) %
        puzzleData.grid.quoteSquares.flat().length) +
      1
    );
  } else if (currSection === PuzzleSection.CluePage) {
    const clue = puzzleData.clues.filter((clue) =>
      clue.answer.some((square) => square.squareNum === currSquareNum)
    )[0];
    for (var i = clue.answer.length - 1; i >= 1; i--) {
      if (clue.answer[i].squareNum === currSquareNum) {
        return clue.answer[i - 1].squareNum;
      }
    }
  } else if (currSection === PuzzleSection.AuthorGrid) {
    let authorSquares = puzzleData.grid.authorSquares;
    for (var i = authorSquares.length - 1; i >= 1; i--) {
      if (authorSquares[i].squareNum === currSquareNum) {
        return authorSquares[i - 1].squareNum;
      }
    }
  }
  return currSquareNum;
};

interface PuzzleMainProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
});

export default PuzzleMain;
