import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Menu = () => {
  return (
    <View style={styles.Menu_container}>
      <View style={{ top: 30 }}>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Daily Puzzle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Tounament</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Lession</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Community</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menu_box}>
          <TouchableOpacity>
            <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 700 }}>About Us</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Menu_container: {
    flex: 1,
    width: 230,
    backgroundColor: '#79808a',
    alignItems: 'center'

  },
  menu_box: {
    width: 190,
    borderBottomWidth: 2,
    paddingVertical: 15,
    borderColor: 'rgba(255, 215, 0, 0.45)',
    paddingHorizontal: 20,
    marginTop: 10


  }
})
export default Menu