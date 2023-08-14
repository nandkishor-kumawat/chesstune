import { View, Text } from 'react-native'
import React from 'react'
import Piece from './Piece';

const RenderPieces = ({board, selectPiece,}) => {
    return board.map(square => {
        const {
          type,
          color,
          rowIndex,
          columnIndex,
          position,
        } = square;
        if (type) {
          return (
            <Piece
              key={`piece_${rowIndex}_${columnIndex}`}
              type={type}
              color={color}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              position={position}
              onSelected={selectPiece}
            />
          );
        }
        return null;
      });
}

export default RenderPieces