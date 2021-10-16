import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import React,  { Fragment }  from 'react';
import { connect } from 'react-redux';

//load Page
import { SplashScreen, Login, Register, Dashboard ,Profile, News, Instruction, EGFR, eGEFRDiagnose, UACR, UACRDiagnose, History, Detail} from '../containers/pages'
import { Alert, BackHandler } from 'react-native';

const Stack = createNativeStackNavigator();

const Router = (props) =>{
  console.log(props)
  let count = 1;

  BackHandler.addEventListener(
    "hardwareBackPress",
    ()=>{
      if(count == 3){
          return Alert.alert(
            "Informasi",
            "Apakah anda yakin ingin menutup aplikasi ?",
            [
              {
                text: "Yes",
                onPress: () => {
                 return BackHandler.exitApp();
                }
              },
              {
                text: "Cancel",
                onPress: () => {
                 return count = 1
                },
                style: "cancel"
              },
            ]
        );             
      }else{
        return props.navState.navigation.push("Dashboard")
      }
      count += 1 
    }
  );
    return (
      <Fragment>
        <Spinner visible={props.isLoading}/>
        <Stack.Navigator>        
              <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} /> 
              <Stack.Screen name="Petunjuk" options={{headerShown: false}} component={Instruction}/>  
              <Stack.Screen name="Pendaftaran" options={{headerShown: false}} component={Register}/>  
              <Stack.Screen name="Dashboard" options={{headerShown: false}} component={Dashboard}/>
              <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile}/>   
              <Stack.Screen name="Berita" options={{headerShown: false}} component={News}/> 
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login}/>     
              <Stack.Screen name="eGFR" options={{headerShown: false}} component={EGFR}/>   
              <Stack.Screen name="UACR" options={{headerShown: false}} component={UACR}/>  
              <Stack.Screen name="eGFRDiagnose" options={{headerShown: false}} component={eGEFRDiagnose}/>  
              <Stack.Screen name="UACRDiagnose" options={{headerShown: false}} component={UACRDiagnose}/> 
              <Stack.Screen name="History" options={{headerShown: false}} component={History}/>  
              <Stack.Screen name="Detail" options={{headerShown: false}} component={Detail}/>  
        </Stack.Navigator>
      </Fragment>
    ) 
  
  }

const reduxState = (state) =>({
    isLoading : state.isLoading,
    navState : state.navState
})

export default connect(reduxState,null)(Router);