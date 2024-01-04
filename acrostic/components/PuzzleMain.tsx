import React, { useEffect, useState, useRef } from 'react';

import { StyleSheet, Text, View, Button, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN } from '../constants/NavigationConstants';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import PuzzleGrid from './PuzzleGrid'
import PuzzleCluesView from './PuzzleCluesView'
import { AcrosticPuzzleData, AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';
import Keyboard from './keyboard/Keyboard'
import { TabView, SceneMap } from 'react-native-tab-view';

enum PuzzleSection {
    Grid = "Grid",
    Clues = "Clues"
}

const PuzzleMain: React.FC<PuzzleMainProps> = ({ navigation }) => {
    let puzzle: AcrosticPuzzleData = parseAcrosticPuzzle(PUZZLE_TEXT);
    const layout = useWindowDimensions();

    const grid = <PuzzleGrid puzzle={puzzle} />;
    const clueView = <PuzzleCluesView puzzle={puzzle} />;

    const renderScene = SceneMap({
        [PuzzleSection.Grid]: () => grid,
        [PuzzleSection.Clues]: () => clueView,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: PuzzleSection.Grid, title: 'Grid' },
        { key: PuzzleSection.Clues, title: 'Clues' },
    ]);

    return <View style={styles.container}>
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
    </View>;
}

interface PuzzleMainProps {
    navigation: NativeStackNavigationProp<any, any>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default PuzzleMain;
