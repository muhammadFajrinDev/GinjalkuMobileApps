import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { Alert, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import CardNews from '../../../components/atoms/CardNews';
import { ScrollView } from 'react-native-gesture-handler';

const News = (props) =>{

  return (  
     <Fragment>
            <ScrollView>
                <HeaderBackBtn title="Berita" navigation={props.navigation} page="Dashboard"/>
            
                <View style={{flexDirection:"column", marginVertical:10}}>
                    <View style={{marginVertical:10,alignItems:"center"}}>
                        <CardNews title="Menjaga dan Memelihara kesehatan ginjal" author="Oleh Dr Khawarizmi" time="1 Menit yang lalu"/>
                    </View>
                    <View style={{marginVertical:10, alignItems:"center"}}>
                        <CardNews title="Gambaran klinis Penderita Ginjal kronis" author="Oleh Dr Sujato" time="4 Menit yang lalu"/>
                    </View>
                    <View style={{marginVertical:10, alignItems:"center"}}>
                        <CardNews title="Authentication flows" author="Oleh Dr Sujato" time="4 Menit yang lalu"/>
                    </View>
                </View>
            </ScrollView>
     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    // RegisterWithEmail : (data) => dispatch(SigninWithGoogle(data)),
    // SigniAPIWithEmail : (data) => dispatch(SigninWithEmail(data))
})

export default connect(null,null)(News);

