import HeaderBackBtn from '../../../components/atoms/Header/header-backbtn';
import { Alert, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

const Instruction = (props) =>{

  return (  
     <Fragment>
         <HeaderBackBtn page="Dashboard" navigation={props.navigation} title="Petunjuk Penggunaan"/>
     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    // RegisterWithEmail : (data) => dispatch(SigninWithGoogle(data)),
    // SigniAPIWithEmail : (data) => dispatch(SigninWithEmail(data))
})

export default connect(null,null)(Instruction);

