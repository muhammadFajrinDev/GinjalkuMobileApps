
import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import DateTimePicker from '@react-native-community/datetimepicker';
import BlueText from '../../../components/atoms/Bluetext';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import React, { Fragment,useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import { SigninWithGoogle,RegisterWithEmail } from "../../../config/redux/action";


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

const Register = (props) =>{

  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  
  //Form
  const [email, setEmail] = useState(null);
  const [gender, setGender] = useState(null);
  const [date, setDate] = useState(new Date());
  const [password, setPassword] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [given_name, setGiveName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setBirthdate(Moment(selectedDate).format('DD/MM/YYYY'))
    setDate(selectedDate)
    setShow(false)
  };

  const activeGender = (id) =>{
      if(id == 1){
        setActive(1); setGender("Male");
      }else{
        setActive(2); setGender("Female")
      }
  }

  const submitRegister = () =>{
    if( 
        fullname == null ||
        given_name == null ||
        birthdate == null ||
        gender == null ||
        email == null ||
        password == null ||
        phoneNumber == null ||
        toggleCheckBox == false 
      )
      {
          Alert.alert("Mohon lengkapi semua data formulir.")
      }
      else
      {
        props.RegisterAPIWithEmail({
          fullname,given_name,birthdate,gender,email,password,phoneNumber
        },props)
      }
  }

  return (  
   <Fragment>
     <SafeAreaView style={styles.container}>
       <ScrollView style={styles.scrollView}>
        {/* Header */}
        <HeaderBackBtn title="Pendaftaran" page="Login" navigation={props.navigation}/>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Nama Lengkap"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setFullname(el)} title="Nama Lengkap"/>
          </View>
        </View>

        <View style={{width:250}}>
          <View style={styles.itemGroup}>
            <BlueText title="Nama Panggilan"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setGiveName(el)} title="Nama Panggilan"/>
          </View>
        </View>

        <View style={{width:250}}>
          <View style={styles.itemGroup}>
            <BlueText title="No Handphone"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic keyboardType="numeric" onChangeText={(el)=>setPhoneNumber(el)} title="0859xxxxxxx"/>
          </View>
        </View>

        <View style={{width:210}}>
          <View style={styles.itemGroup}>
            <BlueText title="Tanggal Lahir"/>
          </View>
          <View style={styles.itemGroup}>
            {show && (
              <DateTimePicker
              value={date}
              mode="date"
              onChange={onChangeDate}
            />
            )}
            <TouchableOpacity onPress={()=>setShow(true)}>
                <TextInputClassic editable={false} value={birthdate} read title="DD/MM/YYYY"/>
            </TouchableOpacity>  
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Jenis Kelamin"/>
          </View>
          <View style={{flexDirection:"row",marginLeft:20,marginTop:5}}>

            <TouchableOpacity onPress={()=> activeGender(1)}>
              <View style={active == 1 ? styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={active == 1 ? styleSelect.textActive : styleSelect.textNoActive}>Pria</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> activeGender(2)}>
              <View style={active == 2 ?  styleSelect.selectActive : styleSelect.selectNoActive}>
                <Text style={active == 2 ? styleSelect.textActive : styleSelect.textNoActive}>Wanita</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Alamat Email"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setEmail(el)} title="Email"/>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Password"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setPassword(el)} secureTextEntry={true} title="Password"/>
          </View>
        </View>

        <View style={{width:"90%",marginTop:16}}>
          <View style={{flexDirection:"row", width:"80%", alignSelf:"center"}}>
            <CheckBox
             value={toggleCheckBox}
             onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={{color:"#6D6161", fontWeight:"bold"}}>Dengan ini, saya menyetujui ketentuan 
              dalam aplikasi ini
            </Text>
          </View>
        </View>

        <View style={{alignSelf:"center",marginVertical:20,width:"60%"}}>
             <ButtonClassic title="Daftar" onPress={()=> submitRegister()}/>
        </View>

      </ScrollView>
    </SafeAreaView>
   </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    RegisterAPIWithEmail : (data,props) => dispatch(RegisterWithEmail(data,props)),
})

export default connect(null,reduxDispatch)(Register);

