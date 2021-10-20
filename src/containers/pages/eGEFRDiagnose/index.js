import { addedResult, getResultEGFRDB, StoreToDBEGFR } from '../../../config/redux/action';
import { StyleSheet, Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import React, { Fragment, useEffect, useState } from 'react';
import Backspace from '../../../assets/thumb/backspace.png';
import { ScrollView } from 'react-native-gesture-handler';
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

// LOGICAL eGFR & UACR
const K_MALE_COEFFICIENT = 0.9, K_FEMALE_COEFFICIENT = 0.7;
const ALPHA_MALE_COEFFICIENT = -0.411, ALPHA_FEMALE_COEFFICIENT = -0.329;
const FEMALE_COEFFICIENT = 1.018, AFRICAN_COEFFICIENT = 1.159;

const base_egfr = (serum_creatinine, gender, age) => {
    var result_egfr, scr_k;

    if (gender == "Male") {
        var scr_k = serum_creatinine / K_MALE_COEFFICIENT;
        result_egfr = 141 * ((Math.min(scr_k, 1) ** ALPHA_MALE_COEFFICIENT) * (Math.max(scr_k, 1) ** -1.209)) * (0.993 ** age)
        return result_egfr
    }

    scr_k = serum_creatinine / K_FEMALE_COEFFICIENT
    return (141 * ((Math.min(scr_k, 1) ** ALPHA_FEMALE_COEFFICIENT) * (Math.max(scr_k, 1) ** -1.209)) * (0.993 ** age)) * FEMALE_COEFFICIENT
}

const calculate_egfr = (serum_creatinine, gender, age, race) => {
    let base = base_egfr(serum_creatinine, gender, age);

    if (race == "African") {

        return base * AFRICAN_COEFFICIENT
    }

    return base * AFRICAN_COEFFICIENT
}

const gfr_interpretation = (gfr) => {
    let status;

    if (gfr >= 90) {
        status = "G1"
    } else if (gfr >= 60) {
        status = "G2"
    } else if (gfr >= 45) {
        status = "G3a"
    } else if (gfr >= 30) {
        status = "G3b"
    } else if (gfr >= 15) {
        status = "G4"
    } else {
        status = "G5"
    }

    return status;
}


const DiagnoseEGFR = (props) => {

    const [resultEGFR, setResultEGFR] = useState(null)
    const [calculate_egfr_save, setCalculate_egfr_save] = useState('')
    const [diagnose, setDiagnose] = useState({interpretasi:'',saran:'',metode:''})

    let EGFReducer = props.dataEGFR;


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

            EGFReducer.EGFR = resultEGFR

            Alert.alert(
                "Konfirmasi",
                "Apakah anda yakin ?",
                [
                    {
                        text: "Ya",
                        onPress: () => {
                            //store to DB
                            //get result calculate egfr
                            EGFReducer.resultEGFRCal = calculate_egfr_save;

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

    const toUACR = () => {

        EGFReducer.EGFR = resultEGFR
        EGFReducer.resultEGFRCal = calculate_egfr_save;

        props.sendToUACR(props, EGFReducer)
    }

    useEffect(() => {
        let calculate_egfr_res = calculate_egfr(EGFReducer.creatinine, EGFReducer.gender, EGFReducer.age, EGFReducer.race)
        let resultEGFRFunc = gfr_interpretation(calculate_egfr_res)

        setCalculate_egfr_save(calculate_egfr_res.toFixed(2))
        setResultEGFR(resultEGFRFunc)

        props.getResultEGFRDB(resultEGFRFunc).then((res) => {
            setDiagnose(res)
        }).catch((err) => {
            Alert.alert(err)
        })
    }, [])

    return (
        <Fragment>
            <ScrollView>
            <View style={{minHeight:800}}> 
            <HeaderBackBtn page="eGFR" navigation={props.navigation} title="Diagnosis eGFR" />

            <View style={styles.cardInformation}>

                <View style={styles.informationLayout}>
                    <Text style={styles.contentInformationTitle}>
                        Hasil Pemeriksaan :
                    </Text>
                    <Text style={styles.contentInformation}>
                        {diagnose.interpretasi.replace(/ +(?= )/g,'')}
                    </Text>
                    <Text style={styles.contentInformationTitle}>
                        Stadium : {resultEGFR}
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

            <View style={{ width: "70%", alignSelf: "center", }}>
                <TouchableOpacity onPress={() => toUACR()}>
                    <View style={{
                        padding: 10, borderRadius: 30,
                        flexDirection: "row", justifyContent: "center",
                        backgroundColor: "#FBFBFB", shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 10,
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#5589F0" }}>Lengkapi UACR </Text>
                        <Image source={Backspace} />
                    </View>
                </TouchableOpacity>
            </View>
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
    sendToUACR: (props, data) => dispatch(addedResult(props, data)),
    getResultEGFRDB: (data) => dispatch(getResultEGFRDB(data)),
})

export default connect(reduxState, reduxDispatch)(DiagnoseEGFR);

