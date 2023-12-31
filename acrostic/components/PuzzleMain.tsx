import React, { useEffect, useState, useRef} from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACROSTIC_SCREEN } from '../constants/NavigationConstants';
import parseAcrosticPuzzle from '../puzzle_logic/PuzzleParser';
import { PUZZLE_TEXT } from '../puzzles/2023-05-21';
import PuzzleGrid from './PuzzleGrid'
import PuzzleCluesView from './PuzzleCluesView'
import { AcrosticPuzzleData, AcrosticSquareData } from '../puzzle_logic/AcrosticPuzzleData';

enum PuzzleSection {
    Grid = "Grid",
    Clues = "Clues"
}

const PuzzleMain: React.FC<PuzzleMainProps> = ({ navigation }) => {
    let puzzle: AcrosticPuzzleData = parseAcrosticPuzzle(PUZZLE_TEXT);
    const [selectedSection, setSelectedSection] = useState(PuzzleSection.Grid)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SwitchSectionButton selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
            ),
        });
    }, [navigation, selectedSection]);

    const grid = <PuzzleGrid puzzle={puzzle} />;
    const clueView = <PuzzleCluesView puzzle={puzzle} />;

    return selectedSection == PuzzleSection.Grid ? grid : clueView;
}

const SwitchSectionButton: React.FC<SwitchSectionButtonProps> = ({ selectedSection, setSelectedSection }) => {
    return <Button onPress={
        () => setSelectedSection(selectedSection == PuzzleSection.Grid ? PuzzleSection.Clues : PuzzleSection.Grid)
    }
        title={selectedSection} />;
}

interface PuzzleMainProps {
    navigation: NativeStackNavigationProp<any, any>;
}

interface SwitchSectionButtonProps {
    selectedSection: PuzzleSection,
    setSelectedSection: React.Dispatch<React.SetStateAction<any>>;
}

const styles = StyleSheet.create({
});

export default PuzzleMain;
