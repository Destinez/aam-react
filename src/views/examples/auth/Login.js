import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import setAuthToken from '../validation/authAuthToken'

const axios = require('axios').default;



function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorClass, setErrorClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      email: email,
      password: password
    }
    
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/login`,
      data: user,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    
    .then(function (response) {
      let res = response.data

      if (res.status === true && res.code === 200) {

        setMessage('Login Successful')
        setErrorClass('text-center d-flex justify-content-center badge badge-success')

        let token = res.data.token

        //set JWT token to local
        localStorage.setItem("token", token);
 
        //set token to axios common header
        setAuthToken(token);
 
        //redirect user to home page
        window.location.href = '/employees/manage-employees'
      }

      else if (res.status === false && res.code === 422) {
        
        if (res.errors.password) {
          setMessage(res.errors.password[0])
        }

        if (res.errors.email) {
          setMessage(res.errors.email[0])
        }

        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }

      else if (res.status === false && res.code === 423) {
        setMessage("Email or Password is incorrect")
        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo d-flex justify-content-center">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
              </div>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <div className={ errorClass }>{ message }</div>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" placeholder="Enter Email" size="lg" className="h-auto" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={ handleSubmit } to="#">LOGIN</button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input"/>
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a href="/auth/forgot-password" className="auth-link text-black">Forgot password?</a>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account? <Link to="/auth/register" className="text-primary">Create</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}
  

export default Login
