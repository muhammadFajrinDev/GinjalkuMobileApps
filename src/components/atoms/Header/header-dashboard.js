import React from 'react';
import { Fragment } from 'react';
import HeaderThumb from '../../../assets/thumb/header.png';
import ProfileLogo from '../../../assets/thumb/profile.png';

import { Text, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  ImgBackground :{ width: "100%", height:165 },
  containerText: { width:"85%",alignItems:"center", alignSelf:"center",flexDirection:"row", justifyContent:"space-between", height:120 },
  headerTitle : { fontSize:23, fontWeight:"bold", color:"#FFFFFF",textTransform:"capitalize" },
  headerLogo : { width:35,height:35 }
});

const HeaderDashboard = (props) =>{
  return (  
   <Fragment>
            <ImageBackground source={HeaderThumb} style={styles.ImgBackground}>
              <View style={styles.containerText}> 
                   <Text style={styles.headerTitle}>{props.title}</Text>
                   <TouchableOpacity style={{ position:"absolute",right:0,top:25 }} onPress={props.onPress}>
                        <Image source={ProfileLogo} style={styles.headerLogo}/>
                   </TouchableOpacity>
              </View>
            </ImageBackground>
   </Fragment> 
  ) 
}

export default HeaderDashboard;

