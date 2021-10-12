import HeaderDashboard from '../../../components/atoms/Header/header-dashboard';
import { Alert, Image, Text, SafeAreaView, View, ScrollView,StyleSheet, TouchableOpacity } from 'react-native';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Menu from '../../../components/atoms/Menu';
import Organ from '../../../assets/thumb/organ.png';
import BlueText from '../../../components/atoms/Bluetext';
import CardNews from '../../../components/atoms/CardNews';
import ButtonClassic from '../../../components/atoms/Button/button-classic';

const Dashboard = (props) =>{
  
    const styles = StyleSheet.create({
        cardInformation: {
            height:210, width:"90%", alignSelf:"center", 
            backgroundColor:"#C0D3F9", marginTop:110, borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
            shadowRadius: 3, elevation: 5, padding: 17
        },
        informationLayout : { 
            width:"100%", height:110, flexDirection:"column", justifyContent:"space-between" 
        },
        contentInformation : {
            fontWeight:"bold",textAlign:"justify", fontSize :14,width:220
        },
        containerCheckNow : {
            width:"50%", height:80, flexDirection:"column",justifyContent:"center"
        },
        imageOrgan : {
            position:"absolute", right:-27, top:55, width:200
        },
        containerNewsMenu : {
            flexDirection:"row",width:"90%",justifyContent:"space-between", 
            alignSelf:"center", marginVertical:15
        }
    });

  return ( 
    <Fragment> 
    <SafeAreaView>
        <ScrollView> 

        {/* Header */}
        <HeaderDashboard onPress={()=> null} title="Hai, Fulan"/>
        
        {/* Card Menu */}
        <Menu MenuRedirect={props}/>
        
            <View style={styles.cardInformation}>

                <View style={styles.informationLayout}>
                    <Text style={styles.contentInformation}>
                        Kesehatan fungsi ginjal dapat diukur
                        dengan menghitung eGFR. 
                    </Text>
                    <Text style={styles.contentInformation}>
                        Lakukan pemeriksaan dini sebagai 
                        upaya mencegah kerusakan ginjal 
                    </Text>
                </View>

                <View style={styles.containerCheckNow}>          
                        <ButtonClassic title="Periksa Sekarang" onPress={()=> props.navigation.push("eGFR")}/>
                </View>
                <Image source={Organ} style={styles.imageOrgan}/> 
                     
            </View>

            {/* News Menu*/}
            <View style={styles.containerNewsMenu}>
                <Text style={{fontSize:19,fontWeight:"bold"}}>Info & Berita</Text>
                <TouchableOpacity onPress={()=> props.navigation.push("Berita")}>
                    <BlueText title="Lihat Semua"/>
                </TouchableOpacity>    
            </View>

            {/* Card News */}
            <View style={{flexDirection:"row", marginBottom:20, height:340}}>
                <ScrollView style={{marginLeft:10}} horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                   <CardNews title="Menjaga dan Memelihara kesehatan ginjal" author="Oleh Dr Khawarizmi" time="1 Menit yang lalu"/>

                   <CardNews title="Gambaran klinis Penderita Ginjal kronis" author="Oleh Dr Sujato" time="4 Menit yang lalu"/>
                </ScrollView>
            </View>

        </ScrollView>
    </SafeAreaView>
    </Fragment>
  ) 
}

export default connect(null,null)(Dashboard);

