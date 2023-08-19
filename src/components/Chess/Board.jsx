import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chess } from "chess.js";
import { Audio } from 'expo-av';
import CaptureInfo from "./CaptureInfo";
import PlayerInfo from "./PlayerInfo";
import PromotionModal from "./PromotionModal";
import { getBestMove, makeBestMove } from "./script";
import { BOARD_SIZE, Sounds } from "./constants";
import { createBoardData, getPuzzleData } from "./functions";
import RenderPieces from "./RenderPieces";
import RenderSquares from "./RenderSquares";


const Board = ({ level, game, setGame, newFen }) => {

  const [board, setBoard] = useState(createBoardData(game));
  const showNotation = true;
  const [reverseBoard, setReverseBoard] = useState(false);

  const [moveSound, setMoveSound] = useState(null);
  const [winSound, setWinSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [captureSound, setCaptureSound] = useState(null);
  const [checkSound, setCheckSound] = useState(null);

  const loadSounds = async () => {
    Audio.Sound.createAsync(Sounds.move).then(({ sound }) => setMoveSound(sound));
  }

  useEffect(() => {

    loadSounds()
  }, [])


  const getPuzzle = async () => {
    const res = await getPuzzleData('training');

    drawPuzzle(res.puzzle)

    // const fen = res.puzzle.fen;
    // const chess = new Chess(fen);
    // setGame(chess);
    // setBoard(createBoardData(chess));
    // setReverseBoard(res.puzzle.color === 'white');


    // const resJson = JSON.stringify(res);

    // console.log(res.puzzle.fen);
  };

  const drawPuzzle = async (data) => {
    const { id, fen, color, initialMove, lines } = data;

    const puzzleMoves = [];
    const WIN_KEY = 'win'
    let nextObject = lines;
    while (true) {
      var nextKey = Object.keys(nextObject)[0];
      nextObject = nextObject[nextKey];

      puzzleMoves.push(nextKey);
      // console.log(nextKey);

      if (nextObject === WIN_KEY) {
        puzzleMoves.push(WIN_KEY);
        break;
      }
    }
    const chess = new Chess(fen);
    setGame(chess);
    setBoard(createBoardData(chess));
    setReverseBoard(color === 'white');

    console.log(puzzleMoves)

    // this.setState(
    //   {
    //     game: new Chess(fen),
    //     puzzleId: id,
    //     fen,
    //     userColor: color === 'white' ? 'w' : 'b',
    //     waiting: true,
    //     puzzleMoves,
    //   },
    //   () => this.lateMove(initialMove),
    // );
  }


  useEffect(() => {
    setBoard(createBoardData(game));
    setReverseBoard(game.fen().split(' ')[1] === 'b');
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

  const onMove = ({ from, to }) => {
    const {
      game,
      userColor,
      puzzleMoves,
      resigned,
      victory,
    } = this.state;
    const currentMoveIndex = this.getCurrentMoveIndex();
    const moveStr = `${from}${to}`;
    const moveLine = puzzleMoves[currentMoveIndex + 1];
    const gameOver = victory || resigned;

    game.move({
      from,
      to,
      promotion: game.QUEEN,
    });

    let nextIndex = currentMoveIndex + 1;
    if (!gameOver) {
      nextIndex += 1;
    }
    const nextMove = puzzleMoves[nextIndex];

    if (moveLine === WIN_KEY) {
      this.setState({
        victory: true,
        success: false,
        failed: false,
      });
    } else if (gameOver || game.turn() !== userColor) {
      this.setState({
        waiting: true,
      });

      // right move
      if (moveLine === moveStr) {
        if (nextMove) {
          if (nextMove === WIN_KEY) {
            this.setState({
              victory: true,
              success: false,
              failed: false,
            });
          }

          if (!gameOver) {
            this.lateMove(nextMove);
          }
        }

        this.setState({
          success: true,
          failed: false,
        });
      } else if (!gameOver) {
        // undo
        this.setState({
          success: false,
          failed: true,
        });

        setTimeout(
          () => {
            game.undo();
            this.board.undo();
            this.setState({ waiting: false });
          },
          1000,
        );
      }
    }
  };

  const movePiece = async (to, from) => {
    const selectedPiece = board.find(item => item.selected);

    const move = game.moves({
      square: selectedPiece.position,
      verbose: true,
    }).find(m => m.to == to);
    // console.log(move)

    const isPromotion = move.promotion;
    let promotion = 'q';

    if (isPromotion) {
      promotion = await getPromotion();
    }

    const moveConfig = {
      to,
      from: from || selectedPiece.position,
      promotion,
    };

    game.move(moveConfig);
    setBoard(createBoardData(game));
    console.log(game.history({verbose:true}))

    // onMove(moveConfig);

    // moveSound.playAsync()
    // loadSounds()

    if (game.isCheckmate()) {
      setTimeout(() => {
        alert('CHECK MATE');
      }, 500);
    } else if (level > 0) {
      // await moveSound.unloadAsync()
      setTimeout(async () => {

        const newGame = makeBestMove(game, level)
        setBoard(createBoardData(newGame));

      }, 20 * (3 - level) * (3 - level));
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
          <RenderSquares board={board} movePiece={movePiece} reverseBoard={reverseBoard} showNotation={showNotation} />
          <RenderPieces board={board} selectPiece={selectPiece} />
        </View>

        <CaptureInfo game={game} />

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

export default Board;
