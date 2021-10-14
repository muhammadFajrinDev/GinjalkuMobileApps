import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import logoSplash from '../../../assets/logo/splash.png';
import { Image, Text, View,StyleSheet, Alert  } from 'react-native';
import { CheckUser, getData } from '../../../config/redux/action';

const styles = StyleSheet.create({
  background :{width:"100%",height:"100%",backgroundColor:"#FBFBFB",
  flexDirection:"column", justifyContent:"center"
},
  imgCenter : { width: "80%", alignSelf:"center"}
});

const SplashScreen = (props) =>{

      useEffect(()=>{
        setTimeout(()=>{
              props.CheckUser(props)
        },1000)
      },[])

  return (  
   <View style={styles.background}>
    <Image
        style={styles.imgCenter}
        source={logoSplash}
      />
   </View>
  ) 
}

const reduxDispatch = (dispatch) => ({
  CheckUser : (props) => dispatch(CheckUser(props)),
})


export default connect(null,reduxDispatch)(SplashScreen);
