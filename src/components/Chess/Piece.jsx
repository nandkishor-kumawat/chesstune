import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';
import { PIECE_IMAGES, PIECE_SIZE } from './constants';

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
        source={PIECE_IMAGES[`${color}${type}`]}
      />
    </TouchableWithoutFeedback>
  );
};


export default Piece;
