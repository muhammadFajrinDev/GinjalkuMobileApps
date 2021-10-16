import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import { addedResult, StoreToDBEGFR } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import Backspace from '../../../assets/thumb/backspace.png';
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

// LOGICAL eGFR & UACR
const K_MALE_COEFFICIENT = 0.9, K_FEMALE_COEFFICIENT = 0.7; 
const ALPHA_MALE_COEFFICIENT = -0.411, ALPHA_FEMALE_COEFFICIENT = -0.329;
const FEMALE_COEFFICIENT = 1.018, AFRICAN_COEFFICIENT = 1.159;

const base_egfr = (serum_creatinine, gender, age) => {
    var result_egfr, scr_k;

    if(gender == "Male"){
       var scr_k = serum_creatinine / K_MALE_COEFFICIENT;
       result_egfr = 141 * ((Math.min(scr_k, 1)**ALPHA_MALE_COEFFICIENT) * (Math.max(scr_k, 1)**-1.209)) * (0.993**age)
       return result_egfr
    }

    scr_k = serum_creatinine/K_FEMALE_COEFFICIENT
  return (141 * ((Math.min(scr_k, 1)**ALPHA_FEMALE_COEFFICIENT) * (Math.max(scr_k, 1)**-1.209)) * (0.993**age)) * FEMALE_COEFFICIENT
}

const calculate_egfr = (serum_creatinine, gender, age, race) =>{
    let base = base_egfr(serum_creatinine, gender, age);

    if(race == "African"){
     
        return base * AFRICAN_COEFFICIENT
    }

    return base * AFRICAN_COEFFICIENT
}

const gfr_interpretation = (gfr) => {
    let status; 

    if (gfr >= 90){
        status = "G1"
    }else if(gfr >= 60){
        status = "G2"
    }else if(gfr >= 45){
        status = "G3a"
    }else if(gfr >= 30){
        status = "G3b"
    }else if(gfr >= 15){
        status = "G4"
    }else{
        status = "G5"
    }

    return status;
}


const DiagnoseEGFR = (props) =>{

    const [resultEGFR, setResultEGFR] = useState(null)
  
    let EGFReducer = props.dataEGFR;

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
            
            EGFReducer.EGFR = resultEGFR
    
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

    const toUACR = () =>{

        EGFReducer.EGFR = resultEGFR

        props.sendToUACR(props,EGFReducer)
    }
    
    useEffect(()=>{
        let resultEGFR = gfr_interpretation(calculate_egfr(EGFReducer.creatinine, EGFReducer.gender, EGFReducer.age, EGFReducer.race))
        console.log("+++ calculate EGFR",calculate_egfr(EGFReducer.creatinine, EGFReducer.gender, EGFReducer.age, EGFReducer.race))

        setResultEGFR(resultEGFR)
    },[])

  return (  
     <Fragment>
        
         <HeaderBackBtn page="eGFR" navigation={props.navigation} title="Diagnosis eGFR"/>
         
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
                 
                </Text>
            </View>

        </View>
        <View style={{width:"70%", alignSelf:"center", marginVertical:25}}>
            <ButtonClassic title="Simpan Riwayat" onPress={()=> SaveCheck()} />
        </View>

        <View style={{width:"70%", alignSelf:"center", }}>
            <TouchableOpacity onPress={()=> toUACR()}>
                <View style={{ padding:10, borderRadius:30 ,
                    flexDirection:"row",justifyContent:"center",
                    backgroundColor:"#FBFBFB", shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity:  0.4,
                    shadowRadius: 3,
                    elevation: 10,}}>
                    <Text style={{fontSize:16, fontWeight:"bold", color:"#5589F0"}}>Lengkapi UACR </Text>
                    <Image source={Backspace}/>
                </View>
            </TouchableOpacity>
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
    sendToUACR : (props,data) => dispatch(addedResult(props,data)),
})

export default connect(reduxState,reduxDispatch)(DiagnoseEGFR);

