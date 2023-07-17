import React from "react";
import { View, StyleSheet } from "react-native";

import Board from "./Board";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(36, 35, 32)",
    paddingHorizontal:15
  },
});

const Chess = () => {
  return (
    <View style={styles.container}>
      {/* <Board level={1} /> */}
      <Board/>
    </View>
  );
};

export default Chess;
