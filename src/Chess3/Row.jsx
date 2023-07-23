import { View, Text } from 'react-native'
import React from 'react'
import Square from './Square';

const Row = ({ row, data, chess,onTurn }) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: "row",
        }}>
            {data.map((piece, i) => (
                <Square
                    key={i}
                    piece={piece}
                    chess={chess}
                    position={{ row, col: i }}
                    onTurn={onTurn}
                />
            ))}
        </View>
    );
  };
export default Row