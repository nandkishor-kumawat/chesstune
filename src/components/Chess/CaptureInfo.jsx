import { View, Text } from 'react-native'
import React from 'react'
import { BOARD_SIZE, PIECE_IMAGES } from './constants'
import { Image } from 'react-native'

const CaptureInfo = ({ game }) => {

    const capturedPieces = type => {

        return (<View
            style={{
                flex: 1,
                backgroundColor: 'rgba(37, 55, 107, 0.23)',
                borderRadius: 2,
                padding: 2,
                rowGap: 2,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >

            {game.history({ verbose: true }).filter(item => item.captured && item.color !== type).map((item, index) => (
                <Image
                    key={index}
                    style={{
                        width: 14,
                        height: 14,
                    }}
                    source={PIECE_IMAGES[`${type}${item.captured}`]}
                />
            ))}

        </View>)
    }



    return (

        <View
            style={{
                gap: 5,
                flexDirection: 'row',
                marginVertical: 5,
                height: 40,
                width: BOARD_SIZE
            }}
        >
            {capturedPieces('w')}
            {capturedPieces('b')}

        </View>
    )
}

export default CaptureInfo