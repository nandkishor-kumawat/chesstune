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
  disabled,
  width=PIECE_SIZE,
}) => {
  const onPieceSelected = () => {
    onSelected(position);
  };

  return (
    <TouchableWithoutFeedback onPress={onPieceSelected} disabled={disabled} >
      <Image
        style={{
          position: 'absolute',
          top: width * rowIndex,
          left: width * columnIndex,
          width: width,
          height: width,
          transform: [
            {
              rotate: color === 'b' ? '180deg' : '0deg',
            },
          ],
        }}
        source={PIECE_IMAGES[`${color}${type}`]}
      />
    </TouchableWithoutFeedback>
  );
};


export default Piece;
