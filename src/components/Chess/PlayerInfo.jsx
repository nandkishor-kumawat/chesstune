import React from 'react'
import { View,StyleSheet,Image } from 'react-native'
import { BOARD_SIZE, PIECE_IMAGES, PIECE_SIZE } from './constants'

const PlayerInfo = ({ game }) => {
    return (
        <View style={styles.chessInfoBar}>
            <View
                style={{
                    backgroundColor: game.turn() === 'w' ? 'rgba(37, 55, 107, 0.75)' : null,
                    ...styles.chessInfo
                }}
            >
                <Image source={PIECE_IMAGES['wk']}
                    style={{
                        width: PIECE_SIZE,
                        height: PIECE_SIZE,
                    }}
                />
            </View>
            <View
                style={{
                    backgroundColor: game.turn() === 'b' ? 'rgba(37, 55, 107, 0.75 )' : null,
                    alignItems: 'flex-end',
                    ...styles.chessInfo
                }}
            >
                <Image source={PIECE_IMAGES['bk']}
                    style={{
                        width: PIECE_SIZE,
                        height: PIECE_SIZE,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chessInfoBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(37, 55, 107, 0.23)',
        marginVertical: 10,
        width: BOARD_SIZE
    },
    chessInfo: {
        height: 50,
        flex: 1,
        paddingHorizontal: 10
    }
})


export default PlayerInfo