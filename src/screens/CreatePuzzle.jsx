import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import Square from '../components/Chess/Square';
import Piece from '../components/Chess/Piece';
import { Chess } from 'chess.js';
import { createBoardData, emptyBoard, toPosition } from '../components/Chess/functions';
import RenderSquares from '../components/Chess/RenderSquares';
import RenderPieces from '../components/Chess/RenderPieces';
import { BOARD_SIZE, PIECE_IMAGES, PIECE_SIZE } from '../components/Chess/constants';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Board from '../components/Chess/Board';
import { useNavigation } from '@react-navigation/native';

const CreatePuzzle = () => {
    const [game, setGame] = useState();
    const [board, setBoard] = useState();
    const [reverseBoard, setReverseBoard] = useState(false);
    const [pieceData, setPieceData] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [isMovesDisabled, setIsMovesDisabled] = useState(true);
    const [fen, setFen] = useState('');
    const [bestMoves, setBestMoves] = useState([]);
    const [player, setPlayer] = useState('w');

    const showNotation = false;

    const navigation = useNavigation();


    useEffect(() => {
        const squares = emptyBoard()
        setBoard(squares)
    }, [])


    const getCount = ({ board, color, type }) => {
        if (!(board && type && color)) return
        return board.filter(square => square.color === color && square.type === type).length
    }

    useEffect(() => {
        const counts = {};

        ['b', 'w'].map(color => {
            ['r', 'n', 'b', 'q', 'k', 'p'].map(type => {
                counts[color + type] = getCount({ board, color, type })
            })
        })

        const { wr, wn, wb, wq, wk, wp, br, bn, bb, bq, bk, bp } = counts

        const pieces = {
            w: [],
            b: []
        };

        if (wr < 2) pieces.w.push('r')
        if (wn < 2) pieces.w.push('n')
        if (wb < 2) pieces.w.push('b')
        if (wq < 1) pieces.w.push('q')
        if (wk < 1) pieces.w.push('k')
        if (wp < 8) pieces.w.push('p')

        if (br < 2) pieces.b.push('r')
        if (bn < 2) pieces.b.push('n')
        if (bb < 2) pieces.b.push('b')
        if (bq < 1) pieces.b.push('q')
        if (bk < 1) pieces.b.push('k')
        if (bp < 8) pieces.b.push('p')

        setPieceData(pieces)
        setIsBtnDisabled(wk === 0 || bk === 0)
    }, [board])


    const updateBoard = async ({ color, type }) => {
        const selectedPiece = board.find(item => item.selected);

        if (!selectedPiece) return;

        const newBoard = board.map(square => {
            if (square.selected) {
                return {
                    ...square,
                    color,
                    type,
                    selected: false,
                };
            }
            return {
                ...square,
            };
        });

        setBoard(newBoard);
    }

    const selectPiece1 = position => {
        const piece = board.find(b => b.position === position);

        const newBoard = board.map(square => {
            if (piece.selected) {
                return {
                    ...square,
                    selected: false,
                };
            }

            return {
                ...square,
                selected: square.position === position,
            };
        });
        setBoard(newBoard);
    };


    const selectPiece = position => {
        if (isMovesDisabled) {
            selectPiece1(position)
        }
    }

    const movePiece = async (to, from) => {
        const selectedPiece = board.find(item => item.selected);
        let level = 0
        const move = game.moves({
            square: selectedPiece.position,
            verbose: true,
        }).find(m => m.to == to);
        // console.log(move)

        const isPromotion = move.promotion;
        let promotion = 'q';


        const moveConfig = {
            to,
            from: from || selectedPiece.position,
            promotion,
        };

        game.move(moveConfig);
        setBoard(createBoardData(game));

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




    const setPuzzle = () => {
        const jsonBoard = []

        board.forEach(square => {
            const { color, type, position, rowIndex } = square;
            if (!jsonBoard[rowIndex]) jsonBoard[rowIndex] = [];
            jsonBoard[rowIndex].push(color ? { color, type, square: position } : null)
        });

        let fen = ''

        jsonBoard.forEach((row, rowIndex) => {
            let empty = 0;
            row.forEach((piece, columnIndex) => {
                if (piece) {
                    const type = piece.color === 'w' ? piece.type.toUpperCase() : piece.type
                    if (empty > 0) fen += empty
                    fen += type
                    empty = 0;
                } else {
                    empty++
                }
            })
            if (empty > 0) fen += empty
            if (rowIndex < jsonBoard.length - 1) fen += '/'
        })

        fen += ' ' + player;

        const chess = new Chess(fen);
        setGame(chess);
        setBoard(createBoardData(chess));
        setFen(fen);
        setIsMovesDisabled(false);
    }

    const Preview = async () => {
        const history = game.history({ verbose: true });

        const chess = new Chess(fen);
        setGame(chess);

        navigation.navigate('PuzzlePreview', {
            game: chess,
            fen: fen,
            moves: history,
        })

    };


    if (!isMovesDisabled) {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                backgroundColor: '#050A18',
            }}>
                <Board game={game} setGame={setGame} />


                <View style={{
                    gap: 10,
                    flexDirection: 'row',
                    marginVertical: 10,
                }}>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: 'orange',
                        }}
                        onPress={Preview}
                    >
                        <Text style={styles.btnText}>Preview</Text>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }


    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#050A18',
            paddingHorizontal: 15
        }}>

            {board && <View style={{
                transform: [
                    {
                        rotate: player === 'b' ? '180deg' : '0deg',
                    },
                ],
                width: BOARD_SIZE,
                height: BOARD_SIZE,
            }}>
                <RenderSquares board={board} movePiece={selectPiece} reverseBoard={player === 'b'} showNotation={true} showSuggestion={false} />
                <RenderPieces board={board} selectPiece={selectPiece} />
            </View>}


            <View style={{
                flexDirection: 'row',
                gap: 10,
                marginVertical: 10,
                justifyContent: 'space-around',
                width: '100%'
            }}>
                <View>
                    <Text style={{ color: 'white' }}>Who will play first: </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    {Object.entries({ w: 'white', b: 'black' }).map(([color, name]) => {
                        return (
                            <TouchableWithoutFeedback key={name} onPress={() => setPlayer(color)}>
                                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        borderRadius: 5,
                                        backgroundColor: player === color ? 'green' : 'white',
                                        borderwidth: 15,
                                        borderColor: 'green',
                                    }} ></View>
                                    <Text style={{ color: 'white' }}>{name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            </View>


            <View style={styles.container}>
                {Object.keys(pieceData).map(color => {
                    return (
                        <View key={color} style={styles.row}>
                            {pieceData[color].map(type => {
                                return (
                                    <TouchableOpacity key={type} onPress={() => updateBoard({ color, type })}>
                                        <Image style={styles.image} source={PIECE_IMAGES[color + type]} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )
                })}

                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                    <TouchableOpacity
                        onPress={() => updateBoard({ type: '', color: '' })}
                        style={styles.btn}
                    >
                        <Text>Remove Piece</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={setPuzzle}
                        style={{
                            ...styles.btn,
                            backgroundColor: isBtnDisabled ? 'rgba(255, 255, 255, 0.5)' : 'white',
                        }}
                        disabled={isBtnDisabled}
                    >
                        <Text
                            style={{
                                color: isBtnDisabled ? 'rgba(0, 0, 0, 0.5)' : 'black',
                            }}
                        >Set Puzzle</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
        marginVertical: 5
    },
    row: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        gap: 5,
        flexDirection: 'row'
    },
    image: {
        width: PIECE_SIZE,
        height: PIECE_SIZE,
    },

    btn: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },

    btnText: {
        color: 'white',
        fontSize: 16,
    }
})


export default CreatePuzzle