import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native'
import React, { useState } from 'react'

const Logout = () => {

  const [email, setEmail] = useState("")
  return (
    <View style={styles.logout_container}>

      <View style={styles.top_logo}>
        <View>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: 55,
              height: 71,
              // marginTop: 6
            }}
          />

        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, gap: 10 }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/menu.png')}
              style={{
                width: 26,
                height: 26,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image

              source={require('../assets/profile.png')}
              style={{
                width: 24,
                height: 24,

              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: 'center', zIndex: 2 }}>
        <View style={styles.top_box}>
          <Image
            style={{ width: 53, height: 60 }}
            source={require('../assets/logo.png')}

          />
        </View>
      </View>




      <View style={{ alignItems: 'center', zIndex: 1 }}>
        <View style={styles.lower_box}>


          <View style={{
         
         paddingHorizontal:30



          }}>
            <View style={styles.input}>

              <Text style={styles.Email}>Email : </Text>

              <TextInput
                style={styles.input_email}
                // placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />

            </View>

            <View style={styles.coine}>


              <View>
                <Image
                  style={{
                    width: 24,
                    height: 24

                  }}
                  source={require('../assets/profile.png')}
                />
              </View>

              <View>
                <Text style={{ color: "#FFF",  fontWeight: 400, fontSize: 16 }}>Coins Earned</Text>
                <Text style={{ color: "#d0d9d2", fontWeight: 300, fontSize: 14, alignItems: "center", marginBottom: 40}}>xx credits</Text>
              </View>
            </View>


          </View>
        </View>


      </View>

<View style={{alignItems:'center'}}>
      <TouchableOpacity style={styles.logout}>
        <Text style={styles.log_text}>Logout</Text>
      </TouchableOpacity>
</View>

      <Image
        style={{
          width: 390,
          height: 215,
          // marginBottom: 75
        }}

        source={require('../assets/chess2.png')}

      />

    </View>
  )
}
const styles = StyleSheet.create({
  logout_container: {
    flex: 1,
    // backgroundColor: '#061220'
    backgroundColor:'#061220'
  },

  top_logo: {

    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,

    alignItems: 'center',
    justifyContent: 'space-between'
  },

  top_box: {
    width: 73,
    height: 73,
    backgroundColor: '#1e5aa6',
    zIndex: 2,
    justifyContent: 'center',
    borderRadius: 9,
    alignItems: 'center',
    paddingBottom: 8,
    justifyContent: 'center',
    top:75
  },

  lower_box: {
    width: 320,
    height: 198,
    backgroundColor: '#091b31',
    zIndex: 1,
    borderRadius: 9,
    marginTop:40
  },


  logout: {
    width: 240,
    backgroundColor: '#091b30',
    borderRadius: 5,
    borderColor: '#485e4e',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop:65
  },
  log_text: {
    // marginTop:16,
    color: 'rgba(255, 255, 255, 0.80)',
    // fontFamily:'Garamond',
    fontWeight: 400,
    fontSize: 16,
  },
  input: {

    flexDirection: 'row',
    alignItems:'center',
    top: 60,
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  input_email: {
    width: 194,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    color: '#fcfcfc'
    // height:
  },

  Email: {
    fontSize: 16,
    fontWeight: 400,
    color: '#FFF'

  },

  coine: {
    flexDirection:'row',
    marginTop: 80,
    gap:10
  }

})

export default Logout