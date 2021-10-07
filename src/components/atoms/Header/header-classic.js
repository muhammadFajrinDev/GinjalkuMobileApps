import React from 'react';
import { Fragment } from 'react';
import HeaderThumb from '../../../assets/thumb/header.png';
import { Text, View, StyleSheet, ImageBackground  } from 'react-native';

const styles = StyleSheet.create({
  ImgBackground :{ width: "100%", height:165 },
  containerText: { alignItems:"center", flexDirection:"row", justifyContent:"center", height:120 },
  headerTitle : { fontSize:28, fontWeight:"bold", color:"#FFFFFF" }
});

const HeaderClassic = (props) =>{
  return (  
   <Fragment>
            <ImageBackground source={HeaderThumb} style={styles.ImgBackground}>
              <View style={styles.containerText}> 
                  <Text style={styles.headerTitle}>{props.title}</Text>
              </View>
            </ImageBackground>
   </Fragment>
  ) 
}

export default HeaderClassic;

