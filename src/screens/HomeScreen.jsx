import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Dimensions, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    const { width, height } = Dimensions.get('window');

    return (
        <ScrollView>
            <ImageBackground
                source={require('../assets/background.png')}
                style={{ width, height }}
            >
                <View
                    style={{
                        // justifyContent: 'space-between',
                        width,
                        height
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                height: 80,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 15,
                                marginBottom: 15
                            }}
                        >
                            <View>
                                <Image source={require('../assets/logo.png')} />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 15,
                                    alignItems: 'center',
                                }}

                            >
                                <TouchableOpacity>
                                    <Image
                                        style={{
                                            width: 26,
                                            height: 26
                                        }}
                                        source={require('../assets/menu.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image
                                        style={{
                                            width: 26,
                                            height: 26
                                        }}
                                        source={require('../assets/profile.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.25);',
                                    borderRadius: 20,
                                    marginHorizontal: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 10,
                                    height: 113,
                                    width: 318
                                }}
                                source={require('../assets/chess.png')}
                            />

                            <Text style={styles.text}>Checkmate your Limits</Text>
                        </View>
                    </View>


                    <View style={{
                        width: '100%',
                        height: height / 4,
                        alignItems: 'center',
                        paddingHorizontal: 30,

                    }}>
                        <View
                            style={{
                                width: '100%',
                                borderRadius: 9,
                                borderWidth: 2,
                                borderColor: 'rgba(255, 170, 0, 0.38)',
                            }}
                        >
                            <View style={{ borderBottomWidth: 2, ...styles.boxContainer }}>
                                <View style={{ borderRightWidth: 2, ...styles.box }}>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>Checkmate</Text>
                                        <Text style={styles.text}>Checkmate</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.box}>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>Checkmate</Text>
                                        <Text style={styles.text}>Checkmate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.boxContainer}>
                                <View style={{ borderRightWidth: 2, ...styles.box }}>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>Checkmate</Text>
                                        <Text style={styles.text}>Checkmate</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.box}>
                                    <TouchableOpacity>
                                        <Text style={styles.text}>Checkmate</Text>
                                        <Text style={styles.text}>Checkmate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>

            <View
            style={{color:'#fff'}}
            >
                <Text >Checkmate your Limits</Text>
                <Text >Checkmate your Limits</Text>
                <Text >Checkmate your Limits</Text>
                <Text >Checkmate your Limits</Text>
                <Text >Checkmate your Limits</Text>
            </View>
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
    text: {
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        // fontFamily: 'Garamond',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 24,
    },

    boxContainer: {
        borderColor: 'rgba(255, 170, 0, 0.38)',
        backgroundColor: 'rgba(0, 0, 0, 0.16)',
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: 'rgba(255, 170, 0, 0.38)',
    },
});

export default HomeScreen;
