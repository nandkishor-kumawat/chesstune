import { View, Text } from 'react-native'
import React from 'react'
import Square from './Square';

const RenderSquares = ({board, movePiece,disabled=false, showNotation=false,showSuggestion=true, reverseBoard=false, width}) => {

    const rowSquares = [];

    board.forEach(square => {
        const {
            rowIndex,
            columnIndex,
            position,
            selected,
            canMoveHere,
            lastMove,
            inCheck,
            isCapture,
            isInCorrect
        } = square;

        const squareView = (
            <Square
                key={`square_${rowIndex}_${columnIndex}`}
                showNotation={showNotation}
                showSuggestion={showSuggestion}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                selected={selected}
                canMoveHere={canMoveHere}
                position={position}
                lastMove={lastMove}
                inCheck={inCheck}
                reverseBoard={reverseBoard}
                onSelected={movePiece}
                isCapture={isCapture}
                disabled={disabled}
                isInCorrect={isInCorrect}
                width={width}
            />
        );

        if (!rowSquares[rowIndex]) {
            rowSquares[rowIndex] = [];
        }
        rowSquares[rowIndex].push(squareView);
    });

    return rowSquares.map((r, index) => {
        return (
            <View key={`row_${index}`} style={{ flexDirection: 'row' }}>
                {r}
            </View>
        );
    });
}

export default RenderSquares