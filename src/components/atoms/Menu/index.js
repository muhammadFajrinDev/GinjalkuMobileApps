import HeaderDashboard from '../../../components/atoms/Header/header-dashboard';
import { Linking, Image, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import assignment from '../../../assets/thumb/assignment.png';
import error from '../../../assets/thumb/error_outline.png';
import Fasility from '../../../assets/thumb/facility.png';
import Call from '../../../assets/thumb/callcenter.png';

const Menu = (props) =>{

    const styles = StyleSheet.create({
        card : { width:"90%",alignSelf:"center", position:"absolute", top:100,
                    height:"17%", backgroundColor:"#FFFFFF", shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
                    shadowRadius: 3, elevation: 10, borderRadius: 12, padding:20,
                    flexDirection:"column", justifyContent:"space-between" },

        row : { flexDirection:"row",justifyContent:"space-between", height:"35%" },
        img : { width:30,height:30,alignSelf:"center" },
        col : { width:"45%",flexDirection:"row" },
        txt : { fontWeight:"bold",color:"#000000",marginHorizontal:10, textAlignVertical:"center" }
      });

    const GoWa = () => {
        Linking.openURL('whatsapp://send?text=Hallo Customer Services&phone=6281365258069').then().catch((Error)=>{
            Alert.alert(Error)
        });
    }
  return ( 
    <Fragment> 
        <View style={styles.card}>

            <View style={styles.row}>
                <TouchableOpacity style={styles.col}>
                    <Image source={Fasility} style={styles.img}/>
                    <Text style={styles.txt}>Fasilitas Kesehatan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.col} onPress={() => GoWa()}>
                    <Image source={Call} style={styles.img}/>
                    <Text style={styles.txt}>Hubungi Kami</Text>
                </TouchableOpacity>
            </View>   
            <View style={styles.row}>
                <TouchableOpacity style={styles.col} onPress={() => props.MenuRedirect.navigation.push("Petunjuk")}>
                    <Image source={assignment} style={styles.img}/>
                    <Text style={styles.txt}>Petunjuk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.col}>
                    <Image source={error} style={styles.img}/>
                    <Text style={styles.txt}>Tentang</Text>
                </TouchableOpacity>
            </View>               
        </View>
    </Fragment>
  ) 
}

export default connect(null,null)(Menu);

