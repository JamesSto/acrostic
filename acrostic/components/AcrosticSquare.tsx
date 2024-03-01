import React, { memo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import {
  SQUARE_ROW_LENGTH,
  SQUARE_BORDER_WIDTH,
} from "../constants/GridConstants";
import { AcrosticSquareData } from "../puzzle_logic/AcrosticPuzzleData";

interface AcrosticSquareProps {
  squareData: AcrosticSquareData;
  userEntry: string;
  isHighlighted: boolean;
  onSquarePress: () => void;
  showNumber?: boolean;
}

let count = 0;

export const AcrosticSquare: React.FC<AcrosticSquareProps> = memo(
  ({
    squareData,
    userEntry,
    isHighlighted,
    onSquarePress,
    showNumber = true,
  }) => {
    // console.log(squareData.squareNum + " RENDERING");
    return (
      <Pressable
        onPress={onSquarePress}
        style={[
          styles.square,
          styles.standardSquare,
          isHighlighted && styles.highlighted,
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.squareNum, styles.squareLabel, !showNumber && styles.hidden]}>
            {squareData.squareNum}
          </Text>
          <Text style={[styles.clueLetter, styles.squareLabel]}>
            {squareData.clueLetter}
          </Text>
          <Text style={styles.answerLetter}>{userEntry}</Text>
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.squareData.squareNum === nextProps.squareData.squareNum &&
      prevProps.userEntry === nextProps.userEntry &&
      prevProps.isHighlighted === nextProps.isHighlighted
    );
  }
);

export const BlackSquare: React.FC = memo(() => {
  return <View style={[styles.square, styles.blackSquare]} />;
});

const styles = StyleSheet.create({
  square: {
    width: 24,
    aspectRatio: "1",
    justifyContent: "center",
    alignItems: "center",
    margin: (-1 * SQUARE_BORDER_WIDTH) / 2,
  },
  standardSquare: {
    backgroundColor: "#f0f0f0",
    zIndex: 1,
    borderColor: "gray",
    borderWidth: SQUARE_BORDER_WIDTH,
  },
  blackSquare: {
    backgroundColor: "#333333",
    zIndex: 2,
  },
  highlighted: {
    backgroundColor: "#ffcd33",
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  squareLabel: {
    position: "absolute",
    fontSize: 7,
    top: "-5%",
    color: "#505050",
  },
  squareNum: {
    left: "3%",
  },
  clueLetter: {
    right: "4%",
  },
  answerLetter: {
    fontSize: 14,
    top: "10%",
    textAlign: "center",
    fontWeight: "500",
  },
  hidden: {
    display: "none",
  }
});
