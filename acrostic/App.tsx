import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PUZZLE_MAIN } from "./constants/NavigationConstants";
import { PUZZLE_TEXT } from "./puzzles/2023-05-21";
import PuzzleMain from "./components/PuzzleMain";
import PuzzleCluesView from "./components/PuzzleCluesView";
import PuzzleSelector from "./components/PuzzleSelector";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={PUZZLE_MAIN}>
        <Stack.Screen name={PUZZLE_MAIN} component={PuzzleMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
