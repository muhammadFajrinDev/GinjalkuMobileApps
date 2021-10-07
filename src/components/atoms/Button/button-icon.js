import React from 'react';
import { Fragment } from 'react';
import { Text, View, StyleSheet, Image  } from 'react-native';

const styles = StyleSheet.create({
    btn: { backgroundColor:"#5589F0", padding:10, width:280, borderRadius:30, flexDirection:"row", justifyContent:"space-around"},
    txt : { color:"#FFFFFF", fontSize:18, textAlign:"center", marginTop:2 }
});

const ButtonIcon = (props) =>{
  
  let icon = <Image source={require('../../../assets/logo/google.png')}/>

  return (  
   <Fragment>
          <View style={styles.btn}>
              {icon}
              <Text style={styles.txt}>{props.title}</Text>
          </View>
   </Fragment>
  ) 
}

export default ButtonIcon;

