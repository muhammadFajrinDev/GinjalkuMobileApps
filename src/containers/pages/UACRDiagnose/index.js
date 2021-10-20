import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import { getResultUACRDB, StoreToDBEGFR } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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

const UACRDiagnose = (props) => {

    const [diagnose, setDiagnose] = useState({interpretasi:'',saran:'',metode:''})
    const [resultUACR, setResultEGFR] = useState(null)

    let EGFReducer = props.dataEGFR;


    const uacr_interpretation = (gfr, uacr) => {
        let risk;
      
        if (uacr < 3) {
            if (gfr == "G1" || gfr == "G2") {
                if (gfr == "G1") {
                    risk = "G1_A1"
                } else {
                    risk = "G2_A1"
                    
                }
            } else if (gfr == "G3a") {
                risk = "G3a_A1";
            } else if (gfr == "G3b") {
                risk = "G3b_A1";
            } else {
                risk = "G3b_A2"
            }
        } else if (uacr < 29) {
            if (gfr == "G1" || gfr == "G2") {
                if (gfr == "G1") {
                    risk = "G1_A2"
                } else {
                    risk = "G2_A2"
                }
            } else if (gfr == "G3a") {
                risk = "G3a_A2";
            } else {
                if(gfr == "G3a"){
                    risk = "G3a_A3";
                }
            }
        } else {
            if (gfr == "G1" || gfr == "G2") {
                if (gfr == "G1") {
                    risk = "G1_A3"
                } else {
                    risk = "G2_A3"
                }
            } else {
                if(gfr == "G4"){
                    risk = "G4_A1"
                }else if(gfr == "G5"){
                    risk ="G5_A1"
                }
            }
        }
   
        return risk;
    }

    const getRiskUACR = (uacrRes) =>{
        let risk;
        if(uacrRes == "G1_A1"){
            risk = "Risiko Rendah"
        }else if(uacrRes == "G1_A2"){
            risk = "Risiko Sedang"
        }else if(uacrRes == "G1_A3"){
            risk = "Risiko Tinggi"
        }else if(uacrRes == "G2_A1"){
            risk = "Risiko Rendah"
        }else if(uacrRes == "G2_A2"){
            risk = "Risiko Sedang"
        }else if(uacrRes == "G2_A3"){
            risk = "Risiko Tinggi"
        }else if(uacrRes == "G3a_A1"){
            risk = "Risiko Sedang"
        }else if(uacrRes == "G3a_A2"){
            risk = "Risiko Tinggi"
        }else if(uacrRes == "G3a_A3"){
            risk = "Risiko Sangat Tinggi"
        }else if(uacrRes == "G4_A1" || uacrRes == "G5_A1"){
            risk = "Risiko Sangat Tinggi"
        }
        return risk;
    }

    const SaveCheck = () => {

        if (!props.isLogin) {
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
                        onPress: () => { },
                        style: "cancel"
                    },
                ]
            );
        } else {
            Alert.alert(
                "Konfirmasi",
                "Apakah anda yakin ?",
                [
                    {
                        text: "Ya",
                        onPress: () => {
                            //store to DB
                            props.saveToDBEGFR(props, EGFReducer)
                        }
                    },
                    {
                        text: "Tidak",
                        onPress: () => { },
                        style: "cancel"
                    },
                ]
            );
        }
    }


    useEffect(() => {
        let resultUACR = uacr_interpretation(EGFReducer.EGFR, EGFReducer.UACR)
        console.log(resultUACR)
        props.getResultUACRDB(resultUACR).then((res)=>{
            console.log(res)
            setDiagnose(res)
        })
        setResultEGFR(resultUACR)
    }, [])

    return (
        <Fragment>
            <ScrollView>
            <HeaderBackBtn page="UACR" navigation={props.navigation} title="Diagnosis UACR" />

            <View style={styles.cardInformation}>

                <View style={styles.informationLayout}>
                    <Text style={styles.contentInformationTitle}>
                        Hasil Pemeriksaan :
                    </Text>
                    <Text style={styles.contentInformation}>
                        {diagnose.interpretasi.replace(/ +(?= )/g,'')}
                    </Text>
                    <Text style={styles.contentInformationTitle}>
                        Stadium : {EGFReducer.EGFR} ({getRiskUACR(resultUACR)})
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

            <View style={{ width: "70%", alignSelf: "center", marginVertical: 25 }}>
                <ButtonClassic title="Simpan Riwayat" onPress={() => SaveCheck()} />
            </View>
        </ScrollView>
        </Fragment>
    )
}


const reduxState = (state) => ({
    dataEGFR: state.dataEGFR,
    isLogin: state.isLogin
})

const reduxDispatch = (dispatch) => ({
    saveToDBEGFR: (props, data) => dispatch(StoreToDBEGFR(props, data)),
    getResultUACRDB: (data) => dispatch(getResultUACRDB(data)),
})

export default connect(reduxState, reduxDispatch)(UACRDiagnose);

