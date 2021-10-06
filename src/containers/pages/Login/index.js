import React from 'react';
import { Image, Text, View,StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
  background :{width:"100%",height:"100%",backgroundColor:"#FBFBFB",
  flexDirection:"column", justifyContent:"center"
},
});

const Login = () =>{
  return (  
   <View style={styles.background}>
       <Text>login</Text>
   </View>
  ) 
}

export default Login;
