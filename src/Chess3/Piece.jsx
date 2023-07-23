import React, { useCallback } from "react";
import { StyleSheet, Image } from "react-native";
import { SIZE, toPosition } from "./Notation";
import { TouchableOpacity } from "react-native";

export const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});



const Piece = ({piece,isActive, handleSquarePress, position,chess,selectedSquare }) => {




  // const movePiece = useCallback(
  //   (to) => {
  //     console.log(to)
  //     const moves = chess.moves({ verbose: true });
  //     const from = toPosition({ x: offsetX.value, y: offsetY.value });
  //     const move = moves.find((m) => m.from == from && m.to == to);

  //     const { x, y } = toTranslation(move ? move.to : from);
  //     translateX.value = withTiming(
  //       x,
  //       {},
  //       () => (offsetX.value = translateX.value)
  //     );
  //     translateY.value = withTiming(y, {}, () => {
  //       offsetY.value = translateY.value;
  //       isGestureActive.value = false;
  //     });

  //     if (move) {
  //       chess.move({ from, to });
  //       onTurn();
  //     }
  //   },
  //   [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  // );

  const style = StyleSheet.create({
    position: "absolute",
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  })

  return (
    <>
      <TouchableOpacity
        onPress={() => handleSquarePress(position, piece)}
        style={{
          flex: 1,
          backgroundColor: isActive ? ACTIVE_COLOR : "transparent",
        }}
      >
        {piece && <Image source={PIECES[`${piece.color}${piece.type}`]} style={styles.piece} />}
      </TouchableOpacity>
    </>
  );
};

export default Piece;
