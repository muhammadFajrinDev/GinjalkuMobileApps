import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { Alert, Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { getHistoryBaseUser } from '../../../config/redux/action';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import moment from 'moment';

const styles = StyleSheet.create({
    cardList : { width:"80%", height:100, backgroundColor:"#FFFFFF",
                 alignSelf:"center", marginVertical:10, borderRadius: 16,
                 shadowColor: '#000', borderRadius:12,
                 shadowOffset: { width: 1, height: 1 },
                 shadowOpacity:  0.4,
                 shadowRadius: 5,
                 elevation:2, 
                 padding:20
                },
    stadium: {color:"#2A2B3D", fontWeight:"bold", fontSize:17},
    date : { color:"#B7B7B7", fontSize: 16, fontWeight: "bold" },
    description : { flexDirection:"column", justifyContent:"space-between", height:"100%"}
});

const History = (props)  => {
    const [history, setHistory] = useState([])
    
    useEffect(()=>{
        props.getHistory().then((res)=>{
            console.log(res)
            setHistory(res)
        })
    },[])

  return (  
     <Fragment>
    <ScrollView>
       <HeaderBackBtn title="Riwayat Pemeriksaan" page="Profile" navigation={props.navigation}/>

        {
            history.map(val =>{
                let ChangeFormat = new Date(val.data.datetime);
                return(
                    <TouchableOpacity key={val.id} onPress={()=>{
                        props.navigation.navigate('Detail', {
                            itemId: val.id,
                          });
                    }}>
                    <View style={styles.cardList} >
                        <View style={styles.description}>
                            <Text style={styles.stadium}>Stadium : {val.data.EGFR}</Text>
                            <Text style={styles.date}>{moment(ChangeFormat).fromNow()}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                )
            })
        }
        {
            history.length == 0 && (
                <View style={{alignItems:"center", marginVertical:20}}>
                    <Text style={styles.date}>No more data</Text>
                </View>
            )
        }
    </ScrollView>
     </Fragment>
  ) 
}


const reduxDispatch = (dispatch) => ({
    getHistory : () => dispatch(getHistoryBaseUser())
})


export default connect(null,reduxDispatch)(History);

