import { Alert, Image, Text, StyleSheet, View } from 'react-native';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { getHistoryDetail } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { EGFR } from '..';


const styles = StyleSheet.create({
    card : {width:"90%",backgroundColor:"#C0D3F9", 
            padding:20, marginVertical:15 ,alignSelf:"center", borderRadius:12,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
            shadowRadius: 3, elevation: 5,
        },
    texttitle : { fontSize :16, fontWeight : "bold", marginVertical:5 },
    content : { fontWeight: "bold" },
    paragraf : { marginBottom: 15 }
});

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

    return getRiskUACR(risk);
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

const Detail = (props) =>{

    const [detail, setDetail] = useState([]);
    const { itemId } = props.route.params;

    useEffect(()=>{
    
        props.getDetail(itemId).then((res)=>{
            setDetail(res)
        }).catch((err)=>{
            Alert.alert(err)
        })

    },[itemId])
             
  return (  
     <Fragment>

       <HeaderBackBtn title="Detail Riwayat" page="History" navigation={props.navigation}/>
       
       <View style={styles.card}>
            <View style={styles.paragraf}>
                <Text style={styles.texttitle}>Tanggal Pemeriksaan</Text>
                <Text style={styles.content}>{moment(detail.datetime).format('LLLL')}</Text>
            </View>

            <View style={styles.paragraf}>
                <Text style={styles.texttitle}>Rekap Data</Text>
                <Text style={styles.content}> {'\u2022'} Usia : {detail.age} Tahun </Text>
                <Text style={styles.content}> {'\u2022'} Ras : {detail.race == 'Non African' ? 'Lainnya' : 'African'}  </Text>
                <Text style={styles.content}> {'\u2022'} Serum Creatinine : {detail.creatinine} mg/dL</Text>
                <Text style={styles.content}> {'\u2022'} Nilai eGFR : {detail.resultEGFRCal}</Text>
                {
                    detail.UACR && (
                        <Text style={styles.content}> {'\u2022'} UACR : {detail.UACR} mg/g </Text>
                    )
                }
            </View>

            <View style={styles.paragraf}>
                {
                    detail.UACR ? (
                        <Text style={styles.texttitle}>Metode : UACR</Text>
                    ) : (
                        <Text style={styles.texttitle}>Metode : eGFR </Text>
                    )
                }
          
            </View>

            <View style={styles.paragraf}>
                <Text style={styles.texttitle}>Hasil Pemeriksaan</Text>

                <Text style={styles.content}> {'\u2022'} Stadium {detail.EGFR} </Text>
                {
                    detail.UACR && (
                        <Text style={styles.content}> {'\u2022'} {uacr_interpretation(detail.EGFR, detail.UACR)}  </Text>
                    )
                }
            </View>
            
       </View>
      
     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    getDetail : (id) => dispatch(getHistoryDetail(id))
})


export default connect(null,reduxDispatch)(Detail);

