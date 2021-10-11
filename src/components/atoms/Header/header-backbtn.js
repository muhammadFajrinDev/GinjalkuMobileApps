import React from 'react';
import { Fragment } from 'react';
import HeaderThumb from '../../../assets/thumb/header.png';
import BtnHead from '../../../assets/thumb/btnhead.png';
import { Text, View, StyleSheet, ImageBackground, Image, TouchableHighlight  } from 'react-native';

const styles = StyleSheet.create({
  ImgBackground :{ width: "100%", height:165 },
  containerText: { alignItems:"center", flexDirection:"row", justifyContent:"center", height:120 },
  headerTitle : { fontSize:24, fontWeight:"bold", color:"#FFFFFF"}
});

const HeaderBackBtn = (props) =>{
  return (  
   <Fragment>
            <ImageBackground source={HeaderThumb} style={styles.ImgBackground}>
              <View style={styles.containerText}> 
                  <TouchableHighlight onPress={()=> props.navigation.push(props.page)} style={{position:"absolute", left:"5%"}}>
                       <Image source={BtnHead} style={{width:35,height:35}}/>
                  </TouchableHighlight>
                  <Text style={styles.headerTitle}>{props.title}</Text>
              </View>
            </ImageBackground>
   </Fragment> 
  ) 
}

export default HeaderBackBtn;

