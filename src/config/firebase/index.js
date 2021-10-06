import {initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyARAFMIyqqufwjWEdNQxfyFL0-pHLzACOA",
    authDomain: "sayangi-ginjal.firebaseapp.com",
    databaseURL: "https://sayangi-ginjal-default-rtdb.firebaseio.com",
    projectId: "sayangi-ginjal",
    storageBucket: "sayangi-ginjal.appspot.com",
    messagingSenderId: "1015532825099",
    appId: "1:1015532825099:web:753a58faaab387becbf50e",
    measurementId: "G-SKMQP8SENB"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
  

export default app;