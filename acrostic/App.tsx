/*
* This is the main app for an acrostic puzzle, a type of word puzzle similar to a crossword puzzle.
* This file is the main entry point for the app, and creates the main view.

* The main view includes:
* A Top bar with title and hamburger menu icon
* A view for the grid itself
* A view for the clues
* A view for the custom keyboard
*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PuzzleMain from './src/PuzzleMain'
import PuzzleSelector from './src/PuzzleSelector'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // View for the hamburger menu
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Acrostic">
        <Stack.Screen name="Acrostic" component={PuzzleMain} />
        <Stack.Screen name="Puzzle Selector" component={PuzzleSelector} options={{ title: 'Pick a Puzzle' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
