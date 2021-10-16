import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import BlueText from '../../../components/atoms/Bluetext';
import { saveEGFR } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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
  
  const styles = StyleSheet.create({
      inputGroup : { width:"90%", marginVertical:3 },
      itemGroup: { marginHorizontal:30, marginVertical: 6},
  });
  

const EGFR = (props) =>{

    const [activeGender, setActiveGender] = useState(null);
    const [activeRace, setActiveRace] = useState(null);

    const [creatinine, setCreatinine] = useState('')
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState('')
    const [race, setRace] = useState('');
    const [age, setAge] = useState('')

    useEffect(()=>{
        const {creatinine, gender, weight, race , age} = props.dataEGFR;
        
        setCreatinine(creatinine)
        setWeight(weight)
        setAge(age)

    },[])

    const activeGenderCheck = (id) =>{
        if(id == 1){
          setActiveGender(1); setGender("Male");
        }else{
          setActiveGender(2); setGender("Female")
        }
    }

    const activeRaceCheck = (id) =>{
      if(id == 1){
        setActiveRace(1); setRace("Africa");
      }else{
        setActiveRace(2); setRace("Non Africa")
      }
  }

    const submitEGFR = () =>{

      if(!props.isLogin){
          if(creatinine == '' || weight == '' || race == '' || gender == '' ||  age == ''){
            return Alert.alert("Mohon lengkapi formulir.")
          }
        props.SaveEGFRToReduce(props,{ creatinine, weight, race, gender, age })
      }else{
        if(creatinine == '' || weight == '' || race == ''){
            return Alert.alert("Mohon lengkapi formulir.")
        }
        props.SaveEGFRToReduce(props,{ creatinine, weight, race})
      }

    }

  return (  
     <Fragment>
       <ScrollView>
         <HeaderBackBtn page="Dashboard" navigation={props.navigation} title="Formulir eGFR"/>
          
         <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Serum Creatinine"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic value={creatinine} keyboardType="numeric" onChangeText={(el)=>setCreatinine(el.trim())} title="mg/dL"/>
          </View>
        </View>

        {
          !props.isLogin && (
            <Fragment>
              <View style={{width:"60%"}}>
                <View style={styles.itemGroup}>
                  <BlueText title="Usia"/>
                </View>
                <View style={styles.itemGroup}>
                  <TextInputClassic value={age} keyboardType="numeric" onChangeText={(el)=>setAge(el.trim())} title="Tahun"/>
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <View style={styles.itemGroup}>
                  <BlueText title="Jenis Kelamin"/>
                </View>
                <View style={{flexDirection:"row",marginLeft:20,marginTop:5}}>

                  <TouchableOpacity onPress={()=> activeGenderCheck(1)}>
                    <View style={activeGender == 1 ? styleSelect.selectActive : styleSelect.selectNoActive}>
                      <Text style={activeGender == 1 ? styleSelect.textActive : styleSelect.textNoActive}>Pria</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> activeGenderCheck(2)}>
                    <View style={activeGender == 2 ?  styleSelect.selectActive : styleSelect.selectNoActive}>
                      <Text style={activeGender == 2 ? styleSelect.textActive : styleSelect.textNoActive}>Wanita</Text>
                    </View>
                  </TouchableOpacity>


                </View>
              </View>
            </Fragment>
          )
        }

        <View style={{width:"60%"}}>
          <View style={styles.itemGroup}>
            <BlueText title="Berat Badan"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic value={weight} keyboardType="numeric" onChangeText={(el)=>setWeight(el.trim())} title="Kg"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Ras atau Suku"/>
          </View>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:5}}>

            <TouchableOpacity onPress={()=> activeRaceCheck(1)}>
              <View style={activeRace == 1 ? styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={activeRace == 1 ? styleSelect.textActive : styleSelect.textNoActive}>Afrika</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> activeRaceCheck(2)}>
              <View style={activeRace == 2 ?  styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={activeRace == 2 ? styleSelect.textActive : styleSelect.textNoActive}>Lainnya</Text>
              </View>
            </TouchableOpacity>


          </View>
        </View>
       
        <View style={{alignSelf:"center",marginVertical:40,width:"70%"}}>
            <ButtonClassic title="Proses" onPress={()=> submitEGFR()}/>
        </View>
      </ScrollView>
     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    SaveEGFRToReduce : (props,data) => dispatch(saveEGFR(props,data)),
})

const reduxState = (state) =>({
  isLogin : state.isLogin,
  dataEGFR : state.dataEGFR
  
})


export default connect(reduxState,reduxDispatch)(EGFR); 

