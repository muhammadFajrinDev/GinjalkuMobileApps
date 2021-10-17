
import TextInputClassic from '../../../components/atoms/TextInput/text-input-classic';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ButtonClassic from '../../../components/atoms/Button/button-classic';
import DateTimePicker from '@react-native-community/datetimepicker';
import BlueText from '../../../components/atoms/Bluetext';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import React, { Fragment,useEffect,useState } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import { SigninWithGoogle,RegisterWithEmail, EditProfileFunction, CheckUser } from "../../../config/redux/action";


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

const EditProfile = (props) =>{

  const [datess, setDatess] = useState(new Date());
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  
  //Form
  const [gender, setGender] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [given_name, setGiveName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photosUrl, setPhotosUrl] = useState('');
  const [email, setEmail] = useState('');

    useEffect(()=>{
        const DataUser = props.dataUser;
        let key = Object.keys(DataUser)

        key.map(key =>{
        if(key == 'fullname'){
            setFullname(DataUser.fullname)
        }
        if(key == 'gender'){
            setGender(DataUser.gender)
            DataUser.gender == 'Male' ? setActive(1) : setActive(2)
        }
        if(key == 'birthdate'){
            setBirthdate(DataUser.birthdate)
        }
        if(key == 'phoneNumber'){
            setPhoneNumber(DataUser.phoneNumber)
        }
        if(key == 'given_name'){
            setGiveName(DataUser.given_name)
        }
        if(key == 'photosUrl'){
          setPhotosUrl(DataUser.photosUrl)
        }
        if(key == 'email'){
          setEmail(DataUser.email)
      }
        
        });
    },[]);

    const onChangeDate = (event, selectedDate) => {
        
        let date = Moment(selectedDate).format('DD-MM-YYYY')

        if(selectedDate){
            setBirthdate(date) 
        }else{
            setBirthdate('') 
        }
        setShow(false)
    };

    const activeGender = (id) =>{
        if(id == 1){
            setActive(1); setGender("Male");
        }else{
            setActive(2); setGender("Female")
        }
    }

  const submit = () =>{

    if( 
        fullname == '' || 
        given_name == '' ||
        birthdate == '' ||
        gender == '' ||
        phoneNumber == ''
      )
      {
      Alert.alert("Mohon lengkapi semua data formulir.")
      
      }
      else
      {
        props.EditProfile({fullname, given_name,birthdate, gender, phoneNumber,email,photosUrl}, props)
      }
  }
  
  return (  
   <Fragment>
     <SafeAreaView style={styles.container}>
       <ScrollView style={styles.scrollView}>
        {/* Header */}
        <HeaderBackBtn title="Ubah Data Diri" page="Profile" navigation={props.navigation}/>

        <View style={styles.inputGroup}>
          <View style={styles.itemGroup}>
            <BlueText title="Nama Lengkap"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setFullname(el)} value={fullname} title="Nama Lengkap"/>
          </View>
        </View>

        <View style={{width:250}}>
          <View style={styles.itemGroup}>
            <BlueText title="Nama Panggilan"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic onChangeText={(el)=>setGiveName(el)} value={given_name} title="Nama Panggilan"/>
          </View>
        </View>

        <View style={{width:250}}>
          <View style={styles.itemGroup}>
            <BlueText title="No Handphone"/>
          </View>
          <View style={styles.itemGroup}>
            <TextInputClassic keyboardType="numeric" onChangeText={(el)=>setPhoneNumber(el)} value={phoneNumber} title="0859xxxxxxx"/>
          </View>
        </View>

        <View style={{width:210}}>
          <View style={styles.itemGroup}>
            <BlueText title="Tanggal Lahir"/>
          </View>
            {show && (
              <DateTimePicker
              value={datess}
              mode="date"
              onChange={onChangeDate}
            />
            )}
          <View style={styles.itemGroup}>
            <TouchableOpacity onPress={()=>{ setShow(true)}}>
                <TextInputClassic editable={false} value={birthdate} read title="DD-MM-YYYY"/>
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

        <View style={{alignSelf:"center",marginVertical:20,width:"60%"}}>
             <ButtonClassic title="Simpan" onPress={()=> submit()}/>
        </View>

      </ScrollView>
    </SafeAreaView>
   </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    EditProfile : (data,props) => dispatch(EditProfileFunction(data,props)),

})

const reduxState = (state) =>({
    dataUser : state.dataUser
})
  

export default connect(reduxState,reduxDispatch)(EditProfile);

