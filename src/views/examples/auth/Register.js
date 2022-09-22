import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { AUTHENTICATED, NOT_AUTHENTICATED } from './../actions/actionTypes'

const axios = require('axios').default;

export class Register extends Component {
  
  constructor(props){
    super(props);

    this.state = {first_name: '', last_name: '', email: '', password: '', confirm_password: '', token: '', type: '', message: ''};
  
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleToken = this.handleToken.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstName(e){
    this.setState({
      first_name: e.target.value
    })
  }
  handleLastName(e){
    this.setState({
      last_name: e.target.value
    })
  }
  handleEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  handleConfirmPassword(e){
    this.setState({
      confirm_password: e.target.value
    })
  }
  handleType(e){
    this.setState({
      type: e.target.value
    })
  }
  handleToken(e){
    this.setState({
      token: e.target.value
    })
  }

  handleMessage(msg){
    this.setState({
      message: msg
    })
  }
  

  handleSubmit(e){
    let { token } = this.props.match.params;
    e.preventDefault();

    const user = JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password : this.state.password,
      password_confirmation : this.state.confirm_password,
      token: token,
      type: 1
    })

    console.log(user)


    if (user.password !== user.confirm_password) {
      let msg = "Password doesn't match"
      this.handleMessage(msg)
    }

    else{
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_SERVER_URL}/api/register`,
        data: user,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(function (response) {

        token  =  response.data.data.token;

        console.log(token)
        console.log(response.data)

        localStorage.setItem("token", token);
        // dispatch({ type: AUTHENTICATED, payload: user })

      })
      .catch(function (error) {
        console.log(error);
      });
    }    
  }

  render() {
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
                <form className="pt-3" onSubmit = { this.handleSubmit } method='post'>
                  {/* <span className='message'>{this.handleMessage}</span> */}
                  <div className="row">
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" name='first_name' placeholder="Enter First Name" onChange={this.handleFirstName} />
                    </div>
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" name='last_name' placeholder="Enter Last Name" onChange={this.handleLastName} />
                    </div>
                  </div>    
                  
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" name='email' placeholder="Enter Email" onChange={this.handleEmail} />
                  </div>
                  
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" name='password' placeholder="Password" onChange={this.handlePassword} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" name='confirm_password' placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                  </div>


                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="">SIGN UP</button>
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
}

export default Register
