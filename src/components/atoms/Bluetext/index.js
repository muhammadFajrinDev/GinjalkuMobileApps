import { StyleSheet, Text, View } from 'react-native';
import { Fragment } from 'react';
import React from 'react';

const styles = StyleSheet.create({
    bluetext : {color:"#5589F0", fontWeight:"bold", fontSize:14}
});

const BlueText = (props) =>{
  return (  
   <Fragment>
       <Text style={styles.bluetext}>{props.title}</Text>
   </Fragment>
  ) 
}

export default BlueText;

