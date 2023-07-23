import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Image, Text } from 'react-native';

import { ACTIVE_COLOR, BLACK, PIECES, SIZE, WHITE, toPosition } from './Notation';
import { getChessState } from '../context/ChessContextProvider';
import { useRoute } from '@react-navigation/native';
import { useMemo } from 'react';






const Square = ({ piece, position, chess, onTurn }) => {
    // console.log('square')
    const { selectedSquare, setSelectedSquare, selectSquare } = getChessState();

    const { row, col } = position;
    const white = (row + col) % 2 === 1;
    const backgroundColor = white ? WHITE : BLACK;
    const color = white ? BLACK : WHITE;
    const textStyle = { fontWeight: "500", color, position: "absolute" };

    const isActive = selectedSquare?.row === row && selectedSquare?.col === col;

    const [isSuggestion, setIsSuggestion] = useState(false);


    const movePiece = useCallback(({ from, to }) => {
        
        const moves = chess.moves({ verbose: true });
        const move = moves.find((m) => m.from == from && m.to == to);

        if (move) {

            const isPromotion = move.promotion;

            chess.move({
                from, to,
                promotion: 'q'
            });

            setSelectedSquare(null);
            onTurn();
        }

    }, [chess]);



    useMemo(() => {
        // console.log(1)
        if (selectedSquare) {
            const square = toPosition({ x: selectedSquare.row, y: selectedSquare.col })
            const moves = chess.moves({ square, verbose: true });
            const to = toPosition({ x: position.row, y: position.col })
            const move = moves.find((m) => m.to == to);
            // console.log(move)
            setIsSuggestion(move)
        } else {
            setIsSuggestion(false)
        }
    }, [selectedSquare])


    return (
        <View
            style={{
                flex: 1,
                backgroundColor,
                position: "relative",
            }}
        >
            {col === 0 && <Text style={textStyle}>{8 - row}</Text>}

            <TouchableOpacity
                onPress={() => { selectSquare(position, piece, chess, movePiece); }}
                style={{
                    flex: 1,
                    backgroundColor: isActive ? ACTIVE_COLOR : isSuggestion ? 'grey' : "transparent",
                    // borderColor: 'red',
                    // borderWidth: isSuggestion ? 1 : 0,
                }}
            >
                {piece && <Image source={PIECES[`${piece.color}${piece.type}`]} style={{
                    width: SIZE,
                    height: SIZE,
                }} />}

            </TouchableOpacity>


            {row === 7 && <Text style={[textStyle, { bottom: 0, right: 0 }]}>{String.fromCharCode(97 + col)}</Text>}
        </View>
    );
};

export default Square