import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN, PUZZLE_SELECTOR_SCREEN, PUZZLE_CLUES_VIEW } from './constants/NavigationConstants';
import parseAcrosticPuzzle from "./puzzle_logic/PuzzleParser";
import { PUZZLE_TEXT } from "./puzzles/2023-05-21";
import PuzzleMain from './components/PuzzleMain'
import PuzzleCluesView from './components/PuzzleCluesView'
import PuzzleSelector from './components/PuzzleSelector'

const Stack = createNativeStackNavigator();

export default function App() {
  const puzzle = parseAcrosticPuzzle(PUZZLE_TEXT);
  return (
    <PuzzleMain puzzle={puzzle} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
