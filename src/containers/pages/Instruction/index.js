import HeaderDashboard from '../../../components/atoms/Header/header-dashboard';
import { Alert, Text, View } from 'react-native';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

const Instruction = (props) =>{

  return (  
     <Fragment>
         <HeaderDashboard title="Petunjuk Penggunaan"/>
     </Fragment>
  ) 
}

const reduxDispatch = (dispatch) => ({
    // RegisterWithEmail : (data) => dispatch(SigninWithGoogle(data)),
    // SigniAPIWithEmail : (data) => dispatch(SigninWithEmail(data))
})

export default connect(null,null)(Instruction);

