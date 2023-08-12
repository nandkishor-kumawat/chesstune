import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'


const About = () => {
  return (
    <View style={styles.About_container}>

      <Header />

      <View style={styles.top_logo_conatiner}>
        <View style={styles.top_logo}>

          <Image
            style={{
              width:66,
              height:78,
              marginBottom:5
            }}
            source={require('../assets/logo.png')}
          />
        </View>
      </View>
      
       <Text style={{alignSelf:'center',color:'#ffffff',fontSize:18,fontWeight:400,marginTop:20}}>Tune UP Your Chess SKill With Us</Text>

        <Text style={{alignSelf:'center',color:'#ffffff',fontSize:34,fontWeight:400,marginTop:30,}}>About Us</Text>
     
     <View style={{alignItems:"center"}}>
      <View style={styles.About_Video}></View>
     </View>
      


    </View>
  )
}

const styles = StyleSheet.create({

  About_container: {
    flex: 1,
    backgroundColor: '#061220'
  },

  top_logo: {
    width: 90,
    height: 94,
    backgroundColor: '#1e5aa6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4e5663',
    borderRadius: 8,
  },
  top_logo_conatiner: {
    alignSelf: 'center'
  },
  About_Video:{
    width:300,
    height:190,
    backgroundColor:'#25376B',
    borderRadius:6,
    marginTop:10
  }

})
export default About