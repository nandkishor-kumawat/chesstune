import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Header'
import ChessBoard from '../components/ChessBoard'

const Puzzle = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />

                <View
                    style={{
                        width: 280,
                        height: 60,
                        ...styles.box
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#fff'
                        }}
                    >LEVEL: </Text>
                </View>


                {/* Chess board */}

                <View
                    paddingHorizontal={15}
                >
                    {/* <View
                    style={{
                        // backgroundColor:'red',
                        width: '100%',
                        aspectRatio: 1
                    }}
                    >

                    </View> */}
                    {/* <ChessBoard /> */}
                </View>


                <View
                    style={{
                        gap: 12,
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        marginVertical: 20
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            height: 60,
                            ...styles.box
                        }}
                    >
                        <Text></Text>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            height: 60,
                            ...styles.box
                        }}
                    >
                        <Text></Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingHorizontal: 20,
                        marginBottom: 200,
                        gap: 20,
                        marginTop: 35
                    }}
                >
                    <View
                        style={{
                            height: 180,
                            width: '100%',
                            ...styles.box,
                        }}
                    >
                    </View>
                    <View
                        style={{
                            height: 180,
                            width: '100%',
                            ...styles.box,
                        }}
                    >
                    </View>
                    <View
                        style={{
                            height: 180,
                            width: '100%',
                            ...styles.box,
                        }}
                    >
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050A18',
    },
    box: {
        borderRadius: 5,
        backgroundColor: 'rgba(37, 55, 107, 0.23)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})



export default Puzzle