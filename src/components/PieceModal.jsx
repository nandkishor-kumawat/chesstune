import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native';
import { PIECE_IMAGES, PIECE_SIZE } from './Chess/constants';


const PieceModal = ({ isVisible, onPieceSelect, color = 'w', data }) => {

    const renderRows = () => {
        const rowSquares = {
            w: [],
            b: []
        }

        data.forEach(piece => {
            const type = piece[1];
            const color = piece[0];

            const squareView = (
                <TouchableOpacity key={type} onPress={() => onPieceSelect({ type, color })}>
                    <Image style={styles.image} source={PIECE_IMAGES[`${color}${type}`]} />
                </TouchableOpacity>
            )

            rowSquares[color].push(squareView)
        });

        return Object.entries(rowSquares).map(([color, r]) => {
            return (<View key={color} style={styles.row}>
                {r}
            </View>)
        })
    }

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="none"
        >
            <View style={styles.container}>
                {renderRows()}
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => onPieceSelect({ type: '', color: '' })}>
                        <Text>Remove Piece</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        rowGap: 5
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
    }
})


export default PieceModal;