import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Chess } from "chess.js";

import Background from "./Background";
import Piece from "./Piece";
import { useEffect } from "react";
import ChessWebAPI from "chess-web-api";
import { BOARD_SIZE } from "./Notation";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native";


const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
});

const Board = () => {


  const [chess, setChess] = useState();

  const [state, setState] = useState({
    player: "w",
    board: null
  });

  const getPuzzle = () => {
    const chessAPI = new ChessWebAPI();
    chessAPI.getDailyPuzzle().then(a => {

      let game = new Chess(a.body.fen)
      setChess(game)
      console.log(game.fen())
      setState({
        player: game.turn(),
        board: game.board(),
      })
    });
  }

  useEffect(() => {

    getPuzzle()
  }, [])

  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess, state.player]);

  return (
    <>
      <View style={styles.container}>
        <Background />
        {state.board?.map((row, y) =>
          row.map((piece, x) => {
            if (piece !== null) {
              return (
                <Piece
                  key={`${x}-${y}`}
                  id={`${piece.color}${piece.type}`}
                  startPosition={{ x, y }}
                  chess={chess}
                  onTurn={onTurn}
                  enabled={state.player === piece.color}
                />
              );
            }
            return null;
          })
        )}
      </View>
      <Button onPress={getPuzzle} title="Get Puzzle" />
  
    </>
  );
};

export default Board;
