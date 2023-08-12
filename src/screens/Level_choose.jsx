import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import Header from '../components/Header';

const Level_choose = () => {

    const navigation = useNavigation();

    const handleClick = (level) => {
        navigation.navigate('Puzzle', { level: level })    // { level: level } is the data we are passing to the next screen

    }



    return (
        <View style={styles.Level_container}>

            <Header/>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.Top_logo}>LEVEL</Text>
            </View>

            <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={styles.Level_typeBox}  onPress={()=>handleClick(1)}>

                    <Text style={styles.Level}>Easy</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.Level_typeBox} onPress={()=>handleClick(2)}>

                    <Text style={styles.Level}>Medium</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.Level_typeBox} onPress={()=>handleClick(3)}>

                    <Text style={styles.Level}>Expert</Text>

                </TouchableOpacity>

            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.demo}>DEMO PUZZLE</Text>
            </View>


            <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={styles.plate_box} >
                    <Image

                        style={{
                            width: 218,
                            height: 218,
                            borderRadius: 2
                        }}

                        source={require('../assets/plate.png')}

                    />

                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Level_container: {
        flex: 1,
        backgroundColor: '#061220'
    },


    Top_logo: {
        color: '#FFF',
        fontSize: 22,
        // fontFamily: 'Garamond',
        fontWeight: 700,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 10

    },

    Level_typeBox: {
        width: 275,
        height: 60,
        backgroundColor: 'rgba(37, 55, 107, 0.23)',
        marginTop: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2b2b30',
        alignItems: 'center',
        justifyContent: 'center'

    },
    Level: {

        color: '#FFF',
        // fontFamily: 'Garamond',
        fontSize: 18,
        fontWeight: 600,

    },

    plate_box: {
        width: 256,
        height: 256,
        backgroundColor: '#3C5294',
        padding: 20,
        marginTop: 20,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#FFD700'
    },
    demo: {
        color: '#FFF',
        // fontFamily: 'Garamond',
        fontSize: 16,
        fontWeight: 400,
        marginTop: 60

    }
})

export default Level_choose