import React from "react";
import { View, StyleSheet } from "react-native";

import Board from "./Board";
import { useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(36, 35, 32)",
    paddingHorizontal:15
  },
});

const Chess = () => {
  
  const {params} = useRoute();

  // console.log(level)

  return (
    <View style={styles.container}>
      {/* <Board level={1} /> */}
      <Board level={params?.level}/>
    </View>
  );
};

export default Chess;
