
import App from './src/containers/pages/App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import firebase from './src/config/firebase';

console.log("Firbase Config =>",firebase)

AppRegistry.registerComponent(appName, () => App);
