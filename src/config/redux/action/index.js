import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const getResultEGFRDB = (id) => (dispatch) =>{
    dispatch({type : "CHANGE_LOADING", value: true})
    return new Promise ((resolve,reject)=>{
        database().ref('/diagnose/ginjal/eGFR/' + id ).once('value')
        .then(snapshot => {
            if(snapshot.val()){
                resolve(snapshot.val())
                dispatch({type : "CHANGE_LOADING", value: false})
            }
        }).catch((Err)=>{
            resolve(false)
            Alert.alert(Err)
            dispatch({type : "CHANGE_LOADING", value: false})
        });
    });
}

export const getResultUACRDB = (id) => (dispatch) =>{
    console.log("UACR",id)
    dispatch({type : "CHANGE_LOADING", value: true})
    return new Promise ((resolve,reject)=>{
        database().ref('/diagnose/ginjal/UACR/' + id ).once('value')
        .then(snapshot => {
            if(snapshot.val()){
                console.log(snapshot.val())
                resolve(snapshot.val())
                dispatch({type : "CHANGE_LOADING", value: false})
            }
        }).catch((Err)=>{
            resolve(false)
            Alert.alert(Err)
            dispatch({type : "CHANGE_LOADING", value: false})
        });
    });
}


export const saveEGFR = (props,data) => (dispatch) => {
    
    dispatch({type : "CHANGE_LOADING", value: true})

    const dataUser = [];
    const Combine = data;

    getData("@user").then((idUser)=>{
        if(idUser){
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

                setTimeout(()=>{
                    dispatch({type : "CHANGE_EGFR", value: Combine})
                    dispatch({type : "CHANGE_LOADING", value: false})
                    props.navigation.push("eGFRDiagnose")
                },500)

            }).catch((Err)=>{
                Alert.alert(Err)
            });
        }else{
            dispatch({type : "CHANGE_EGFR", value: Combine})
            setTimeout(()=>{
                dispatch({type : "CHANGE_LOADING", value: false})
                props.navigation.push("eGFRDiagnose")
            },500)
        }

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
            dispatch({type : "CHANGE_LOADING", value: false})
            Alert.alert(Err)
        });
        
    }).catch((err)=>{
        Alert.alert(err)
        dispatch({type : "CHANGE_LOADING", value: false})
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
            dispatch({type : "CHANGE_LOADING", value: false})
        });


    }).catch((err)=>{
        Alert.alert(err)
    })
});
}

export const EditProfileFunction = (data,props) => (dispatch) =>{
    console.log(data)
    dispatch({type : "CHANGE_LOADING", value: true})

    getData("@user").then((userData)=>{
        database().ref('/users/' + userData ).once('value')
        .then(snapshot => {
        
        //get Data User on login
        Object.keys(snapshot.val()).map(key =>{
            console.log( snapshot.val()[key])
            database()
            .ref('/users/' + userData + '/' + key)
            .update(data)
            .then(() => {

                
                dispatch({type : "CHANGE_LOADING", value: false})
                dispatch({type : "CHANGE_USER", value: data})
               
                props.navigation.push("Profile")
                Alert.alert("Berhasil Edit")
        
            }).catch((Err)=>{
                Alert.alert(Err)
            });

        });
        
        }).catch((Err)=>{
            Alert.alert(Err)
        });
    });
    
}

export const getNavigator = (props) => (dispatch) =>{
    dispatch({type : "CHANGE_NAV", value: props})
}

export const removeProfile = () => (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})
    new Promise ((resolve,reject)=>{
        removeSession("@user").then((res)=>{
            if(res){
                resolve(res)
                dispatch({type : "CHANGE_USER", value: []})
                dispatch({type : "CHANGE_LOADING", value: false})
            }
        }).catch((err)=>{
            reject(err)
            Alert.alert("Gagal Keluar aplikasi")
            dispatch({type : "CHANGE_LOADING", value: false})
        })
    });
}

