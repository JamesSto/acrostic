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
import { SQUARE_ROW_LENGTH } from "../constants/GridConstants";
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

enum PuzzleSection {
  Grid = "Grid",
  Clues = "Clues",
}

const PuzzleMain: React.FC<PuzzleMainProps> = ({ navigation }) => {
  const puzzle = parseAcrosticPuzzle(PUZZLE_TEXT);
  const [userEntries, setUserEntries] = useState<string[]>(
    Array(puzzle.grid.quoteSquares.length + 1).fill("")
  );
  const [highlightedSquareNumber, setHighlightedSquareNumber] = useState(1);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: PuzzleSection.Grid, title: "Grid" },
    { key: PuzzleSection.Clues, title: "Clues" },
  ]);

  const pagerSectionRef = useRef<PagerView>(null);
  const [selectedSection, setSelectedSection] = useState(PuzzleSection.Grid);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            pagerSectionRef.current?.setPage(selectedSection == PuzzleSection.Grid ? 1 : 0);
          }}
          title={"See " + (selectedSection == PuzzleSection.Grid ? PuzzleSection.Clues : PuzzleSection.Grid)}
        />
      ),
    });
  }, [navigation, selectedSection]);

  const handlePageChange = (e: any) => {
    setSelectedSection(e.nativeEvent.position == 0 ? PuzzleSection.Grid : PuzzleSection.Clues);
  };

  let gridRows = generateGridRows(puzzle);

  return (
    <View style={styles.container}>
      <PagerView style={styles.pager} initialPage={0} ref={pagerSectionRef} onPageSelected={handlePageChange}>
        <View key="1">
          <PuzzleGrid
            gridRows={gridRows}
            userEntries={userEntries}
            highlightedSquareNumber={highlightedSquareNumber}
            setHighlightedSquareNumber={setHighlightedSquareNumber}
          />
        </View>
        <View key="2">
          <PuzzleCluesView puzzle={puzzle} />
        </View>
      </PagerView>
      <View style={styles.keyboardContainer}>
        <Keyboard />
      </View>
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
  keyboardContainer: {
    position: "absolute",
    bottom: 0,
  },
});

export default PuzzleMain;
