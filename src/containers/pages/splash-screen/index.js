import React from 'react';
import { Image, Text, View,StyleSheet  } from 'react-native';
import logoSplash from '../../../assets/logo/splash.png';

const styles = StyleSheet.create({
  background :{width:"100%",height:"100%",backgroundColor:"#FBFBFB",
  flexDirection:"column", justifyContent:"center"
},
  imgCenter : { width: "80%", alignSelf:"center"}
});

const SplashScreen = ({navigation}) =>{

     //splash Screen 
      setTimeout(()=>{
        navigation.navigate('Login')
      },3000)

  return (  
   <View style={styles.background}>
    <Image
        style={styles.imgCenter}
        source={logoSplash}
      />
   </View>
  ) 
}

export default SplashScreen;
