import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config/axios";
import { API_URL } from "../config/context";
const Register = () => {
  const Navigate = useHistory();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [subscriptiontype, setsubscriptiontype] = useState("");
  const [Isloading, setIsloading] = useState(false);
  // console.log({ForObj})
//  console.log(ForObj.username.length)
  const handleSubmit = (e) => {
    e.preventDefault()
    switch (true) {
      case username==="":
        alert("please  enter username ")
        break;
      case firstname==="":
        alert("please  enter firstname ")
        break;
      case lastname==="":
        alert("please  enter lastname ")
        break;
      case subscriptiontype==="":
        alert("please  enter subscriptiontype ")
        break;
      case password.length < 6 :
        alert("please enter  password mx 6 charecters")
        break;
        case email==="":
          alert("please  enter email ")
          break;
      case password==="":
        alert("please  enter password ")
        break;
      case cpassword==="":
        alert("please  enter confirm password ")
        break;
      case password!==cpassword:
        alert("password do not match")
        break;
      default:
        break;
    }
    axios.post(`${instance.baseURL}auth/register`, {username,firstname, password,email,
      lastname,subscriptiontype
    })
      .then((res) => {
        console.log({ res });
        // localStorage.setItem('currentuser',JSON.stringify(res))
        alert(res.data.message)
        // Navigate.push('/')
        // Navigate.push('/')
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.message);
      });
  };
  return (
    <>
      <section className="position-relative pb-0">
        <div
          className="gen-register-page-background"
          style={{ backgroundImage: 'url("images/background/asset-3.jpeg")' }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <form id="pms_register-form" className="pms-form"  onSubmit={handleSubmit}>
                  <h4>Register</h4>
                  <ul className="pms-form-fields-wrapper pl-0">
                    <li className="pms-field pms-user-login-field ">
                      <label htmlFor="pms_user_login">Username *</label>
                      <input
                       onChange={(e) => setusername(e.target.value)}
                        id="pms_user_login"
                        name="username"
                        type="text"
                      />
                    </li>
                    <li className="pms-field pms-user-email-field ">
                      <label htmlFor="pms_user_email">E-mail *</label>
                      <input
                      onChange={(e) => setemail(e.target.value)}
                        id="pms_user_email"
                        name="email"
                        type="text"
                      />
                    </li>
                    <li className="pms-field pms-first-name-field ">
                      <label htmlFor="pms_first_name">First Name</label>
                      <input
                      onChange={(e) => setfirstname(e.target.value)}
                        id="pms_first_name"
                        name="firstname"
                        type="text"
                      />
                    </li>
                    <li className="pms-field pms-last-name-field ">
                      <label htmlFor="pms_last_name">Last Name</label>
                      <input
                      onChange={(e) => setlastname(e.target.value)}
                        id="pms_last_name"
                        name="lastname"
                        type="text"
                        
                      />
                    </li>
                    <li className="pms-field pms-pass1-field">
                      <label htmlFor="pms_pass1">Password *</label>
                      <input onChange={(e) => setpassword(e.target.value)} id="pms_pass1" name="password" type="password" />
                    </li>
                    <li className="pms-field pms-pass2-field">
                      <label htmlFor="pms_pass2">Repeat Password *</label>
                      <input  onChange={(e) => setcpassword(e.target.value)}  id="pms_pass2" name="passwordtwo" type="password" />
                    </li>
                    <li className="pms-field pms-field-subscriptions ">
                      <div className="pms-subscription-plan">
                        <label>
                          <input
                           onChange={(e) => setsubscriptiontype(e.target.value)}
                            type="radio"
                            name="subscription_plans"
                            data-duration={1}
                            defaultValue={199}
                            data-default-checked="false"
                          />
                          <span className="pms-subscription-plan-name">
                            Premium
                          </span>
                          <span className="pms-subscription-plan-price">
                            <span className="pms-divider"> -</span>
                            <span className="pms-subscription-plan-price-value">
                              199
                            </span>
                            <span className="pms-subscription-plan-currency">
                              Rs
                            </span>
                            <span className="pms-divider"> / </span>1 Month
                          </span>
                          <span className="pms-subscription-plan-trial" />
                          <span className="pms-subscription-plan-sign-up-fee" />
                        </label>
                      </div>
                      <div className="pms-subscription-plan">
                        <label>
                          <input 
                            onChange={(e) => setsubscriptiontype(e.target.value)}
                            type="radio"
                            name="subscription_plans"
                            data-duration={1}
                            defaultValue={99}
                            data-default-checked="false"
                          />
                          <span className="pms-subscription-plan-name">
                            Standard
                          </span>
                          <span className="pms-subscription-plan-price">
                            <span className="pms-divider"> -</span>
                            <span className="pms-subscription-plan-price-value">
                              99
                            </span>
                            <span className="pms-subscription-plan-currency">
                              Rs
                            </span>
                            <span className="pms-divider"> / </span>1 Month
                          </span>
                          <span className="pms-subscription-plan-trial" />
                          <span className="pms-subscription-plan-sign-up-fee" />
                        </label>
                      </div>
                    </li>
                  </ul>
                  <span
                    id="pms-submit-button-loading-placeholder-text"
                    className="d-none"
                  >
                   
                    Processing. Please wait...
                  </span>
                  <input
                    name="pms_register"
                    type="submit"
                    defaultValue="Register"
                  />
                <Link className="btn btn-primary" to={"/login"}>Login</Link>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
