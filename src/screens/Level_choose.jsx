import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
const Level_choose = () => {

    const navigation = useNavigation();

    const handleClick = (level) => {
        navigation.navigate('chess2', { level: level })    // { level: level } is the data we are passing to the next screen

    }





    return (
        <View style={styles.Level_container}>

            <View style={styles.level_top}>
                <Image
                    style={{
                        width: 54,
                        height: 70,
                        marginTop: 5,
                        marginLeft: 14
                    }}

                    source={require('../assets/logo.png')}

                />


                <TouchableOpacity >

                    

                    <Image
                        style={{
                            width: 25,
                            height: 25,
                            top: 27,
                            marginLeft: 230
                        }}

                        source={require('../assets/menu.png')}

                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image
                        style={{
                            width: 22,
                            height: 24,
                            top: 27,
                            marginLeft: 20
                        }}

                        source={require('../assets/google.png')}

                    />

                </TouchableOpacity>
            </View>


            <Text style={styles.Top_logo}>LEVEL</Text>


            <View style={styles.Level_type}>

                <TouchableOpacity style={styles.Level_typeBox} onPress={()=>handleClick(1)}>

                    <Text style={styles.Level}>Easy</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.Level_typeBox} onPress={()=>handleClick(2)}>

                    <Text style={styles.Level}>Medium</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.Level_typeBox} onPress={()=>handleClick(3)}>

                    <Text style={styles.Level}>Expert</Text>

                </TouchableOpacity>



            </View>

            <Text style={styles.demo}>DEMO PUZZLE</Text>

            <TouchableOpacity style={styles.plate_box} onPress={()=>{alert("your opacity is working")}}>

                <Image

                    style={{
                        width: 218,
                        height: 218,
                        borderRadius: 2
                    }}

                    source={require('../assets/chessboard.png')}

                />

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    Level_container: {
        height: 844,
        width: 390,
        backgroundColor: '#061220'
    },
    level_top: {

        flex: 1,
        flexDirection: 'row',
        height: 50
    },

    Top_logo: {
        color: '#FFF',
        fontSize: 22,
        // fontFamily: 'Garamond',
        fontWeight: 700,
        marginTop: 50,
        marginLeft: 158,
        width: 74,
        height: 25,
        marginBottom: 10

    },

    Level_typeBox: {
        width: 275,
        height: 60,
        backgroundColor: 'rgba(37, 55, 107, 0.23)',
        marginTop: 10,
        marginLeft: 58,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2b2b30',


    },
    Level: {
        width: 52,
        height: 18,
        color: '#FFF',
        // fontFamily: 'Garamond',
        fontSize: 16,
        fontWeight: 400,
        margin: 'auto',


    },
    plate_box: {
        width: 256,
        height: 256,
        backgroundColor: '#3C5294',
        padding: 20,
        // paddingTop:20,
        marginLeft: 67,
        marginTop: 20,
        marginBottom: 120,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#FFD700'
    },
    demo: {
        color: '#FFF',
        // fontFamily: 'Garamond',
        fontSize: 16,
        fontWeight: 400,
        width: 115,
        height: 18,
        marginLeft: 135,
        marginTop: 60

    }
})

export default Level_choose