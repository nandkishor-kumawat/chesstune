import React from 'react'
import Piece from './Piece';

const RenderPieces = ({board, selectPiece,disabled=false, width}) => {
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
              disabled={disabled}
              width={width}
            />
          );
        }
        return null;
      });
}

export default RenderPieces