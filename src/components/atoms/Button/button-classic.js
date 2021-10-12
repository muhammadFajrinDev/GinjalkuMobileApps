import React from 'react';
import { Fragment } from 'react';
import { Text, TouchableOpacity, StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
    btn: { backgroundColor:"#5589F0", padding:10, borderRadius:30, flexDirection:"row", justifyContent:"space-around"},
    txt : { color:"#FFFFFF", fontSize:16, fontWeight:"bold", textAlign:"center" ,}
});

const ButtonClassic = (props) =>{
  return (  
    <Fragment>
          <TouchableOpacity style={styles.btn} onPress={props.onPress}>
              <Text style={styles.txt}>{props.title}</Text>
          </TouchableOpacity>
    </Fragment>
  ) 
}

export default ButtonClassic;

