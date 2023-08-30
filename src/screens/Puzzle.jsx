import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native';
import ChessGame from '../components/Chess/Chess';



const Puzzle = () => {

    const {params} = useRoute();

    // const [game, setGame] = useState();

    // useEffect(() => {
    //     // Run any necessary initialization code here
    //     // const game = new Chess()

    //     const chessAPI = new ChessWebAPI();
    //     chessAPI.getDailyPuzzleRandom().then(a => {
    //         // console.log(a)
    //         let game = new Chess(a.body.fen)
    //         // console.log(game.board())
    //         console.log(a)
    //         // console.log(game.fen())
    //     });
    // }, []);


    const chessRef = useRef()

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />

                <View
                    style={{
                        width: 280,
                        height: 60,
                        ...styles.box,
                        marginBottom: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#fff'
                        }}
                    >LEVEL: {params?.level}</Text>
                </View>


                {/* Chess board */}

                <View
                    paddingHorizontal={15}
                >
                    <View
                        ref={chessRef}
                        style={{
                            // backgroundColor: 'red',
                            width: '100%',
                            // aspectRatio: 1
                        }}
                    >
                        <ChessGame level={params?.level}/>
                    </View>

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