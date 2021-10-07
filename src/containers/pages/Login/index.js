import { Text, View, StyleSheet, ImageBackground, Image, TextInput  } from 'react-native';
import HeaderClassic from '../../../components/atoms/Header/header-classic';
import ButtonIcon from '../../../components/atoms/Button/button-icon';
import React from 'react';
import Separator from '../../../components/atoms/Separator';
import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import BlueText from '../../../components/atoms/Bluetext';
import ButtonClassic from '../../../components/atoms/Button/button-classic';

const styles = StyleSheet.create({
  ImgBackground :{ width: "100%", height:165 },
  containerText: { alignItems:"center", flexDirection:"row", justifyContent:"center", height:120 },
  headerTitle : { fontSize:28, fontWeight:"bold", color:"#FFFFFF" }
});

const Login = () =>{
  return (  
   <View>
          {/* Header */}
          <HeaderClassic title="Login"/>

          {/* Body */}
          <View style={{alignSelf:"center",marginTop:40, marginBottom:20}}>
              <ButtonIcon title="Masuk dengan Google"/> 
          </View>

          <Separator/>
          
          <View style={{alignSelf:"center", width:"70%", marginTop:20}}>
             <TextInputClassic title="Email"/>
          </View>

          <View style={{alignSelf:"center", width:"70%", marginVertical:7}}>
             <TextInputClassic title="Password"/>
          </View>

          <View style={{flexDirection:"row", justifyContent:"space-around",width:"80%", marginVertical:5, alignSelf:"center"}}>
              <BlueText title="Belum punya akun ?"/>
              <BlueText title="Lupa password ?"/>
          </View>
          
          <View style={{alignSelf:"center", width:"70%", marginVertical:20}}>
            <ButtonClassic title="Masuk dengan Email"/>
          </View>

          <View style={{alignItems:"center", marginVertical:20}}>
             <BlueText title="Lewati"/>
          </View>
   </View>
  ) 
}

export default Login;

