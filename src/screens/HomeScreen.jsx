import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Dimensions, Image, Text, SafeAreaView } from 'react-native';

const HomeScreen = () => {
    const { width, height } = Dimensions.get('screen');

    return (
        <ScrollView
            style={{ backgroundColor: "#050A18" }}
        >
            <ImageBackground
                source={require('../assets/background.png')}
                style={{ width, height }}
            >
                <View>
                    <Text style={{ color: 'white' }}>Hello</Text>
                    <Text style={{ color: 'white' }}>Hello</Text>
                    <Text style={{ color: 'white' }}>Hello</Text>
                    <Text style={{ color: 'white' }}>Hello</Text>
                    <Text>Hello</Text>
                    <Text>Hello</Text>
                    <Image
                        style={styles.chessImage}
                        source={require('../assets/chess.png')}
                    />
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chessImage: {
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.06)) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.04))'
    },
});

export default HomeScreen;
