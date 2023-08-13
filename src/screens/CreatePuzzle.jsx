import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Square from '../components/Chess/Square';
import Piece from '../components/Chess/Piece';
import { Chess } from 'chess.js';
import { createBoardData } from '../components/Chess/functions';

const CreatePuzzle = () => {
    const [game, setGame] = useState(new Chess());
    const [board, setBoard] = useState(createBoardData(game));
    const showNotation = true;
    const [reverseBoard, setReverseBoard] = useState(false);

    const renderSquares = (board, reverseBoard) => {

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
                isCapture
            } = square;

            const squareView = (
                <Square
                    key={`square_${rowIndex}_${columnIndex}`}
                    showNotation={showNotation}
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
    };

    const renderPieces = (board) => {
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
    };



    return (
        <View>
            {/* <Text>CreatePuzzle</Text> */}
            {renderSquares(reverseBoard)}
            {renderPieces()}
        </View>
    )
}

export default CreatePuzzle