import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import { addedResultUACR, StoreToDBEGFR } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import BlueText from '../../../components/atoms/Bluetext';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { statusCodes } from '@react-native-google-signin/google-signin';

const styles = StyleSheet.create({
    cardInformation: {
        height:190, width:"90%", alignSelf:"center", 
        backgroundColor:"#C0D3F9", marginTop:10, borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
        shadowRadius: 3, elevation: 5, padding: 15
    },
    informationLayout : { 
        width:"100%",  flexDirection:"column",marginVertical:13, justifyContent:"space-between" 
    },
    contentInformation : {
        fontWeight:"bold",textAlign:"justify", fontSize :14,width:220
    }
});


const UACR = (props) =>{ 

    const [UACR, setUACR] = useState('');
    const [resultEGFR, setResultEGFR] = useState('');

    useEffect(()=>{
        if(props.dataEGFR.UACR){
            setUACR(props.dataEGFR.UACR)
        }
    },[])

    const DiagnoseUACR = () => {

        if(UACR == ''){
            return  Alert.alert("Mohon lengkapi semua formulir.")
        }

        props.dataEGFR.UACR = UACR

        props.sendTempUACR(props,props.dataEGFR)
    }

    const SaveCheck = () => {
        console.log("islogin : ",props.isLogin)
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
                        props.saveToDBEGFR(props,props.dataEGFR)
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
        setResultEGFR(props.dataEGFR)
    },[])
    console.log(resultEGFR)
  return (  
     <Fragment>
        <ScrollView> 
         <HeaderBackBtn page="eGFRDiagnose" navigation={props.navigation} title="Diagnosis eGFR"/>
         
         <View style={styles.cardInformation}>

            <View style={styles.informationLayout}>
                <Text style={styles.contentInformation}>
                    Hasil Pemeriksaan :
                </Text>
                <Text style={styles.contentInformation}>
                    Nilai eGFR anda {resultEGFR.resultEGFRCal} 
                </Text>
                <Text style={styles.contentInformation}>
                    Stadium {resultEGFR.EGFR}
                </Text>
            </View>

            
            <View style={styles.informationLayout}>
                <Text style={styles.contentInformation}>
                    Rekomendasi :
                </Text>
                <Text style={styles.contentInformation}>
                  
                </Text>
            </View>

        </View>
        <View style={{width:"80%", alignSelf:"center", marginVertical:20}}>
            <ButtonClassic title="Simpan Riwayat" onPress={()=> SaveCheck()} />
        </View>

        <View style={{width:"80%",alignSelf:"center"}}>
            <Text style={{fontSize:15, fontWeight:"bold"}}>Tambahan Data UACR</Text>
            
            <View style={{width:"60%", alignSelf:"center", marginVertical:10}}>
                <View style={styles.itemGroup}>
                    <BlueText title="UACR"/>
                </View>
                <View style={{margin:5}}>
                    <TextInputClassic value={UACR} keyboardType="numeric" onChangeText={(el)=>setUACR(el.trim())} title="mg/g"/>
                </View>
            </View>
        </View>

        <View style={{width:"80%", alignSelf:"center", marginVertical:15}}>
            <ButtonClassic title="Proses UACR" onPress={()=> DiagnoseUACR()} />
        </View>
    </ScrollView> 
     </Fragment>
  ) 
  }


const reduxState = (state) =>({
    dataEGFR : state.dataEGFR,
    isLogin : state.isLogin
})

const reduxDispatch = (dispatch) => ({
     saveToDBEGFR : (props,data) => dispatch(StoreToDBEGFR(props,data)),
     sendTempUACR : (props,data) => dispatch(addedResultUACR(props,data)),
})

export default connect(reduxState,reduxDispatch)(UACR);

