import HeaderDashboard from '../../../components/atoms/Header/header-dashboard';
import { Alert, Text, View } from 'react-native';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const Profile = (props) =>{

  props.navigation.push("Dashboard")
  return (  
     <Text></Text>
  ) 
}

const reduxDispatch = (dispatch) => ({
    // RegisterWithEmail : (data) => dispatch(SigninWithGoogle(data)),
    // SigniAPIWithEmail : (data) => dispatch(SigninWithEmail(data))
})

export default connect(null,null)(Profile);

