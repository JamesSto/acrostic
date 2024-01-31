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
import { ACROSTIC_SCREEN } from "../constants/NavigationConstants";
import { PUZZLE_TEXT } from "../puzzles/2023-05-21";
import { SQUARE_ROW_LENGTH } from "../constants/GridConstants";
import PuzzleGrid from "./PuzzleGrid";
import PuzzleCluesView from "./PuzzleCluesView";
import {
  AcrosticPuzzleData,
  AcrosticSquareData,
  AcrosticGridData,
} from "../puzzle_logic/AcrosticPuzzleData";
import Keyboard from "./keyboard/Keyboard";
import { TabView, SceneMap } from "react-native-tab-view";

enum PuzzleSection {
  Grid = "Grid",
  Clues = "Clues",
}

const PuzzleMain: React.FC<PuzzleMainProps> = ({ puzzle }) => {
  const [userEntries, setUserEntries] = useState<string[]>(
    Array(puzzle.grid.quoteSquares.length + 1).fill("")
  );
  const [highlightedSquareNumber, setHighlightedSquareNumber] = useState(1);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: PuzzleSection.Grid, title: "Grid" },
    { key: PuzzleSection.Clues, title: "Clues" },
  ]);
  useEffect(() => { console.log("main useEffect"); }, []);
  let gridRows = generateGridRows(puzzle);

  // const grid = () => (
  //   <PuzzleGrid
  //     gridRows={gridRows}
  //     userEntries={userEntries}
  //     highlightedSquareNumber={highlightedSquareNumber}
  //     setHighlightedSquareNumber={setHighlightedSquareNumber}
  //   />
  // );
  const clueView = () => <PuzzleCluesView puzzle={puzzle} />;

  // const layout = useWindowDimensions();
  // const renderScene = SceneMap({
  //   [PuzzleSection.Grid]: grid,
  //   [PuzzleSection.Clues]: clueView,
  // });

  return (
    <View style={styles.container}>
      <PuzzleGrid
      gridRows={gridRows}
      userEntries={userEntries}
      highlightedSquareNumber={highlightedSquareNumber}
      setHighlightedSquareNumber={setHighlightedSquareNumber}
    />
      {/* <TabView
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        renderTabBar={() => null}
        initialLayout={{ width: layout.width }}
      /> */}
      <View style={styles.keyboardContainer}>
        <Keyboard />
      </View>
    </View>
  );
};

const generateGridRows = (
  puzzle: AcrosticPuzzleData
): AcrosticSquareData[][] => {
  var startTime = performance.now();
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
  var endTime = performance.now();
  console.log(`Set up grid took ${endTime - startTime} milliseconds.`);
  return chunkedSquares;
};

interface PuzzleMainProps {
  //   navigation: NativeStackNavigationProp<any, any>;
  puzzle: AcrosticPuzzleData;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    position: "absolute",
    bottom: 0,
  },
});

export default PuzzleMain;
