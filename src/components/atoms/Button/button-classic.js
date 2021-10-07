import React from 'react';
import { Fragment } from 'react';
import { Text, View, StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
    btn: { backgroundColor:"#5589F0", padding:10, width:290, borderRadius:30, flexDirection:"row", justifyContent:"space-around"},
    txt : { color:"#FFFFFF", fontSize:18, textAlign:"center" }
});

const ButtonClassic = (props) =>{
  return (  
    <Fragment>
          <View style={styles.btn}>
              <Text style={styles.txt}>{props.title}</Text>
          </View>
    </Fragment>
  ) 
}

export default ButtonClassic;

