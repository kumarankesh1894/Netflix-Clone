import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { login,signUp } from '../../Firebase'



const Login = () => {
const [signState,setSignState] = useState("Sign In");
const[name,setName] = useState("");
const[email,setEmail] = useState("");
const [password,setPassword] = useState("");

const userAuth = async(e)=>{
  e.preventDefault();
  if(signState==="Sign In"){
    await login(email,password);
  }else{
    await signUp(name,email,password);
  }

}



  return (
    <div className='login'>
      <img src={logo} className="login-logo"/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up" ?
           <input type="text" value={name} placeholder="Your Name" onChange={(e)=>{setName(e.target.value)}}/> : <></>}
          <input type="email" value={email} placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" value={password} placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
          <button onClick={userAuth}>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
    <div className="form-switch">

      {signState==="Sign In"? 
      <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p> :
      <p>Already Have Account? <span onClick={()=>(setSignState("Sign In"))}>Sign In Now</span></p>
      }

    </div>
      </div>
    </div>
  )
}

export default Login