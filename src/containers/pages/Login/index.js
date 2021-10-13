import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import HeaderClassic from '../../../components/atoms/Header/header-classic';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import ButtonIcon from '../../../components/atoms/Button/button-icon';
import Separator from '../../../components/atoms/Separator';
import BlueText from '../../../components/atoms/Bluetext';

import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { SigninWithGoogle,SigninWithEmail, getData, CheckUser } from "../../../config/redux/action";

const Login = (props) =>{

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  getData("@user").then((res) => {
    if(res){
      props.CheckUser(props)
      props.navigation.push("Dashboard")
    }
  }).catch((err)=>{
    Alert.alert("Terjadi kesalahan otentikasi")
  });

  const HandleloginAPIWithGoogle = () =>{
    props.loginAPIWithGoogle(props)
  }

  const SubmitHandler = () =>{
    if(email == null || password == null){
     return Alert.alert("Email dan password wajib di isi")
  }
    return props.SigniAPIWithEmail({email,password},props)
  }

  return (  
   <View>
          {/* Header */}
          <HeaderClassic title="Login"/>

          {/* Body */}
          <View style={{alignSelf:"center",marginTop:40, marginBottom:20}}>
              <ButtonIcon title="Masuk dengan Google" onPress={HandleloginAPIWithGoogle}/> 
          </View>

          <Separator/>
          
          <View style={{alignSelf:"center", width:"70%", marginTop:20}}>
             <TextInputClassic title="Email" name="email" onChangeText={(el) => setEmail(el)}/>
          </View>

          <View style={{alignSelf:"center", width:"70%", marginVertical:7}}>
             <TextInputClassic title="Password" secureTextEntry={true} name="password" onChangeText={(el) => setPassword(el)}/>
          </View>

          <View style={{flexDirection:"row", justifyContent:"space-around",width:"80%", marginVertical:20, alignSelf:"center"}}>
              <BlueText title="Belum punya akun ?" onPress={()=> props.navigation.push('Pendaftaran')}/>
              <BlueText title="Lupa password ?"/>
          </View>
          
          <View style={{alignSelf:"center", width:"70%", marginVertical:20}}>
            <ButtonClassic title="Masuk" onPress={()=> SubmitHandler()} />
          </View>

          <View style={{alignItems:"center", marginVertical:20}}>
             <BlueText onPress={()=> props.navigation.push('Dashboard')} title="Lewati"/>
          </View>
   </View>
  ) 
}

const reduxDispatch = (dispatch) => ({
    loginAPIWithGoogle : (props) => dispatch(SigninWithGoogle(props)),
    SigniAPIWithEmail : (data,props) => dispatch(SigninWithEmail(data,props)),
    CheckUser : (props) => dispatch(CheckUser(props))
})

export default connect(null,reduxDispatch)(Login);

