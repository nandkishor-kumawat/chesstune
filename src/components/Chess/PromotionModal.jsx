import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';
import { PIECE_IMAGES, PIECE_SIZE } from './constants';
import { StyleSheet } from 'react-native';


const PromotionModal = ({ isVisible, onPieceSelect, color = 'w' }) => {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
      transform: [
        {
          rotate: color === 'b' ? '180deg' : '0deg',
        },
      ],
    }
  })


  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.row}>

          {['q', 'r', 'b', 'n'].map(type => {
            return (
              <TouchableOpacity key={type} onPress={() => onPieceSelect(type)}>
                <Image style={styles.image} source={PIECE_IMAGES[`${color}${type}`]} />
              </TouchableOpacity>
            )
          })}

        </View>
      </View>
    </Modal>
  );
};


export default PromotionModal;