import { View, Text } from 'react-native'
import React from 'react'
import { createContext } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { toPosition } from '../Chess2/Notation';

const ChessContext = createContext();

export const getChessState = () => useContext(ChessContext);

const ChessContextProvider = ({ children }) => {

    const [selectedSquare, setSelectedSquare] = useState(null);


    const selectSquare = (position, piece, chess, makeMove) => {
        const { row, col } = position;
        const turn = chess.turn();

        //if selected square is clicked then deselect it
        if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
            setSelectedSquare(null);
            // console.log('selectedSquare && selectedSquare.row === row && selectedSquare.col === col')
            return;
        }

        //suare selected and same color square is selected then select it
        if (selectedSquare && turn === piece?.color) {
            setSelectedSquare(position);
            // console.log('selectedSquare && turn === piece?.color')
            return;
        }

        //No Piece and no selected square
        if (!selectedSquare) {
            if (!piece) {
                // console.log('!piece')
                return
            }

            if (turn !== piece.color) {
                // console.log("turn !== piece.color")
                return;
            }

            setSelectedSquare(position);
            // console.log(3);
            // setSelectedSquare(null)
            return;
        };

        // makemove
        const from = toPosition({ x: selectedSquare.row, y: selectedSquare.col });
        const to = toPosition({ x: position.row, y: position.col })
        makeMove({from, to})

        // console.log({ selectedSquare, position })
    };




    return (
        <ChessContext.Provider value={{ selectedSquare,setSelectedSquare, selectSquare }}>
            {children}
        </ChessContext.Provider>
    )
}

export default ChessContextProvider