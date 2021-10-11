import React from 'react';
import { Fragment } from 'react';
import { Text, TouchableOpacity , StyleSheet, Image  } from 'react-native';

const styles = StyleSheet.create({
    btn: { backgroundColor:"#5589F0", padding:10, width:280, borderRadius:30, flexDirection:"row", justifyContent:"space-around"},
    txt : { color:"#FFFFFF", fontSize:18, textAlign:"center", marginTop:5 }
});

const ButtonIcon = ({title,onPress}) =>{
  
  let icon = <Image source={require('../../../assets/logo/google.png')}/>
  return (  
   <Fragment>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
              {icon}
              <Text style={styles.txt}>{title}</Text>
          </TouchableOpacity >
   </Fragment>
  ) 
}

export default ButtonIcon;

