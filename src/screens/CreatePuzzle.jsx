import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Square from '../components/Chess/Square';
import Piece from '../components/Chess/Piece';
import { Chess } from 'chess.js';
import { createBoardData, emptyBoard, toPosition } from '../components/Chess/functions';
import RenderSquares from '../components/Chess/RenderSquares';
import RenderPieces from '../components/Chess/RenderPieces';
import { BOARD_SIZE } from '../components/Chess/constants';
import PieceModal from '../components/PieceModal';

const CreatePuzzle = () => {
    const [game, setGame] = useState();
    const [board, setBoard] = useState();
    const [reverseBoard, setReverseBoard] = useState(false);
    const [promotionModalVisible, setPromotionModalVisible] = useState(false);
    const [promotionPromise, setPromotionPromise] = useState(null);
    const [pieceData, setPieceData] = useState([]);

    const showNotation = false;



    useEffect(() => {
        const squares = emptyBoard()
        setBoard(squares)
    }, [])

    useEffect(() => {
        ['r', 'n', 'b', 'q', 'k', 'p']
        const wr = getCount({ color: 'w', type: 'r' })
        const wn = getCount({ color: 'w', type: 'n' })
        const wb = getCount({ color: 'w', type: 'b' })
        const wq = getCount({ color: 'w', type: 'q' })
        const wk = getCount({ color: 'w', type: 'k' })
        const wp = getCount({ color: 'w', type: 'p' })

        const br = getCount({ color: 'b', type: 'r' })
        const bn = getCount({ color: 'b', type: 'n' })
        const bb = getCount({ color: 'b', type: 'b' })
        const bq = getCount({ color: 'b', type: 'q' })
        const bk = getCount({ color: 'b', type: 'k' })
        const bp = getCount({ color: 'b', type: 'p' })

        const pieces = [];

        if (wr < 2) pieces.push('wr')
        if (wn < 2) pieces.push('wn')
        if (wb < 2) pieces.push('wb')
        if (wq < 1) pieces.push('wq')
        if (wk < 1) pieces.push('wk')
        if (wp < 8) pieces.push('wp')

        if (br < 2) pieces.push('br')
        if (bn < 2) pieces.push('bn')
        if (bb < 2) pieces.push('bb')
        if (bq < 1) pieces.push('bq')
        if (bk < 1) pieces.push('bk')
        if (bp < 8) pieces.push('bp')

        setPieceData(pieces)


    }, [board])

    const getCount = ({ color, type }) => {
        if (!(board && type && color)) return
        return board.filter(square => square.color === color && square.type === type).length
    }

    const updateBoard = async (position) => {
        // console.log(position)
        const { type, color } = await openModal();
        let squares = [...board]
        let x = squares.findIndex(square => square.position == position);
        squares[x] = { ...squares[x], type, color, selected: false }
        setBoard(squares);
        console.log(JSON.stringify(squares))
    }


    const openModal = () => {
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




    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <PieceModal
                isVisible={promotionModalVisible}
                onPieceSelect={handlePieceSelect}
                data={pieceData}
            />

            {board && <View
                style={{
                    transform: [
                        {
                            rotate: reverseBoard ? '180deg' : '0deg',
                        },
                    ],
                    width: BOARD_SIZE,
                    height: BOARD_SIZE,
                }}
            >
                <RenderSquares board={board} movePiece={updateBoard} reverseBoard={false} showNotation={showNotation} showSuggestion={false} />
                <RenderPieces board={board} selectPiece={updateBoard} />
            </View>}
        </View>
    )
}

export default CreatePuzzle