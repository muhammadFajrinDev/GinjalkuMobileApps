import React,  {  Fragment, useState }  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//load Page
import {SplashScreen,Login} from '../containers/pages'

const Stack = createNativeStackNavigator();

const Router = ({  }) =>{

    return (
        <Stack.Navigator>
              <Stack.Screen name="SplashScreen" options={{headerShown: false}} component={SplashScreen} /> 
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login} /> 
        </Stack.Navigator>
    ) 
  
  }
  
export default Router;