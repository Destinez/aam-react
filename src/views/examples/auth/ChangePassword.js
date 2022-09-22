import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
const axios = require('axios').default;


function ResetPassword() {


  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  let handleChangePassword = (e) => {
    e.preventDefault()
    
    if (newPassword !== password ) {
      setMessage("Passwords do not match")
      setErrorClass("text-danger")
    }

    else{
      let password = {
        password: password
      }

      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/api/forget-password`,
        data: password,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      .then(function (response) {
        console.log(response.data)
  
        let res = response.data

        if (res.status === false && res.code === 422) {
        
        }
      })
      
      
    }
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
                    <Form.Control type="password" placeholder="Enter Old Password" size="lg" className="h-auto" onChange={e => setOldPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Enter New Password" size="lg" className="h-auto" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Confirm New Password" size="lg" className="h-auto" onChange={e => setNewPassword(e.target.value)} />
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleChangePassword} >Change Password</button>
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
