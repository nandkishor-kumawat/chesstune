import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Chess } from "chess.js";
import { createBoardData } from "../components/Chess/functions";
import { Audio } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BOARD_SIZE, Sounds } from "../components/Chess/constants";
import PlayerInfo from "../components/Chess/PlayerInfo";
import RenderSquares from "../components/Chess/RenderSquares";
import RenderPieces from "../components/Chess/RenderPieces";
import { addToCollection } from "../firebase/Firebase";


const PuzzlePreview = () => {

  const { fen, moves } = useRoute().params;
  const [game, setGame] = useState(new Chess(fen));

  const [board, setBoard] = useState(createBoardData(game));
  const [reverseBoard, setReverseBoard] = useState(fen.split(' ')[1] === 'b');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);


  const navigation = useNavigation();
  const startPreview = async () => {

    setIsBtnDisabled(true);
    game.load(fen)
    setBoard(createBoardData(game));

    const movePiece = ({ to, from, promotion, sound }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          sound.playAsync();
          game.move({ to, from, promotion: promotion });
          setBoard(createBoardData(game));
          resolve();
        }, 1000);
      });
    };

    for (const { from, to, promotion } of moves) {
      const { sound } = await Audio.Sound.createAsync(Sounds.move);
      await movePiece({ to, from, promotion, sound });
    }

    setIsBtnDisabled(false);
  }

  const savePuzzle = async () => {
    try {
      const { id } = await addToCollection("puzzle", { fen, moves });

      navigation.navigate('PuzzleList', { id });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#050A18'
        }}
      >

        <PlayerInfo game={game} />

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
          <RenderSquares board={board} disabled={true} />
          <RenderPieces board={board} disabled={true} />
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={{ ...styles.btn, backgroundColor: 'orange', opacity: isBtnDisabled ? 0.3 : 1 }} onPress={startPreview} disabled={isBtnDisabled}>
            <Text style={styles.btnText}>Start Preview</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.btn, backgroundColor: 'green', opacity: isBtnDisabled ? 0.3 : 1 }} onPress={savePuzzle} disabled={isBtnDisabled}>
            <Text style={styles.btnText}>Save Puzzle</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },

  row: {
    paddingHorizontal: 15,
    gap: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },

  btn: {
    padding: 10,
    backgroundColor: 'rgba(37, 55, 107, 0.23)',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },

  btnText: {
    color: 'white',
    fontSize: 16,
  }
})

export default PuzzlePreview;