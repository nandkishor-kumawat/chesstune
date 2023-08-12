import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Chess } from "chess.js";
import { useEffect } from "react";
import { BOARD_SIZE, COLUMN_NAMES, DIMENSION, PIECE_IMAGES, PIECE_SIZE, toPosition } from "./Notation";
import { Text } from "react-native";
import { getBestMove, makeBestMove } from "./script";
import Square from "./Square";
import { getChessState } from "../context/ChessContextProvider";
import Piece from "./Piece";
import { Image } from "react-native";
import { Audio } from 'expo-av';
import CaptureInfo from "./CaptureInfo";
import PlayerInfo from "./PlayerInfo";
import PromotionModal from "./PromotionModal";
import ChessWebAPI from "chess-web-api";




const Board = ({ level }) => {
  const [game, setGame] = useState(new Chess());
  const [board, setBoard] = useState(createBoardData(game));
  const showNotation = true;
  const reverseBoard = false;

  const [moveSound, setMoveSound] = useState(null);
  const [winSound, setWinSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [captureSound, setCaptureSound] = useState(null);
  const [checkSound, setCheckSound] = useState(null);

  const loadSounds = async () => {
    Audio.Sound.createAsync(require('../assets/sound/move.webm')).then(({ sound }) => setMoveSound(sound));
    Audio.Sound.createAsync(require('../assets/sound/capture.webm')).then(({ sound }) => setCaptureSound(sound));
    Audio.Sound.createAsync(require('../assets/sound/check.webm')).then(({ sound }) => setCheckSound(sound));
    // await Audio.Sound.createAsync(require('../assets/sound/win.webm')).then(({ sound }) => setWinSound(sound));
    // await Audio.Sound.createAsync(require('../assets/sound/lose.webm')).then(({ sound }) => setLoseSound(sound));
  }

  useEffect(() => {

    loadSounds()
  }, [])

  // import ChessWebAPI from "chess-web-api";
  const getPuzzle = () => {
    const chessAPI = new ChessWebAPI();
    chessAPI.getDailyPuzzle().then(a => {

      let game = new Chess(a.body.fen)
      console.log(game.fen())
      setGame(game)
      setBoard(createBoardData(game))
    });
  }

  useEffect(() => {
    // getPuzzle()
  }, [])

  // const onMove = ({ from, to }) => {
  //   game.move({
  //     from,
  //     to,
  //     promotion: game.QUEEN,
  //   });

  //   if (game.turn() !== userColor) {
  //     sendMessage({
  //       t: 'move',
  //       d: {
  //         from,
  //         to,
  //       },
  //     });
  //   }

  //   setWhiteClock(latestClock.current.white);
  //   setBlackClock(latestClock.current.black);
  // };

  const getDailyPuzzle = () => {
    const HTTP_BASE_URL = 'https://en.lichess.org';
    fetch(`${HTTP_BASE_URL}/training/new?_${Date.now()}`, {
      headers: {
        Accept: 'application/vnd.lichess.v2+json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(res => res.json())
      .then(res => {
        const fen = res.puzzle.fen
        const chess = new Chess(fen)
        setGame(chess);
        setBoard(createBoardData(chess));
        console.log(fen)
      });

  }

  useEffect(() => {

    getDailyPuzzle()

  }, [])




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



  const movePiece = async (to, from) => {
    const selectedPiece = board.find(item => item.selected);

    const move = game.moves({
      square: selectedPiece.position,
      verbose: true,
    }).find(m => m.to == to);

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

  function createBoardData(game, newFen) {
    if (newFen) {
      game.load(newFen);
    }
    const boardData = game.board();
    const squares = [];
    const history = game.history({ verbose: true });
    const lastMove = history[history.length - 1] || {};
    const inCheck = game.inCheck();
    const turn = game.turn();

    boardData.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const position = toPosition({ x: rowIndex, y: columnIndex })
        const type = square ? square.type : '';
        const color = square ? square.color : '';

        squares.push({
          ...square,
          position,
          rowIndex,
          columnIndex,
          selected: false,
          canMoveHere: false,
          lastMove: position === lastMove.to || position === lastMove.from,
          inCheck: inCheck && turn === color && type === 'k',
        });
      });
    });

    return squares;
  }

  const renderSquares = reverseBoard => {

    const rowSquares = [];

    board.forEach(square => {
      const {
        rowIndex,
        columnIndex,
        position,
        selected,
        canMoveHere,
        lastMove,
        inCheck,
        isCapture
      } = square;

      const squareView = (
        <Square
          key={`square_${rowIndex}_${columnIndex}`}
          showNotation={showNotation}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          canMoveHere={canMoveHere}
          position={position}
          lastMove={lastMove}
          inCheck={inCheck}
          reverseBoard={reverseBoard}
          onSelected={movePiece}
          isCapture={isCapture}
        />
      );

      if (!rowSquares[rowIndex]) {
        rowSquares[rowIndex] = [];
      }
      rowSquares[rowIndex].push(squareView);
    });

    return rowSquares.map((r, index) => {
      return (
        <View key={`row_${index}`} style={{ flexDirection: 'row' }}>
          {r}
        </View>
      );
    });
  };

  const renderPieces = () => {
    return board.map(square => {
      const {
        type,
        color,
        rowIndex,
        columnIndex,
        position,
      } = square;
      if (type) {
        return (
          <Piece
            key={`piece_${rowIndex}_${columnIndex}`}
            type={type}
            color={color}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            position={position}
            onSelected={selectPiece}
          />
        );
      }
      return null;
    });
  };


  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
          {renderSquares(reverseBoard)}
          {renderPieces()}
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
  },
  chessInfoBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(37, 55, 107, 0.23)',
    marginVertical: 5
  },
  chessInfo: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10
  }
})

export default Board;
