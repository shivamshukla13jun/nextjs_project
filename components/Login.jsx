import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from '../config/axios'
import { UseUserContext } from './context/UserContextAppProvider'
const Login = () => {
const {UserData,usertoken,Logout,setToken}=UseUserContext()
  const Navigate=useHistory()
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
   const  handleSubmit=(e)=>{
    e.preventDefault()
       switch (true) {
        case email==="":
          alert("please  enter email ")
          break;
      case password==="":
        alert("please  enter password ")
        break;
       
        default:
          break;
       }
      axios.post(instance.baseURL+'auth/login',{email,password}).then((res)=>{
        localStorage.setItem('currentuser',JSON.stringify(res.data.data))
        setToken(res.data.data.accessToken)
        Navigate.push('/')
      }).catch((err)=>{
        // console.log({err:err.response.data.message})
       alert(err.response.data.message)
      })
   }
  return (
    <section className="position-relative pb-0">
    <div className="gen-login-page-background" style={{backgroundImage: 'url("images/background/asset-54.jpg")'}} />
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <form name="pms_login" id="pms_login" onSubmit={handleSubmit} method="post">
              <h4>Sign In</h4>
              <p className="login-username">
                <label htmlFor="user_login">Email Address</label>
                <input  onChange={(e) => setemail(e.target.value)} type="text" name="email" id="user_login" className="input" />
              </p>
              <p className="login-password">
                <label htmlFor="user_pass">Password</label>
                <input  onChange={(e) => setpassword(e.target.value)} type="password" name="password" id="user_pass" className="input"  />
              </p>
              <p className="login-remember">
                <label>
                  <input name="rememberme" type="checkbox" id="rememberme" defaultValue="forever" /> Remember
                  Me </label>
              </p>
              <p className="login-submit">
                <input type="submit" name="wp-submit" id="wp-submit" className="button button-primary" defaultValue="Log In" />
                <input type="hidden" name="redirect_to" />
              </p>
             <a ><Link to={"/register"}>Register</Link></a> 
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}

export default Login