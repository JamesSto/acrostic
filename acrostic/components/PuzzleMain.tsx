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
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: PuzzleSection.Grid, title: "Grid" },
    { key: PuzzleSection.Clues, title: "Clues" },
  ]);
  useEffect(() => { console.log("main useEffect"); }, []);

  const grid = (
    <PuzzleGrid
      puzzle={puzzle}
      userEntries={userEntries}
      highlightedSquareNumber={highlightedSquareNumber}
      setHighlightedSquareNumber={setHighlightedSquareNumber}
    />
  );
  //   const clueView = <PuzzleCluesView puzzle={puzzle} />;
  const clueView = <Text>Hello</Text>;

  const layout = useWindowDimensions();
  const renderScene = SceneMap({
    [PuzzleSection.Grid]: () => grid,
    [PuzzleSection.Clues]: () => clueView,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => null}
        initialLayout={{ width: layout.width }}
      />
      <View style={styles.keyboardContainer}>
        <Keyboard />
      </View>
    </View>
  );
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
