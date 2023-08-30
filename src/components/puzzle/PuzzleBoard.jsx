import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Chess } from "chess.js";
import { Audio } from 'expo-av';
import PlayerInfo from "../Chess/PlayerInfo";
import PromotionModal from "../Chess/PromotionModal";
import RenderSquares from "../Chess/RenderSquares";
import RenderPieces from "../Chess/RenderPieces";
import CaptureInfo from "../Chess/CaptureInfo";
import { BOARD_SIZE, Sounds } from "../Chess/constants";
import { createBoardData } from "../Chess/functions";
import { useRoute } from "@react-navigation/native";


const PuzzleBoard = ({ level, newFen }) => {
  // const chessData = {
  //   fen: "8/8/8/8/8/8/2k5/6K1 w",
  //   moves: [
  //     {
  //       after: "8/8/8/8/8/8/2k3K1/8 b - - 1 1",
  //       before: "8/8/8/8/8/8/2k5/6K1 w - - 0 1",
  //       color: "w",
  //       flags: "n",
  //       from: "g1",
  //       lan: "g1g2",
  //       piece: "k",
  //       san: "Kg2",
  //       to: "g2"
  //     },
  //     {
  //       after: "8/8/8/8/8/2k5/6K1/8 w - - 2 2",
  //       before: "8/8/8/8/8/8/2k3K1/8 b - - 1 1",
  //       color: "b",
  //       flags: "n",
  //       from: "c2",
  //       lan: "c2c3",
  //       piece: "k",
  //       san: "Kc3",
  //       to: "c3"
  //     },
  //     {
  //       after: "8/8/8/8/8/2k3K1/8/8 b - - 3 2",
  //       before: "8/8/8/8/8/2k5/6K1/8 w - - 2 2",
  //       color: "w",
  //       flags: "n",
  //       from: "g2",
  //       lan: "g2g3",
  //       piece: "k",
  //       san: "Kg3",
  //       to: "g3"
  //     },
  //     {
  //       after: "8/8/8/8/8/3k2K1/8/8 w - - 4 3",
  //       before: "8/8/8/8/8/2k3K1/8/8 b - - 3 2",
  //       color: "b",
  //       flags: "n",
  //       from: "c3",
  //       lan: "c3d3",
  //       piece: "k",
  //       san: "Kd3",
  //       to: "d3"
  //     },
  //     {
  //       after: "8/8/8/8/6K1/3k4/8/8 b - - 5 3",
  //       before: "8/8/8/8/8/3k2K1/8/8 w - - 4 3",
  //       color: "w",
  //       flags: "n",
  //       from: "g3",
  //       lan: "g3g4",
  //       piece: "k",
  //       san: "Kg4",
  //       to: "g4"
  //     }
  //   ]
  // };

  const {params} = useRoute();
  const {fen, moves}= params;

  const chessData = {
    fen,
    moves
  }

  const [game, setGame] = useState(new Chess(chessData.fen));
  const [board, setBoard] = useState(createBoardData(game));
  const [reverseBoard, setReverseBoard] = useState(false);
  const [moveNumber, setMoveNumber] = useState(0);
  const [moveSound, setMoveSound] = useState(null);
  const [player, setPlayer] = useState(game.fen().split(' ')[1]);
  const [score, setScore] = useState(0);


  const loadSound = async (type) => {
    const { sound } = await Audio.Sound.createAsync(Sounds[type]);
    return sound;
  }

  useEffect(() => {
    setBoard(createBoardData(game));
    setReverseBoard(player === 'b');
  }, [game])


  const [promotionModalVisible, setPromotionModalVisible] = useState(false);
  const [promotionPromise, setPromotionPromise] = useState(null);

  const getPromotion = () => {
    setPromotionModalVisible(true);
    return new Promise((resolve) => {
      setPromotionPromise(() => resolve);
    });
  };

  const closePromotionModal = () => {
    setPromotionModalVisible(false);
  };

  const handlePieceSelect = (chosenPiece) => {
    closePromotionModal();
    if (promotionPromise) {
      promotionPromise(chosenPiece);
    }
  };


  const movePiece = async (to) => {
    const selectedPiece = board.find(item => item.selected);

    const move = game.moves({
      square: selectedPiece.position,
      verbose: true,
    }).find(m => m.to == to);

    const isPromotion = move.promotion;
    let promotion = 'q';

    if (isPromotion) promotion = await getPromotion();

    game.move({
      to,
      from: selectedPiece.position,
      promotion,
    });

    setBoard(createBoardData(game));
    moveSound.playAsync();

    if (chessData.moves[moveNumber].san !== move.san) {
      const newBoard = createBoardData(game).map(square => {
        if (square.position === to) {
          return {
            ...square,
            isInCorrect: true
          };
        }

        return {
          ...square,
          isInCorrect: false
        };
      });
      setBoard(newBoard);
      await Undo()
      setScore(prev => prev - 40);
    }
    else {
      setScore(prev => prev + 50);
      setTimeout(() => {
        if (chessData.moves.length === moveNumber + 1) {
          alert("You Win!");
          return;
        };
        const { from, to, promotion } = chessData.moves[moveNumber + 1];
        game.move({ from, to, promotion });
        setBoard(createBoardData(game));
        setMoveNumber(prev => prev + 2);
      }, 1000);
    }
  };


  useEffect(() => {
    if (chessData.moves.length === moveNumber) return;
    console.log({ moveNumber })
  }, [moveNumber])


  const Undo = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        game.undo();
        setBoard(createBoardData(game));
        resolve();
      }, 1000);
    })
  }

  const selectPiece = async position => {
    if (chessData.moves.length === moveNumber) return;

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
          isCapture: false
        };
      }

      const isSelected = square.position === position;
      const canMoveHere = possibleMoves.indexOf(square.position) > -1;
      const isCapture = square.type && canMoveHere;

      return {
        ...square,
        selected: isSelected,
        canMoveHere,
        isCapture
      };
    });

    setBoard(newBoard);
    const sound = await loadSound('move');
    setMoveSound(sound);
  };


  return (
    <>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

        <PlayerInfo game={game} />

        <PromotionModal
          isVisible={promotionModalVisible}
          onPieceSelect={handlePieceSelect}
          color={game.turn()}
        />


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
          <RenderSquares board={board} movePiece={movePiece} reverseBoard={reverseBoard} disabled={player !== game.turn()} />
          <RenderPieces board={board} selectPiece={selectPiece} disabled={player !== game.turn()} />
        </View>

        <CaptureInfo game={game} />


        <Text>Score: {score}</Text>


      </View>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  }
})

export default PuzzleBoard;
