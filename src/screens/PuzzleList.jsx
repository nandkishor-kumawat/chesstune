import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DummyBoard from '../components/DummyBoard';
import { getAllDocs } from '../firebase/Firebase';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

const PuzzleList = () => {

    const [puzzles, setPuzzles] = useState([]);

    useEffect(() => {
        getAllDocs('puzzle')
            .then(data => {
                setPuzzles(data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    if(puzzles.length==0){
        return <Text style={{padding:10}}>Loading puzzles...</Text>
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={styles.container}
            >
                <Text style={styles.title}>PuzzleList</Text>
                <View style={styles.puzzle}>
                    {puzzles && puzzles.map(puzzle => {
                        return (
                            <DummyBoard key={puzzle.id} puzzle={puzzle} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#050A18'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffff'
    },
    puzzle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 20,
        rowGap: 20
    }
})

export default PuzzleList