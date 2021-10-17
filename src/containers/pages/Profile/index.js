import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import blackspace_back from '../../../assets/thumb/backspace_back.png'
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import ProfilePhoto from '../../../assets/thumb/profile-k.png';
import { ScrollView } from 'react-native-gesture-handler';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import EditPanel from '../../../assets/thumb/mode.png';

const styles = StyleSheet.create({
  card:{
      width:"90%", 
      backgroundColor:"#FFFFFF",
      marginVertical:10,
      flexDirection:"row",justifyContent:"space-between", alignSelf:"center",
      shadowColor: '#000', borderRadius:12,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity:  0.4,
      shadowRadius: 3,
      elevation: 5, 
      padding:14 },
  image : {alignSelf:"center",width:75, height:75, borderRadius:14,},
  conImage : { marginHorizontal:13, marginVertical:10, alignSelf:"center" },
  txtImage : {color:"#2A2B3D", fontSize:20, fontWeight:"bold", textTransform:"capitalize", width:220, },
  editText : {color:"#2A2B3D", fontSize:18, fontWeight:"bold"},
  conText :  {marginVertical:2,padding:6}
});


const Profile = (props) =>{
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [fullname, setFullname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  useEffect(()=>{
    const DataUser = props.dataUser;
    let key = Object.keys(DataUser)
    console.log(key)
    key.map(key =>{
      if(key == 'fullname'){
        setFullname(DataUser.fullname)
      }
      if(key == 'email'){
        setEmail(DataUser.email)
      }
      if(key == 'gender'){
        setGender(DataUser.gender)
      }
      if(key == 'birthdate'){
        setBirthdate(DataUser.birthdate)
      }
      if(key == 'phoneNumber'){
        setPhoneNumber(DataUser.phoneNumber)
      }
      if(key == "photosUrl"){
        setPhoto(DataUser.photosUrl)
      }
      
    });

  },[])
  
  return (  
     <View style={{flex:1}}>
      <ScrollView>
       <HeaderBackBtn title="Data Diri" page="Dashboard" navigation={props.navigation}/>
        <View style={styles.card}>
              <View>
                <View style={{flexDirection:"row", marginBottom:10}}>
                  <TouchableOpacity>
                      <Image source={EditPanel} style={{position:"absolute",left:300,}}/>
                  </TouchableOpacity>
                  {
                    photo == '' ? (
                      <Image source={ProfilePhoto} style={styles.image}/>
                    ):(
                      <Image source={{uri: photo}} style={styles.image}/>
                    )
                  }
                  <View style={styles.conImage}>
                    {
                      birthdate != '' ? (
                      <Fragment>
                        <Text style={styles.txtImage}>{fullname}</Text>
                        <Text style={{color:"#2A2B3D", fontSize:18 }}>{birthdate}</Text>
                      </Fragment>
                      ):(
                        <Fragment>
                           <Text style={styles.txtImage}>{fullname}</Text>
                           <Text style={{color:"#F82345", fontSize:16,marginVertical:3 }}> Mohon untuk lengkapi data diri </Text>
                        </Fragment>
                      )
                    }
                      
                  </View>

                </View>
                
                <View style={styles.conText}>
                {
                      birthdate != '' ? (
                      <Fragment>
                          <Text style={styles.editText}>Tanggal Lahir</Text>
                          <Text style={{color:"#2A2B3D", fontSize:17, marginVertical:3 }}>{birthdate}</Text>
                      </Fragment>
                      ):(
                        <Fragment>
                           <Text style={styles.txtImage}>Tanggal Lahir</Text>
                           <Text style={{color:"#F82345", fontSize:16,marginVertical:3 }}> Kosong </Text>
                        </Fragment>
                      )
                }        
                </View>
                
                <View style={styles.conText}>
                {
                      birthdate != '' ? (
                      <Fragment>
                          <Text style={styles.editText}>Jenis Kelamin</Text>
                          <Text style={{color:"#2A2B3D", fontSize:17, marginVertical:3 }}>{gender}</Text>
                      </Fragment>
                      ):(
                        <Fragment>
                           <Text style={styles.txtImage}>Jenis Kelamin</Text>
                           <Text style={{color:"#F82345", fontSize:16,marginVertical:3 }}> Kosong </Text>
                        </Fragment>
                      )
                }                  
                </View>

                <View style={styles.conText}>
                {
                      birthdate != '' ? (
                      <Fragment>
                          <Text style={styles.editText}>Nomor Telepon</Text>
                          <Text style={{color:"#2A2B3D", fontSize:17, marginVertical:3 }}>{phoneNumber}</Text>
                      </Fragment>
                      ):(
                        <Fragment>
                           <Text style={styles.txtImage}>Nomor Telepon</Text>
                           <Text style={{color:"#F82345", fontSize:16,marginVertical:3 }}> Kosong </Text>
                        </Fragment>
                      )
                }                 
                </View>
              </View>
        </View>
        
        <View style={styles.card}>
              <View>
              <TouchableOpacity>
                <Image source={EditPanel} style={{position:"absolute",left:300,}}/>
              </TouchableOpacity>
                <View style={styles.conText}>
                      <Text style={styles.editText}>Alamat Email</Text>
                      <Text style={{color:"#2A2B3D", fontSize:17, marginVertical:3 }}>{email}</Text>
                </View>

                {/* <View style={styles.conText}>
                      <Text style={styles.editText}>Password</Text>
                      <Text style={{color:"#2A2B3D", fontSize:17, marginVertical:3 }}>********</Text>
                </View> */}
              </View>
        </View>

        <TouchableOpacity onPress={()=> props.navigation.push("History")}>
          <View style={styles.card}>
            <Text style={{fontSize:16,color:"#2A2B3D", fontWeight:"bold",paddingTop:2}}>Riwayat Pemeriksaan</Text>
          <Image source={blackspace_back}/>
       </View>
       </TouchableOpacity>
       </ScrollView>
     </View>
  ) 
}

const reduxState = (state) =>({
  dataUser : state.dataUser
})

export default connect(reduxState,null)(Profile);

