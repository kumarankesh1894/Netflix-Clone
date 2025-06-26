import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBNL2onWap_sAbz_CFFxSBFvju4yCl-wtA",
  authDomain: "netflix-clone-7c7a4.firebaseapp.com",
  projectId: "netflix-clone-7c7a4",
  storageBucket: "netflix-clone-7c7a4.firebasestorage.app",
  messagingSenderId: "916463568351",
  appId: "1:916463568351:web:7a51dbca8377378577306a",
  measurementId: "G-LPXJ3P9H2K"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async(name,email,password)=>{
  try {
   const res =  await createUserWithEmailAndPassword(auth,email,password);
   const user = res.user;
   await addDoc(collection(db,"user"),{
    uid:user.uid,
    name,
    authProvider:"local",
    email,
   })
  } catch (error) {
    console.error(error);
    toast(error.code.split("/")[1].split("-").join(" "));
  }
}


const login = async(email,password)=>{
  try {
     await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
   console.log(error);
   toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth,db,login,signUp,logout};