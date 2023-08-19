import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import Board from "./Board";
import { useRoute } from "@react-navigation/native";
import { Chess } from "chess.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "rgb(36, 35, 32)",
    paddingHorizontal:15
  },
});

const ChessGame = () => {
  
  const {params} = useRoute();
  const [game, setGame] = useState(new Chess());
  // console.log(level)

  return (
    <View style={styles.container}>
      {/* <Board level={1} /> */}
      <Board level={params?.level} game={game} setGame={setGame} />
    </View>
  );
};

export default ChessGame;
