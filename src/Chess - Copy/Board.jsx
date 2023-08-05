import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chess } from "chess.js";
import { useEffect } from "react";
import { BOARD_SIZE, COLUMN_NAMES, DIMENSION, toPosition } from "./Notation";
import { Text } from "react-native";
import { makeBestMove } from "./script";
import Square from "./Square";
import { getChessState } from "../context/ChessContextProvider";
import Piece from "./Piece";


const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
});




const Board = ({ level }) => {
  const { state, setState } = getChessState()
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(createBoardData(game));
  const showNotation = true;

  useEffect(() => {
    // const chess = new Chess()
    // setChess(chess)
    // setState({
    //   player: "w",
    //   board: chess.board(),
    // })

  }, [])

  // const onMove = ({ from, to }) => {
  //   game.move({
  //     from,
  //     to,
  //     promotion: game.QUEEN,
  //   });

  //   // if (game.turn() !== userColor) {
  //   //   sendMessage({
  //   //     t: 'move',
  //   //     d: {
  //   //       from,
  //   //       to,
  //   //     },
  //   //   });
  //   // }

  //   // setWhiteClock(latestClock.current.white);
  //   // setBlackClock(latestClock.current.black);
  // };

  const movePiece = (to, from) => {
    const selectedPiece = board.find(item => item.selected);
    const moveConfig = {
      to,
      from: from || selectedPiece.position,
      promotion: 'q',
    };



    game.move(moveConfig);
    setBoard(createBoardData(game));

    if (level > 0) {
      setTimeout(() => {
        const newGame = makeBestMove(game, level)
        setBoard(createBoardData(newGame));
      }, 20 * (3 - level));
    }

  };


  const selectPiece = position => {
    const piece = board.find(b => b.position === position);

    if (piece.canMoveHere) {
      movePiece(position);
      return;
    }

    if (game.turn() !== piece.color) {
      return;
    }

    const possibleMoves = game
      .moves({
        square: piece.position,
        verbose: true,
      })
      .map(item => item.to);

    const newBoard = board.map(square => {
      if (piece.selected) {
        return {
          ...square,
          selected: false,
          canMoveHere: false,
        };
      }

      const isSelected = square.position === position;
      const canMoveHere = possibleMoves.indexOf(square.position) > -1;

      return {
        ...square,
        selected: isSelected,
        canMoveHere,
      };
    });

    setBoard(newBoard);
  };

  function createBoardData(game, newFen) {
    if (newFen) {
      game.load(newFen);
    }
    const boardData = game.board();
    const squares = [];
    const history = game.history({ verbose: true });
    const lastMove = history[history.length - 1] || {};
    const inCheck = game.inCheck();
    const turn = game.turn();

    boardData.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const position = toPosition({ x: rowIndex, y: columnIndex })
        const type = square ? square.type : '';
        const color = square ? square.color : '';

        squares.push({
          ...square,
          position,
          rowIndex,
          columnIndex,
          selected: false,
          canMoveHere: false,
          lastMove: position === lastMove.to || position === lastMove.from,
          inCheck: inCheck && turn === color && type === 'k',
        });
      });
    });

    return squares;
  }

  const renderSquares = reverseBoard => {

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

  const renderPieces = () => {
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

  const reverseBoard = false;






  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text
          style={{
            color: "white",
            fontSize: 24
          }}
        >
          {game?.turn()}</Text>

        <View
          style={{
            transform: [
              {
                rotate: reverseBoard ? '180deg' : '0deg',
              },
            ],
            ...styles.container
          }}
        >
          {renderSquares(reverseBoard)}
          {/* <Text>dsfsf</Text> */}
          {renderPieces()}
        </View>
      </View>
    </>
  );
};

export default Board;
