import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const SigninWithGoogle = (props) => async (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})
    return new Promise ((resolve,reject)=>{
        excuteLoginFirebase().then((userCredential)=>{

            let userData = userCredential.additionalUserInfo;
            let userDataDetail = userCredential.user._user;
            
            if(userData.isNewUser){
                const newReference = database().ref('/users').push();

                let dataSet = {
                    birthdate: null,
                    email: userData.profile.email,
                    gender:null,
                    fullname: userData.profile.name,
                    given_name: userData.profile.given_name,
                    phoneNumber : userDataDetail.phoneNumber
                }
                
                newReference.set(dataSet).then(() => { 
                    
                    
                    
                }).catch((err)=>{
                    Alert.alert(err)
                });              
            }

            storeData(userDataDetail.uid)

            props.navigation.push("Dashboard")
            dispatch({type : "CHANGE_LOADING", value: false})

            resolve(true)
        }).catch((err)=>{

            dispatch({type : "CHANGE_LOADING", value: false})
            console.log(err);
            resolve(false)
        });
    });
}

export const SigninWithEmail = (data,props) => (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})

    auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((res) => {
        
        let getUid = res.user._user;

        storeData(getUid.uid)
        props.navigation.push("Dashboard")
        dispatch({type : "CHANGE_LOADING", value: false})

    })
    .catch(error => {
        if (error.code === 'auth/wrong-password') {
            Alert.alert('Password yang anda masukan salah!');
        }

        if (error.code === 'auth/user-not-found') {
            Alert.alert('User / Email tidak terdaftar, pastikan anda sudah melakukan pendaftaran.');
        }
    dispatch({type : "CHANGE_LOADING", value: false})
    });
}

export const RegisterWithEmail = (data,props) => (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})
     new Promise ((resolve,reject)=>{
        auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {

            let userData = userCredential.additionalUserInfo;

            if(userData.isNewUser){
            
                const newReference = database().ref('/users').push();
                
                newReference.set(data).then(() => { 
                   
                    // redirect to login
                    props.navigation.push("Login")

                }).catch((err)=>{
                    Alert.alert(err)
                });

            }

            Alert.alert("Akun pengguna berhasil dibuat.")
            dispatch({type : "CHANGE_LOADING", value: false})
            resolve(true)
        })
        .catch(error => {

          if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Email sudah digunakan.")
          }
      
          if (error.code === 'auth/invalid-email') {
            Alert.alert("Alamat email tidak valid!.")
          }
          resolve(false)
          dispatch({type : "CHANGE_LOADING", value: false})
        });
    });
}

async function excuteLoginFirebase (){

    GoogleSignin.configure({
        webClientId: '1015532825099-mv0cmcscva88l9f81p5l7g2uqmt3isg8.apps.googleusercontent.com',
    });

    const { accessToken,idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken,accessToken);

    return auth().signInWithCredential(googleCredential);
}

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
    
      console.log(getData('@user'))

    } catch (e) {
      Alert.alert(e)
    }
  }

export const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      Alert.alert(e)
    }
}