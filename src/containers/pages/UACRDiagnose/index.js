import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import { StoreToDBEGFR } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    cardInformation: {
        height:210, width:"90%", alignSelf:"center", 
        backgroundColor:"#C0D3F9", marginTop:30, borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
        shadowRadius: 3, elevation: 5, padding: 13
    },
    informationLayout : { 
        width:"100%", flexDirection:"column",marginVertical:15, justifyContent:"space-between" 
    },
    contentInformation : {
        fontWeight:"bold",textAlign:"justify", fontSize :14, width:220
    }
});

const UACRDiagnose = (props) =>{

    const [resultEGFR, setResultEGFR] = useState(null)

    let EGFReducer = props.dataEGFR;

    const uacr_interpretation = (gfr, uacr) =>{
        if(uacr < 3){
            if(gfr == "G1" || gfr == "G2"){
                risk = "Low Risk";
            }else if(gfr == "G3a"){
                risk = "Moderate Risk";
            }else if(gfr == "G3b"){
                risk = "High Risk";
            }else{
                risk = "Very High Risk"
            }
        }else if ( uacr < 29 ){
            if(gfr == "G1" || gfr == "G2"){
                risk = "Moderate Risk";
            }else if(gfr == "G3a"){
                risk = "High Risk";
            }else{
                risk = "Very High Risk"
            }
        }else{
            if(gfr == "G1" || gfr == "G2"){
                risk = "High Risk";
            }else{
                risk = "Very High Risk"
            }
        }

        return risk;
    }

    const SaveCheck = () => {

        if(!props.isLogin){
            Alert.alert(
                "Informasi",
                "Anda harus login terlebih dahulu untuk menyimpan hasil cek anda ",
                [
                  {
                    text: "Login",
                    onPress: () => {
                        return props.navigation.push("Login")
                    }
                  },
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                ]
            );
        }else{
            Alert.alert(
                "Konfirmasi",
                "Apakah anda yakin ?",
                [
                {
                    text: "Ya",
                    onPress: () => {
                        //store to DB
                        props.saveToDBEGFR(props,EGFReducer)
                    }
                },
                {
                    text: "Tidak",
                    onPress: () => {},
                    style: "cancel"
                },
                ]
            );
        }
    }

 
    useEffect(()=>{
        let resultEGFR = uacr_interpretation(EGFReducer.EGFR, EGFReducer.UACR)
        setResultEGFR(resultEGFR)
    },[])

  return (  
     <Fragment>
         <HeaderBackBtn page="UACR" navigation={props.navigation} title="Diagnosis UACR"/>
         
         <View style={styles.cardInformation}>

            <View style={styles.informationLayout}>
                <Text style={styles.contentInformation}>
                    Hasil Pemeriksaan :
                </Text>
                <Text style={styles.contentInformation}>
                    {resultEGFR}
                </Text>
            </View>

            
            <View style={styles.informationLayout}>
                <Text style={styles.contentInformation}>
                    Rekomendasi :
                </Text>
                <Text style={styles.contentInformation}>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                </Text>
            </View>

        </View>
        <View style={{width:"70%", alignSelf:"center", marginVertical:25}}>
            <ButtonClassic title="Simpan Riwayat" onPress={()=> SaveCheck()} />
        </View>

     </Fragment>
  ) 
}


const reduxState = (state) =>({
    dataEGFR : state.dataEGFR,
    isLogin : state.isLogin
})

const reduxDispatch = (dispatch) => ({
    saveToDBEGFR : (props,data) => dispatch(StoreToDBEGFR(props,data)),
})

export default connect(reduxState,reduxDispatch)(UACRDiagnose);

