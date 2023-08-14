import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Live_chess = () => {
    return (
        <View style={styles.Live_chess_container} >

            <Header />
            <View style={styles.Live_chess}>
                <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: 700, paddingVertical: 10 }}>LIVE CHESS</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity style={styles.type_box}>
                    <View>
                        <Image
                            style={{}}
                            source={require('../assets/profile.png')}
                        />
                    </View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 400, paddingHorizontal: 30 }} >1 V 1</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={styles.type_box}>
                    <View>
                        <Image
                            style={{}}
                            source={require('../assets/profile.png')}
                        />
                    </View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 400, paddingHorizontal: 20 }} >Play With Computer</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.type_box}>
                    <View>
                        <Image
                            style={{}}
                            source={require('../assets/profile.png')}
                        />
                    </View>
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 400, paddingHorizontal: 30 }} >Fantastic Game</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

styles = StyleSheet.create({
    Live_chess_container: {
        flex: 1,
        backgroundColor: '#061220'
    },

    Live_chess: {
        width: 302,
        // borderWidth:2,
        borderColor: '#E1C76C',
        borderBottomWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',


    },

    type_box: {
        flexDirection: 'row',
        alignItems: 'center',

        width: 265,
        height: 63,
        borderWidth: 1.5,
        paddingHorizontal: 40,
        borderColor: '#E1C76C',
        marginTop: 20,
        borderRadius: 8
    }

})

export default Live_chess