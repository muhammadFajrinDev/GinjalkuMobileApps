import { Text, View, StyleSheet } from 'react-native';
import { Fragment } from 'react';
import React from 'react';

const styles = StyleSheet.create({
    container : {flexDirection:"row",justifyContent:"space-around"},
    line : {width:"38%",height:3,backgroundColor:"#C4C4C4", alignSelf:"center"},
    text: {color:"#968C8C",fontWeight:"bold"}
});  

const Separator = () =>{
  return (  
   <Fragment>
          <View style={styles.container}>
            <View style={styles.line}/>
              <Text style={styles.text}>atau</Text>
            <View style={styles.line}/>
          </View>
   </Fragment>
  ) 
}

export default Separator;

