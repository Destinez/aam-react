import React, { useState, Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import setAuthToken from '../validation/authAuthToken'
const axios = require('axios').default;



function RegisterCustom(){

  let { token } = useParams()
  
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const type = 0
  // const [token, setToken] = useState("")
  
  
  const handleSignUp = (e) => {
  
    e.preventDefault();

    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      type: type,
      token: token,
      password: password,
      password_confirmation: confirmPassword,
    }

    console.log(user)

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/register`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    .then(function (response) {
      console.log(response.data);
      let res = response.data

      if (res.status === true && res.code === 200) {
        setMessage(res.message)

        let token = res.data.token
        setErrorClass('text-center d-flex justify-content-center badge badge-success')

        //set JWT token to local
        localStorage.setItem("token", token);
 
        //set token to axios common header
        setAuthToken(token);
 
        //redirect user to home page
        window.location.href = '/employees/manage-employees'
      }

      else if (res.status === false && res.code === 422) {

        if (res.errors.first_name) {
          setMessage(res.errors.first_name[0])
        }
        else if (res.errors.last_name) {
          setMessage(res.errors.last_name[0])
        }
      
        else if (res.errors.email) {
          setMessage(res.errors.email[0])
        }
        else if (res.errors.password) {
          setMessage(res.errors.password[0])
        }
  
        else if (res.errors.token) {
          setMessage(res.errors.token[0])
        }
        else if (res.errors.type) {
          setMessage(res.errors.type[0])
        }

        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }

      else if (res.status === false && res.code === 423) {
        setMessage(res.message)
        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }

      else{
        setMessage("An Error Occured")
        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }
    })

    .catch(function (error) {
      console.log(error);
      setMessage("An Error Occured")
      setErrorClass("text-center d-flex justify-content-center badge badge-danger")
    });
    

    
  }

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-6 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo d-flex justify-content-center">
                  <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>

                <h4>Sign Up</h4>
                <form className="pt-3" onSubmit = { handleSignUp } method='post'>
                <div className={ errorClass }>{ message }</div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control form-control-lg" id="exampleInputFirstName" name='first_name' placeholder="Enter First Name" onChange={ e => setFirstName(e.target.value) } />
                    </div>
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control form-control-lg" id="exampleInputLastName" name='last_name' placeholder="Enter Last Name" onChange={ e => setLastName(e.target.value) } />
                    </div>
                  </div>    
                  
                 
                  <Form.Group>
                    <div className="input-group">
                      <Form.Control type="email" onChange={ e => setEmail(e.target.value) } id="exampleInputEmail1" placeholder='Enter Custom Email' className="form-control" aria-label="Enter Email" />
                      <div className="input-group-append">
                        <span className="input-group-text text-dark">@digitalswitch.com</span>
                      </div>
                    </div>
                  </Form.Group>
                  
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword" name='password' placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputConfirmPassword" name='confirm_password' placeholder="Confirm Password" onChange={ e => setConfirmPassword(e.target.value) } />
                  </div>

              

                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" required className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button onClick={ handleSignUp } className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="">SIGN UP</button>
                  </div>
                  <div className="text-center mt-4 font-weight-light" >
                    Already have an account? <Link to="/auth/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default RegisterCustom
