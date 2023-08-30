import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ACTIVE_COLOR, BLACK, PIECE_SIZE, WHITE } from './constants';

const Square = ({
  showNotation,
  rowIndex,
  position,
  columnIndex,
  selected,
  canMoveHere,
  lastMove,
  showSuggestion,
  inCheck,
  reverseBoard,
  onSelected,
  isCapture,
  disabled,
  isInCorrect,
  width = PIECE_SIZE
}) => {
  const isBlack = (rowIndex + columnIndex) % 2 === 0;
  let backgroundColor = isBlack ? BLACK : WHITE;

  if (selected) {
    backgroundColor = ACTIVE_COLOR;
  }
  else if (inCheck) {
    backgroundColor = '#C51B16';
  }
  else if (isCapture) {
    backgroundColor = 'red';
  }
  else if (isInCorrect) {
    backgroundColor = 'red';
  }


  const onSquareSelected = () => {
    if (canMoveHere) {
      onSelected(position);
    }
  };

  const renderNotations = isBlack => {
    const notations = [];
    const transform = [
      {
        rotate: reverseBoard ? '180deg' : '0deg',
      },
    ];

    if (columnIndex === 0) {
      notations.push(
        <Text
          key={'row_notations'}
          style={[
            styles.notation,
            {
              color: isBlack ? '#B58863' : '#F0D9B5',
              top: 0,
              left: 0,
              transform,
            },
          ]}
        >
          {8 - rowIndex}
        </Text>
      );
    }

    if (rowIndex === 7) {
      notations.push(
        <Text
          key={'column_notation'}
          style={[
            styles.notation,
            {
              color: isBlack ? '#B58863' : '#F0D9B5',
              bottom: 0,
              left: 0,
              transform,
            },
          ]}
        >
          {String.fromCharCode(97 + columnIndex)}
        </Text>
      );
    }

    return notations;
  };

  const renderMoveIndicator = () => {
    if (canMoveHere && !isCapture) {
      return <View style={{
        width: 24,
        height: 24,
        opacity: 0.3,
        backgroundColor: isBlack ? WHITE : BLACK,
        borderRadius: 12,
      }} />;
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={onSquareSelected} disabled={disabled}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            width: width,
            height: width,
          },
        ]}
      >
        {showSuggestion && renderMoveIndicator()}
        {showNotation && renderNotations(isBlack)}
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notation: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 'bold',
  }
});

export default Square;
