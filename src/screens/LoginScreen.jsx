import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { addToCollection } from '../firebase/Firebase';


const LoginScreen = () => {

  GoogleSignin.configure({
    webClientId: "677052425653-0k2g235qpkvumthuu79vvap1qja1blcc.apps.googleusercontent.com",
  });

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  useEffect(() => {
    // console.log(firestore)
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log(user)
    });
    return subscriber; // unsubscribe on unmount
  }, []);




  const SingInWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userInfo = await auth().signInWithCredential(googleCredential);

    const { isNewUser, profile } = userInfo.additionalUserInfo;
    const { name, email } = profile
    console.log({ isNewUser, email, name, });

    if (isNewUser) {
      try {
        await addToCollection("users", { email, name });
      } catch (error) {
        console.log(error)
      }
    }

  };


  const login_result = async () => {

    try {
      addToCollection("users", { email, password });

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <View style={styles.container}>


      <View style={{ alignItems: 'center', zIndex: 2, }} >
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


      <View style={{ alignItems: 'center', zIndex: 1 }} >
        <View style={styles.detail_box}>

          <Text style={styles.signup}>SIGN IN</Text>


          <View style={styles.input_box}>

            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              // placeholder="Enter your email"
              value={email}
              onChangeText={Text => { setEmail(Text) }}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              // placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={Text => { setPassword(Text) }}
            />

            <TouchableOpacity style={styles.Submit_button}

              onPress={login_result}
            >
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>






          <View style={styles.input_bottom}>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={SingInWithGoogle}
            >
              <Image
                style={styles.input_logo}
                source={require('../assets/google.png')}
              />

              <Text style={styles.sign_text}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => auth().signOut()}
            >
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
    height: 470,
    backgroundColor: '#091b31',
    zIndex: 1,
    borderRadius: 9

  },
  logo_box: {
    width: 73,
    height: 72,
    backgroundColor: '#1e5aa6',
    top: 40,
    zIndex: 2,
    borderRadius: 8
  },

  bottom_part: {
    marginBottom: 30,
    backgroundColor: '#f50fbf'
  },

  Submit_button: {

    width: 100,
    height: 40,
    backgroundColor: '#30365e',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#5e6670',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'flex-end'


  },
  submit: {
    fontSize: 16,
    color: '#ffffff',

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
    paddingHorizontal: 37

  },

  signup: {
    color: '#FFF',
    fontSize: 25,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 60,
    // fontFamily: 'Garamond',
    fontWeight: 700,
  },
  TouchableOpacity: {

    width: 214,
    height: 46,
    flexDirection: 'row',
    backgroundColor: 'rgba(179, 199, 255, 0.20)',

    borderWidth: 1,
    borderColor: '#3d3933',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    gap: 15
  },


  input_bottom: {
    marginTop: 40,
    alignItems: 'center',
    gap: 15
  },

  input_logo: {
    width: 24,
    height: 24,

  },
  sign_text: {
    fontSize: 15,
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
