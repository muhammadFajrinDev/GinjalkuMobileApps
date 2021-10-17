import React from 'react';
import { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    card : { width:340,padding:15, height:330,
            backgroundColor:"#FFFFFF", marginHorizontal:10, borderRadius:12,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
            shadowRadius: 3, elevation: 5 },
    image : { width:310,height:230,borderRadius:12,alignSelf:"center" },
    title : { color:"#2A2B3D",height:37,marginTop:10,fontSize:17,fontWeight:"bold" },
    contDesc : { flexDirection:"row", justifyContent:"space-between", height:30 },
    description : { alignSelf:"center", color:"#B7B7B7" }
});

const CardNews = (props) =>{
  return (  
   <Fragment>
        <View style={styles.card}>
            <Image style={styles.image} source={{uri:"https://picsum.photos/500/700?random=" + Math.floor(Math.random() * 10)}} />
            <Text style={styles.title}>
                {props.title}
            </Text>
                <View style={styles.contDesc}>
                    <Text style={styles.description}>{props.author}</Text>
                    <Text style={styles.description}>{props.time}</Text>
                </View>
        </View>
   </Fragment> 
  ) 
}

export default CardNews;

