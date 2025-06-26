import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "Enter Your Api Key Here",
  authDomain: "Enter You auto domain here",
  projectId: "Enter your Project Id Here",
  storageBucket: "Enter Your Storage Bucket here",
  messagingSenderId: "enter your sender id here",
  appId: "enter your app id here",
  measurementId: "enter your measurementId here"
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
