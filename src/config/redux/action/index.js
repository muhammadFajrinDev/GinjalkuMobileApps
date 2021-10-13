import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const saveEGFR = (data) => async (dispatch) => {
    
    const dataUser = [];
    const Combine = data;

    getData("@user").then((idUser)=>{
        database().ref('/users/' + idUser).once('value')
        .then(snapshot => {
           
            Object.keys(snapshot.val()).map(key =>{
                dataUser.push({
                    id : key,
                    data : snapshot.val()[key]
                })
            });
            
            Combine.birthdate = dataUser[0].data.birthdate;
            Combine.gender = dataUser[0].data.gender;

            dispatch({type : "CHANGE_EGFR", value: Combine})
        }).catch((Err)=>{
            Alert.alert(Err)
        });

    }).catch((err)=>{
        Alert.alert(err)
    })

}

export const getHistoryBaseUser = () =>  async (dispatch) =>{
    const dataHistory = [];

    dispatch({type : "CHANGE_LOADING", value: true})

    return new Promise ((resolve,reject)=>{
    getData("@user").then((idUser)=>{
        database().ref('/history_check/' + idUser ).orderByKey('datetime').once('value')
        .then(snapshot => {
            if(snapshot.val()){
                Object.keys(snapshot.val()).map(key =>{
                    dataHistory.push({
                        id : key,
                        data : snapshot.val()[key]
                    })
                });
            }
            dispatch({type : "CHANGE_LOADING", value: false})

            resolve(dataHistory)
        }).catch((Err)=>{
            Alert.alert(Err)
        });
        dispatch({type : "CHANGE_LOADING", value: false})

    }).catch((err)=>{
        Alert.alert(err)
    })
});
}

export const getHistoryDetail = (id) => async (dispatch) =>{
    const Detail = [];

    dispatch({type : "CHANGE_LOADING", value: true})

    return new Promise ((resolve,reject)=>{

    getData("@user").then((idUser)=>{
        database().ref('/history_check/' + idUser + '/' + id ).once('value')
        .then(snapshot => {
            if(snapshot.val()){
                resolve(snapshot.val())
            }
            dispatch({type : "CHANGE_LOADING", value: false})
        }).catch((Err)=>{
            resolve(false)
            Alert.alert(Err)
        });

        dispatch({type : "CHANGE_LOADING", value: false})

    }).catch((err)=>{
        Alert.alert(err)
    })
});
}


export const CheckUser = (props) => async (dispatch) =>{
    dispatch({type : "CHANGE_LOADING", value: true})

    getData("@user").then((idUser)=>{
        database().ref('/users/' + idUser ).once('value')
        .then(snapshot => {
            if(!snapshot.val()){
                    if(removeSession("@user")){
                        props.navigation.push("Login")
                    }
            }
            
            dispatch({type : "CHANGE_LOADING", value: false})
        }).catch((Err)=>{
            Alert.alert(Err)
        });
        dispatch({type : "CHANGE_LOADING", value: false})
    }).catch((err)=>{
        Alert.alert(err)
    })
}

export const StoreToDBEGFR = (props,data) => async (dispatch) => {

    dispatch({type : "CHANGE_LOADING", value: true})

    const resultSub = data;
    resultSub.datetime = new Date().getTime();
    
    let GetidUser;

    await getData("@user").then((idUser)=>{
            GetidUser = idUser
    }).catch((err)=>{
        Alert.alert(err)
    })
    
    const newReference = await database().ref('/history_check/' + GetidUser + '/' ).push();
        
    newReference.set(resultSub).then((res) => { 

        Alert.alert("Riwayat Berhasil di simpan")
        props.navigation.push("History")

        dispatch({type : "CHANGE_LOADING", value: false})

        dispatch({type : "CHANGE_EGFR", value: false})
    }).catch((err)=>{
        Alert.alert(err)
    }); 

}

// Save Temp EGFR
export const addedResult = (props,data) => async (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})
    setTimeout(()=>{
        dispatch({type : "CHANGE_LOADING", value: false})
        dispatch({type : "CHANGE_EGFR", value: data})
        props.navigation.push("UACR")
    },2000)
}

export const addedResultUACR = (props,data) => async (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})
    setTimeout(()=>{
        dispatch({type : "CHANGE_LOADING", value: false})
        dispatch({type : "CHANGE_EGFR", value: data})
        props.navigation.push("UACRDiagnose")
    },2000)
}

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
            let getUid = userCredential.user._user;

            if(userData.isNewUser){
            
                const newReference = database().ref('/users/'+ getUid.uid).push();
                
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

const removeSession = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}
