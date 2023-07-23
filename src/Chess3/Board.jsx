import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chess } from "chess.js";
import { useEffect } from "react";
import ChessWebAPI from "chess-web-api";
import { BOARD_SIZE } from "./Notation";
import Row from "./Row";
import { Text } from "react-native";
import { makeBestMove } from "./script";




const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
});





const Board = ({ level }) => {
console.log(level)

  const [chess, setChess] = useState(new Chess());

  const [state, setState] = useState({
    player: chess.turn(),
    board: chess.board()
  });

  const getPuzzle = () => {
    const chessAPI = new ChessWebAPI();
    chessAPI.getDailyPuzzle().then(a => {

      let game = new Chess(a.body.fen)
      console.log(game.fen())
      setChess(game)

      setState({
        player: game.turn(),
        board: game.board(),
      })
    });
  }

  useEffect(() => {
    // getPuzzle()
  }, [])

  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });

    if (level) {
      setTimeout(() => {
        const game = makeBestMove(chess, level)
        setState({
          player: game.player === "w" ? "b" : "w",
          board: game.board(),
        });
      }, 250)
    }

  }, [chess, state.player]);

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text
          style={{
            color: "white",
            fontSize: 24
          }}
        >{chess.turn()}</Text>

        <View style={styles.container}>
          {state.board.map((d, i) => (
            <Row
              key={i}
              row={i}
              data={d}
              chess={chess}
              onTurn={onTurn}
            />
          ))}
        </View>
      </View>


    </>
  );
};

export default Board;
