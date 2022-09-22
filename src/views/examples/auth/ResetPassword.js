import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const axios = require('axios').default;


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let token = params.get('token');

  
  let handleChangePassword = (e) => {
    e.preventDefault()
  
    let passwordData = {
      password: password,
      password_confirmation: confirmPassword,
      reset_token: token
    }

    console.log(passwordData)

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/reset-password?token=${token}`,
      data: passwordData,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    .then(function (response) {
      console.log(response.data)

      let res = response.data

      if (res.status === false && res.code === 422) {

          if (res.errors.password) {
            setMessage(res.errors.password[0])
          }

          if (res.errors.reset_token) {
            setMessage(res.errors.reset_token[0])
          }

        setErrorClass("text-danger")
      }
      else if(res.status === true && res.code === 200){
        setMessage(res.message)
        setErrorClass('text-success')
      }
      else if(res.status === false && res.code === 423){
        setMessage(res.message)
        setErrorClass('text-danger')
      }
    })
    .catch(function (error) {
      console.log(error);
      setMessage("Oops! An error occurred")
        setErrorClass('text-danger')
    })
      
      
  
  }

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-12 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <span className={ errorClass }>{ message }</span>
                <Form className="pt-3">
                  
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Enter New Password" size="lg" className="h-auto" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Confirm New Password" size="lg" className="h-auto" onChange={e => setConfirmPassword(e.target.value)} />
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleChangePassword} >Change Password</button>
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

export default ResetPassword
