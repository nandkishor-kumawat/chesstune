import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chess } from "chess.js";
import { useEffect } from "react";
import { BOARD_SIZE } from "./Notation";
import { Text } from "react-native";
import { makeBestMove } from "./script";
import Square from "./Square";
import { getChessState } from "../context/ChessContextProvider";


const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
});

const Row = ({ row }) => {

  console.log({ row })

  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
    }}>
      {new Array(8).fill(0).map((_, i) => (
        <Square
          key={i}
          position={{ row, col: i }}
        />
      ))}
    </View>
  );
};



const Board = ({ level }) => {
  console.log(level)
  const { setChess, state, setState } = getChessState()
  // useEffect(() => {
  //   const chess = new Chess()
  //   setChess(chess)
  //   setState({
  //     player: "w",
  //     board: chess.board(),
  //   })
  // }, [])
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        {/* <Text
          style={{
            color: "white",
            fontSize: 24
          }}
        >
          {chess?.turn()}</Text> */}

        <View style={styles.container}>
          {new Array(8).fill(0).map((_, i) => (
            <Row
              key={i}
              row={i}
            />
          ))}
        </View>
      </View>
    </>
  );
};

export default Board;