export const CheckUser = (props) => (dispatch) =>{

    dispatch({type : "CHANGE_LOADING", value: true})
    
    //check is user already register to db, if user not yet will redirect to login
    getData("@user").then((userData)=>{
        
        database().ref('/users/' + userData ).once('value')
        .then(snapshot => {
        
            if(!snapshot.val()){

                if(removeSession("@user")){
                    props.navigation.push("Dashboard")
                    dispatch({type : "CHANGE_ISLOGIN", value: false})
                }
            }else{
                //get Data User on login
                Object.keys(snapshot.val()).map(key =>{
                    dispatch({type : "CHANGE_USER", value: snapshot.val()[key]})
                });
                
                dispatch({type : "CHANGE_ISLOGIN", value: true})
                
                props.navigation.push("Dashboard")
            }
            
        }).catch((Err)=>{
            Alert.alert(Err)
        });
    }).catch((err)=>{
        Alert.alert(err)
    })

    dispatch({type : "CHANGE_LOADING", value: false})
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
    },500)
}

export const addedResultUACR = (props,data) => async (dispatch) => {
   
    dispatch({type : "CHANGE_LOADING", value: true})
    setTimeout(()=>{
        dispatch({type : "CHANGE_LOADING", value: false})
        dispatch({type : "CHANGE_EGFR", value: data})
        props.navigation.push("UACRDiagnose")
    },500)
}

export const SigninWithGoogle = (props) => async (dispatch) => {
    
    dispatch({type : "CHANGE_LOADING", value: true})
    return new Promise ((resolve,reject)=>{
        excuteLoginFirebase().then((userCredential)=>{

            let userData = userCredential.additionalUserInfo;
            let userDataDetail = userCredential.user._user;
   
            if(userData.isNewUser){

                const newReference = database().ref('/users/' + userDataDetail.uid).push();

                let dataSet = {
                    birthdate: null,
                    email: userData.profile.email,
                    gender:null,
                    fullname: userData.profile.name,
                    given_name: userData.profile.given_name,
                    phoneNumber : userDataDetail.phoneNumber,
                    photosUrl : userData.profile.picture
                }
                
                newReference.set(dataSet).then((RES) => { 
                }).catch((err)=>{
                    Alert.alert(err)
                });              
                
                storeData(userDataDetail.uid).then(()=>{
                        //this function is for redirect to dashboard and save data user after siginin
                        props.navigation.push("SplashScreen")
                }).catch((err)=>{
                    Alert.alert(err)
                })
                                
            }else{
                storeData(userDataDetail.uid).then(()=>{
       
                        //this function is for redirect to dashboard and save data user after siginin
                        props.navigation.push("SplashScreen")
                }).catch((err)=>{
                    Alert.alert(err)
                })
            }
            
            dispatch({type : "CHANGE_ISLOGIN", value: true})
            dispatch({type : "CHANGE_LOADING", value: false})

            resolve(true)
        }).catch((err)=>{

            dispatch({type : "CHANGE_LOADING", value: false})
            resolve(false)
        });
    });
}

export const SigninWithEmail = (data,props) => async (dispatch) => {
    dispatch({type : "CHANGE_LOADING", value: true})

    auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((res) => {
        let getUid = res.user._user;

        // Save uid for get detail user
        storeData(getUid.uid).then(()=>{
            //this function is for redirect to dashboard and save data user after siginin
            props.navigation.push("SplashScreen")
        }).catch(err=>{
            console.log(err)
        })
    })
    .catch(error => {
        if (error.code === 'auth/wrong-password') {
            Alert.alert('Password yang anda masukan salah!');
        }

        if (error.code === 'auth/user-not-found') {
            Alert.alert('User / Email tidak terdaftar, pastikan anda sudah melakukan pendaftaran.');
        }

        if (error.code === 'auth/invalid-email') {
            Alert.alert('Alamat email tidak valid');
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

            data.password = null;

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

    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@user', jsonValue)
      return true;
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