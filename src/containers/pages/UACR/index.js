import { addedResultUACR, getResultEGFRDB, StoreToDBEGFR } from '../../../config/redux/action';
import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import React, { Fragment, useEffect, useState } from 'react';
import BlueText from '../../../components/atoms/Bluetext';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';


const styles = StyleSheet.create({
    cardInformation: {
        width: "90%", alignSelf: "center",
        backgroundColor: "#C0D3F9", marginTop: 30, borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.4,
        shadowRadius: 3, elevation: 5, padding: 13
    },
    informationLayout: {
        width: "100%", flexDirection: "column", justifyContent: "space-between"
    },
    contentInformation: {
        fontWeight: "bold", textAlign: "justify", fontSize: 14, width: "100%", marginVertical:5, letterSpacing:0.5, textAlign:"justify",lineHeight:20
    },
    contentInformationTitle: {
        fontWeight: "bold", textAlign: "justify", fontSize: 16, width: "100%", marginVertical:5
    }
});


const UACR = (props) =>{ 

    const [UACR, setUACR] = useState('');
    const [resultEGFR, setResultEGFR] = useState('');
    const [diagnose, setDiagnose] = useState({interpretasi:'',saran:'',metode:''})

    useEffect(()=>{
        if(props.dataEGFR.UACR){
            setUACR(props.dataEGFR.UACR)
        }

        props.getResultEGFRDB(props.dataEGFR.EGFR).then((res) => {
            setDiagnose(res)
        }).catch((err) => {
            Alert.alert(err)
        })
    },[])

    const DiagnoseUACR = () => {

        if(UACR == ''){
            return  Alert.alert("Mohon lengkapi semua formulir.")
        }

        props.dataEGFR.UACR = UACR

        props.sendTempUACR(props,props.dataEGFR)
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
                    <Text style={styles.contentInformationTitle}>
                        Hasil Pemeriksaan :
                    </Text>
                    <Text style={styles.contentInformation}>
                        {diagnose.interpretasi.replace(/ +(?= )/g,'')}
                    </Text>
                    <Text style={styles.contentInformationTitle}>
                        Stadium : {props.dataEGFR.EGFR}
                    </Text>
                </View>


            <View style={styles.informationLayout}>
                    <Text style={styles.contentInformationTitle}>
                        Rekomendasi :
                    </Text>
                    <Text style={styles.contentInformation}>
                        {diagnose.saran.replace(/ +(?= )/g,'')}
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
     getResultEGFRDB: (data) => dispatch(getResultEGFRDB(data)),
})

export default connect(reduxState,reduxDispatch)(UACR);

