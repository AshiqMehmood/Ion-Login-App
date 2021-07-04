import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBnlXzDbp0NH8x_AFTOBjNp_CfiV0gBAaQ",
    authDomain: "rainfall-monitor.firebaseapp.com",
    projectId: "rainfall-monitor",
    storageBucket: "rainfall-monitor.appspot.com",
    messagingSenderId: "788449397129",
    appId: "1:788449397129:web:0ee66512e23a17c5bdb958",
    measurementId: "G-E3VGSFMHKJ"

}

firebase.initializeApp(config);

export default firebase;