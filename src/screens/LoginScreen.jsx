import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'



// import Linear_gradiant from './Linear_gradiant'




const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const login_result = () => {
    console.log(email, password)
  }


  return (
    <View style={styles.container}>
   

   <View style={{alignItems:'center',zIndex:2}} >
      <View style={styles.logo_box}>
        <Image
          style={{

            width: 53,
            height: 60,
            zIndex: 1,
            marginLeft: 10
          }}

          source={require('../assets/logo.png')
          }
        />

      </View>
      </View>

      
      <View style={{alignItems:'center',zIndex:1}} >
        <View style={styles.detail_box}>

          <Text style={styles.signup}>SIGN IN</Text>


          <View style={styles.input_box}>

            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              // placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              // placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

        {/* </View> */}

      
      <Text style={styles.Or_logo}>OR</Text>

      <View style={styles.input_bottom}>
        <TouchableOpacity style={styles.TouchableOpacity}>
          <Image
            style={styles.input_logo}
            source={require('../assets/google.png')}
          />

          <Text style={styles.sign_text}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.TouchableOpacity}>
          <Image
            style={styles.input_logo}
            source={require('../assets/google.png')}
          />

          <Text style={styles.sign_text}>Sign up with Liches</Text>
        </TouchableOpacity>


      </View>
    </View>
 </View>





  <Image
    style={{
      width: 360,
      height: 215,
     
    }}
    source={require('../assets/chess2.png')
    }
  />


      </View >

      )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#061220'
  },

  detail_box: {
    width: 338,
    height: 443,
    top: 20,

    backgroundColor: '#091b31',
    zIndex: 1,
    borderRadius: 9

  },
  logo_box: {
    width: 73,
    height: 72,
    backgroundColor: '#1e5aa6',
    top: 60,
    zIndex: 2,
    borderRadius: 8
  },

  bottom_part: {
    marginBottom: 30,
    backgroundColor: '#f50fbf'
  },



  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    fontSize: 16,
    paddingVertical: 1,
    color: '#fcfcfc'

  },


  label: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 0,
    color: '#fcfcfc'
  },

  input_box: {
    marginTop: 10,
    paddingHorizontal:37
    
  },

  signup: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
    justifyContent:'center',
    marginTop: 60,
    // fontFamily: 'Garamond',
    fontWeight: 700,
  },
  TouchableOpacity: {
    
    width: 214,
    height: 46,
    flexDirection: 'row',
    backgroundColor: 'rgba(179, 199, 255, 0.20)',
    padding: 10,
    borderWidth:1,
    borderColor:'#3d3933',
    alignItems:'center',
    paddingHorizontal:25,
    borderRadius:5,
    gap:20
  },


  input_bottom: {
    marginTop:20,
    alignItems: 'center',
    gap:15
  },

  input_logo: {
    width: 24,
    height: 24,
   
  },
  sign_text: {
    fontSize: 12,
    fontWeight: 400,
   
    color: '#ffffff'
  },
  Or_logo: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
    // fontFamily: 'Garamond',
    fontWeight: 700,
    marginTop: 20
  }


})

export default LoginScreen
