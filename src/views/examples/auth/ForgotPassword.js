import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
const axios = require('axios').default;


function ForgotPassword () {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    let mail = {
      email: email
    }
    
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/forget-password`,
      data: mail,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    .then(function (response) {
      console.log(response.data)

      let res = response.data

      if (res.status === false && res.code === 423) {
        setMessage(res.message)
        setErrorClass('text-danger')
      }
      else if (res.status === false && res.code === 422) {
        setMessage(res.errors.email[0])
        setErrorClass('text-danger')
      }
      else if (res.status === true && res.code === 200) {
        setMessage(res.message)
        setErrorClass('text-success')
      }
      else{

      }
    })

    .catch(function (error) {
      console.log(error);
    })

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
                <h3 className='text-center my-2'>Forgot Password</h3>
                <span className={ errorClass }>{ message }</span>
                <Form className="pt-3">

                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter Email" size="lg" className="h-auto" />
                  </Form.Group>

                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={handleSubmit}>Reset Password</ Button>
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

export default ForgotPassword
