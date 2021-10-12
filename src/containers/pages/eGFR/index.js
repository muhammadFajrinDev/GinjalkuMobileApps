import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import BlueText from '../../../components/atoms/Bluetext';
import { saveEGFR } from '../../../config/redux/action';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

const styleSelect = StyleSheet.create({
    selectActive :{ 
      backgroundColor:"#5589F0", 
      padding:12,width:100, borderRadius:30,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 10, 
      marginHorizontal:10,
    },
    selectNoActive : { 
      backgroundColor:"#FFFFFF", 
      padding:12,width:100, 
      borderRadius:30,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 10,
      marginHorizontal:10
    },
    textNoActive : { color:"#968C8C", fontSize:16, textAlign:"center",fontWeight:"bold" },
    textActive: { color:"#FFFFFF", fontSize:16, textAlign:"center", fontWeight:"bold" }
  });
  

const EGFR = (props) =>{

    const [active, setActive] = useState(null);


    const [creatinine, setCreatinine] = useState(null)
    const [weight, setWeight] = useState(null)
    const [race, setRace] = useState(null);

    const styles = StyleSheet.create({
        inputGroup : { width:"90%", marginVertical:3 },
        itemGroup: { marginHorizontal:30, marginVertical: 6},
    });

    const activeGender = (id) =>{
        if(id == 1){
          setActive(1); setRace("African");
        }else{
          setActive(2); setRace("Non African")
        }
    }

    const submitEGFR = () =>{
        if(creatinine == null || weight == null || race == null ){
            return Alert.alert("Mohon lengkapi formulir.")
        }

        props.SaveEGFRToReduce({ creatinine,weight,race })
        props.navigation.push("eGFRDiagnose")
    }
      
  return (  
     <Fragment>
         <HeaderBackBtn page="Dashboard" navigation={props.navigation} title="Formulir eGFR"/>
          
         <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Serum Creatinine"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setCreatinine(el)} title="mg/dL"/>
          </View>
        </View>

        <View style={{width:"60%"}}>
          <View style={styles.itemGroup}>
            <BlueText title="Berat Badan"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setWeight(el)} title="Kg"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Ras atau Suku"/>
          </View>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:5}}>

            <TouchableOpacity onPress={()=> activeGender(1)}>
              <View style={active == 1 ? styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={active == 1 ? styleSelect.textActive : styleSelect.textNoActive}>Afrika</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> activeGender(2)}>
              <View style={active == 2 ?  styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={active == 2 ? styleSelect.textActive : styleSelect.textNoActive}>Lainnya</Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>
       
        <View style={{alignSelf:"center",marginVertical:40,width:"70%"}}>
            <ButtonClassic title="Proses" onPress={()=> submitEGFR()}/>
        </View>

     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    SaveEGFRToReduce : (data) => dispatch(saveEGFR(data)),
})

export default connect(null,reduxDispatch)(EGFR);

