import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { PIECES, PIECE_SIZE } from './Notation';

// const PIECE_IMAGES = {
//   b: {
//     w: require('./pieces/wB.png'),
//     b: require('./pieces/bB.png'),
//   },
//   k: {
//     w: require('./pieces/wK.png'),
//     b: require('./pieces/bK.png'),
//   },
//   n: {
//     w: require('./pieces/wN.png'),
//     b: require('./pieces/bN.png'),
//   },
//   p: {
//     w: require('./pieces/wP.png'),
//     b: require('./pieces/bP.png'),
//   },
//   q: {
//     w: require('./pieces/wQ.png'),
//     b: require('./pieces/bQ.png'),
//   },
//   r: {
//     w: require('./pieces/wR.png'),
//     b: require('./pieces/bR.png'),
//   },
// };

const Piece = ({
  type,
  color,
  position,
  rowIndex,
  columnIndex,
  onSelected,
}) => {
  const onPieceSelected = () => {
    onSelected(position);
  };

  return (
    <TouchableWithoutFeedback onPress={onPieceSelected}>
      <Image
        style={{
          position: 'absolute',
          top: PIECE_SIZE * rowIndex,
          left: PIECE_SIZE * columnIndex,
          width: PIECE_SIZE,
          height: PIECE_SIZE,
          transform: [
            {
              rotate: color==='b' ? '180deg' : '0deg',
            },
          ],
        }}
        source={PIECES[`${color}${type}`]}
      />
    </TouchableWithoutFeedback>
  );
};


export default Piece;
