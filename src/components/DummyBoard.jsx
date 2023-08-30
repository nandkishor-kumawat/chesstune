import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import RenderSquares from "./Chess/RenderSquares";
import RenderPieces from "./Chess/RenderPieces";
import { BOARD_SIZE, PIECE_SIZE } from "./Chess/constants";
import { Chess } from 'chess.js'
import { createBoardData } from "./Chess/functions";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";



const DummyBoard = ({ puzzle}) => {
    const { fen, moves } = puzzle;
    const [game, setGame] = useState(new Chess(fen));
    const [board, setBoard] = useState(createBoardData(game));
    const showNotation = true;
    const [reverseBoard, setReverseBoard] = useState(false);


    useEffect(() => {
        setReverseBoard(game?.fen().split(' ')[1] === 'b');
    }, [game])

    const navigation = useNavigation();


    return (
        <>
            <TouchableWithoutFeedback
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onPress={() => {
                    navigation.navigate("PuzzleBoard", {
                        game: game,
                        fen: fen,
                        moves: moves
                    })
                }}
            >

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
                    <RenderSquares board={board} disabled={true} width={PIECE_SIZE / 1.5} />
                    <RenderPieces board={board} disabled={true} width={PIECE_SIZE / 1.5} />
                </View>

            </TouchableWithoutFeedback>
        </>
    );
};



const styles = StyleSheet.create({
    container: {
        width: BOARD_SIZE / 1.5,
        height: BOARD_SIZE / 1.5,
    }
})

export default DummyBoard;
