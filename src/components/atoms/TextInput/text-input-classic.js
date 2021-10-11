import React from 'react';
import { Fragment } from 'react';
import { StyleSheet, TextInput,  } from 'react-native';

const styles = StyleSheet.create({
    styletxt: { height:50,backgroundColor:"#FFFFFF",borderRadius:30, 
    paddingHorizontal:25, color: "#736b6b", fontSize:15, fontWeight:"bold", 
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 10, }
});

const TextInputClassic = (props) =>{
  return (  
   <Fragment>
       <TextInput style={styles.styletxt} value={props.value} 
                  editable={props.editable} name={props.name} 
                  secureTextEntry={props.secureTextEntry} 
                  onChangeText={props.onChangeText} 
                  keyboardType={props.keyboardType}
                  placeholder={props.title}
      />
   </Fragment>
  ) 
}

export default TextInputClassic;

