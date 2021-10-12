import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,  {  Fragment, useState, useEffect }  from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

//load Page
import { SplashScreen, Login, Register, Dashboard ,Profile, News, Instruction, EGFR, eGEFRDiagnose, UACR, } from '../containers/pages'

const Stack = createNativeStackNavigator();

const Router = (props) =>{

    return (
      <Fragment>
        
        {/* Loading Overlay */}
        <Spinner visible={props.isLoading}/>

        <Stack.Navigator>        
              <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} /> 
              <Stack.Screen name="Petunjuk" options={{headerShown: false}} component={Instruction}/>  
              <Stack.Screen name="Pendaftaran" options={{headerShown: false}} component={Register}/>  
              <Stack.Screen name="Dashboard" options={{headerShown: false}} component={Dashboard}/>
              <Stack.Screen name="Profil" options={{headerShown: false}} component={Profile}/>   
              <Stack.Screen name="Berita" options={{headerShown: false}} component={News}/> 
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>     
              <Stack.Screen name="eGFR" options={{headerShown: false}} component={EGFR}/>   
              <Stack.Screen name="UACR" options={{headerShown: false}} component={UACR}/>  
              <Stack.Screen name="eGFRDiagnose" options={{headerShown: false}} component={eGEFRDiagnose}/>  
              {/* <Stack.Screen name="UACRDiagnose" options={{headerShown: false}} component={UACRDiagnose}/>   */}
        </Stack.Navigator>
      </Fragment>
    ) 
  
  }

const reduxState = (state) =>({
    isLoading : state.isLoading    
})
  
export default connect(reduxState,null)(Router);