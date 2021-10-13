import HeaderDashboard from '../../../components/atoms/Header/header-dashboard';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import blackspace_back from '../../../assets/thumb/backspace_back.png'
import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';

const Profile = (props) =>{

  return (  
     <Fragment>

       <HeaderBackBtn title="Data Diri" page="Dashboard" navigation={props.navigation}/>
        <TouchableOpacity onPress={()=> props.navigation.push("History")}>
            <View style={{width:"80%", 
                backgroundColor:"#FFFFFF",
                marginVertical:20,
                flexDirection:"row",justifyContent:"space-between", alignSelf:"center",
                shadowColor: '#000', borderRadius:12,
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity:  0.4,
                shadowRadius: 3,
                elevation: 10, 
                padding:14
            }}>

          <Text style={{fontSize:15,color:"#2A2B3D", fontWeight:"bold"}}>Riwayat Pemeriksaan</Text>
          <Image source={blackspace_back}/>
       </View>
       </TouchableOpacity>
     </Fragment>
  ) 
}

export default connect(null,null)(Profile);

