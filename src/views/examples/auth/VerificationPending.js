import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios').default;

function VerificationPending (){
  useEffect(() => {
    
  }, []);

  let handleResend = (e) => {
    e.preventDefault()

    let token = localStorage.getItem("token")

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/resend-verification-link`,
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    .then(function (response) {
      let res = response.data

      if (res.status === true && res.code === 200) {
        
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
          <div className="col-lg-12 mx-auto min-vh-100">
            <div className="auth-form-light d-flex align-items-center text-left py-5 px-4 px-sm-5 h-75">
              <div className='container'>
                <div className='d-flex justify-content-center'>
                  <div className='message-info'>
                    <h1 className='text-warning text-center'>Oooops!</h1>
                    <h6 className='text-danger'>
                      
                      You have not verified your account. Check your email to complete verification 
                    </h6>
                  </div>
                </div>
                <button className='btn btn-primary w-100' onClick={handleResend} >Resend Verification Link</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default VerificationPending
