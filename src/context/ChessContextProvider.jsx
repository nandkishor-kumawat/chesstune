import { View, Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { createContext } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { makeBestMove } from '../components/Chess/script';
import { Chess } from "chess.js";
import { toPosition } from '../components/Chess/functions';


//import ChessWebAPI from "chess-web-api";
// const getPuzzle = () => {
//   const chessAPI = new ChessWebAPI();
//   chessAPI.getDailyPuzzle().then(a => {

//     let game = new Chess(a.body.fen)
//     console.log(game.fen())
//     setChess(game)

//     setState({
//       player: game.turn(),
//       board: game.board(),
//     })
//   });
// }


const ChessContext = createContext();

export const getChessState = () => useContext(ChessContext);

const ChessContextProvider = ({ children }) => {

    const [selectedSquare, setSelectedSquare] = useState(null);
    const [level, setLevel] = useState(0);

    const [chess, setChess] = useState(new Chess());

    const [state, setState] = useState({
        player: 'w',
        board: []
    });

    const onTurn = useCallback((level) => {
        if (level > 0) {
            setTimeout(() => {
                const game = makeBestMove(chess, 1)
                setState({
                    player: game.player === "w" ? "b" : "w",
                    board: game.board(),
                });
            }, 250)
        }
    }, [chess]);

    useEffect(() => {

        setState({
            player: state.player === "w" ? "b" : "w",
            board: chess?.board(),
        });
    }, [chess]);


    const getSlelectedSquare = () => {
        return selectedSquare
    }

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
        makeMove({ from, to })

        // console.log({ selectedSquare, position })
    };




    return (
        <ChessContext.Provider value={{ getSlelectedSquare, selectedSquare, setSelectedSquare, selectSquare, state, setState, onTurn, chess, setChess, level, setLevel }}>
            {children}
        </ChessContext.Provider>
    )
}

export default ChessContextProvider