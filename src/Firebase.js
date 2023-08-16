import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDOGElHCwjXdUOka_H_wrLTSfV0jdozA_k",
  authDomain: "news-app-73128.firebaseapp.com",
  projectId: "news-app-73128",
  storageBucket: "news-app-73128.appspot.com",
  messagingSenderId: "777016565551",
  appId: "1:777016565551:web:09158c4fefa3f6391f8bda",
  measurementId: "G-B4NHQ7NY6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);




// export const auth = getAuth(app);

// const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => {
//     signInWithPopup(auth, provider).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error);
//     });
// }