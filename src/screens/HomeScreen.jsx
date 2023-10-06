import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Dimensions, Image, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GraphSvg from '../assets/graph.svg'
import AwardSvg from '../assets/award.svg'
import VideoCircleSvg from '../assets/videocircle.svg'
import WalletSvg from '../assets/wallet.svg'
import LockSvg from '../assets/lock.svg'
import ArrowRightSvg from '../assets/arrowright.svg'
import GlobalSvg from '../assets/global.svg'
import InstagramSvg from '../assets/instagram.svg'
import SearchSvg from '../assets/search.svg'
import TournamentSvg from '../assets/tournament.svg'
import Header from '../components/Header';


const HomeScreen = () => {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();


    return (
        <SafeAreaView style={styles.container}>

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
                            <Header />

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
                            height: height / 4.5,
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
                                        <TouchableOpacity style={styles.ibox} onPress={() => navigation.navigate('PuzzleList')}>
                                            <TournamentSvg width="20" height="20" />
                                            <Text style={styles.text2}>Tournament</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.box}>
                                        <TouchableOpacity style={styles.ibox} onPress={() => navigation.navigate('Level')}>
                                            <GraphSvg width="20" height="20" />
                                            <Text style={styles.text2}>Daily Puzzle</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.boxContainer}>
                                    <View style={{ borderRightWidth: 2, ...styles.box }} >
                                        <TouchableOpacity style={styles.ibox} onPress={() => navigation.navigate('createPuzzle')}>
                                            <VideoCircleSvg width="20" height="20" />
                                            <Text style={styles.text2}>Lessons</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.box}>
                                        <TouchableOpacity style={styles.ibox}>
                                            <WalletSvg width="20" height="20" />
                                            <Text style={styles.text2}>Wallet</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View
                    style={{
                        paddingHorizontal: 28,
                        paddingBottom: 30,
                    }}
                >

                    <View
                        style={{
                            marginBottom: 20,
                            ...styles.center
                        }}
                    >
                        <Text
                            style={{
                                color: '#FCEC97',
                                fontSize: 26,
                                fontWeight: 700,
                                marginBottom: 25
                            }}
                        >Daily Puzzle</Text>

                        <View
                            style={{
                                position: 'relative',
                                paddingHorizontal: 50,
                                width,
                                ...styles.center
                            }}
                        >
                            <View
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 0.2,
                                    borderColor: '#FABE02',
                                    backgroundColor: '#3C5294',
                                    width: width - 100,
                                    height: width - 100,
                                    padding: 35,
                                    ...styles.center
                                }}
                            >
                                <Image source={require('../assets/chessboard.png')} />

                            </View>

                            <View style={{
                                position: 'absolute',
                                top: '50%',
                                width: '100%',
                                height: 100,
                                transform: [{ translateY: -50 }],
                                backgroundColor: 'rgba(222, 222, 218, 0.70)',
                                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
                                elevation: 5,
                                ...styles.center,
                            }}>
                                <LockSvg width={24} height={24} />
                                <Text
                                    style={{
                                        color: '#313131',
                                        fontSize: 24,
                                        fontWeight: '700',
                                    }}
                                >06/05/2023</Text>
                            </View>
                        </View>


                    </View>

                    <View
                        style={{
                            marginVertical: 20,
                            // width:'100%',
                            ...styles.center
                        }}
                    >
                        <Text
                            style={{
                                color: '#FCEC97',
                                fontSize: 26,
                                fontWeight: 700,
                                marginBottom: 25

                            }}>WINNERS</Text>

                        <View
                            style={{
                                // backgroundColor: 'red',
                                width: '100%',
                                rowGap: 0.5,
                            }}
                        >

                            <View
                                style={{
                                    backgroundColor: 'rgba(37, 55, 107, 0.23)',
                                    height: 60,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <TouchableOpacity style={{
                                    ...styles.row,
                                    gap: 12,
                                    flex: 1
                                }}>
                                    <View
                                        style={{
                                            backgroundColor: '#495989',
                                            height: 40,
                                            aspectRatio: 1,
                                            borderRadius: 50,
                                            ...styles.center,
                                        }}
                                    >
                                        <AwardSvg />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#D9D9D9' }}>Tournament 1</Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    backgroundColor: 'rgba(37, 55, 107, 0.23)',
                                    height: 60,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <TouchableOpacity style={{
                                    ...styles.row,
                                    gap: 12,
                                    flex: 1
                                }}>
                                    <View
                                        style={{
                                            backgroundColor: '#495989',
                                            height: 40,
                                            aspectRatio: 1,
                                            borderRadius: 50,
                                            ...styles.center,
                                        }}
                                    >
                                        <AwardSvg />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#D9D9D9' }}>Tournament 1</Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    backgroundColor: 'rgba(37, 55, 107, 0.23)',
                                    height: 60,
                                    paddingHorizontal: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <TouchableOpacity style={{
                                    ...styles.row,
                                    gap: 12,
                                    flex: 1
                                }}>
                                    <View
                                        style={{
                                            backgroundColor: '#495989',
                                            height: 40,
                                            aspectRatio: 1,
                                            borderRadius: 50,
                                            ...styles.center,
                                        }}
                                    >
                                        <AwardSvg />
                                    </View>
                                    <Text style={{ fontSize: 15, color: '#D9D9D9' }}>Tournament 1</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>

                    <View
                        style={{
                            marginBottom: 20,
                            ...styles.center
                        }}
                    >
                        <Text
                            style={{
                                color: '#FCEC97',
                                fontSize: 26,
                                fontWeight: 700,
                                marginBottom: 20

                            }}>About Us</Text>
                        <View
                            style={{
                                borderRadius: 6,
                                border: '0.2px solid #FABE02',
                                backgroundColor: '#25376B',
                                width: '100%',
                                height: 180,
                                // padding: 35,
                                ...styles.center
                            }}
                        >
                            <ArrowRightSvg />
                        </View>
                    </View>

                </View>



                <View style={styles.footerContainer}>
                    <View style={styles.footerBox}>
                        <View style={styles.col}>
                            <Text style={styles.text3}>Tournaments</Text>
                            <Text style={styles.text3}>Lessons</Text>
                            <Text style={styles.text3}>Puzzles</Text>

                        </View>

                        <View style={styles.col}>
                            <Text style={styles.text3}>About Us</Text>
                            <Text style={styles.text3}>Wallet</Text>
                            <Text style={styles.text3}>Account</Text>
                        </View>

                        <View style={{ flex: 1, ...styles.col }}>
                            <View style={styles.row}>
                                <View
                                    style={{
                                        backgroundColor: '#000',
                                        height: 20,
                                        width: 30,
                                        ...styles.center,
                                    }}>
                                    <SearchSvg />
                                </View>
                                <TextInput
                                    style={{
                                        backgroundColor: '#D9D9D9',
                                        flex: 1,
                                        height: 18,
                                        color: '#000',
                                        padding: 2,
                                        fontSize: 10
                                    }}
                                />
                            </View>

                            <View style={{ gap: 5, ...styles.row }}>
                                <InstagramSvg />
                                <Text style={styles.text3}>chesstune07</Text>
                            </View>

                            <View style={{ gap: 5, ...styles.row }}>
                                <GlobalSvg />
                                <Text style={styles.text3}>chesstune.live</Text>
                            </View>
                        </View>
                    </View>

                </View>


            </ScrollView >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050A18',
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

    text2: {
        color: '#FFF',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
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
        borderColor: 'rgba(255, 170, 0, 0.38)',
    },

    ibox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 5
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },

    col: {
        // justifyContent: 'space-between',
        gap: 10,
    },

    text3: {
        color: '#FFF',
        textAlign: 'left',
        fontSize: 10,
    },

    footerContainer: {
        backgroundColor: '#1B2851',
        width: '100%',
        height: 180,
        justifyContent: 'center',
    },

    footerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
        padding: 30,
        borderColor: 'rgba(255, 215, 0, 0.25)',
        borderBottomWidth: 1
    }
});

export default HomeScreen;
