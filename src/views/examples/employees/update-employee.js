import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import setAuthToken from '../validation/authAuthToken'
const axios = require('axios').default;

function UpdateEmployee(){

  const { id } = useParams()

  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [gender, setGender] = useState("")
  const [role, setRole] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [employeeDetails, setEmployeeDetails] = useState([])
  const [error, setError] = useState("")
  const [errorClass, setErrorClass] = useState("")


  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

    fetchEmployeeDetails(token)

  }, []);


  let fetchEmployeeDetails = (token) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/api/employee-details/${id}`,
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    })
      
    .then(function (response) {
      let res = response.data
      
      if ( res.status === false && res.code === 423) {
          setError(res.message)
          setErrorClass('text-danger')
      }
      else if (res.status === true && res.code === 200) {
          let employee = res.data
          setLastName(employee.last_name)
          setFirstName(employee.first_name)
          setMiddleName(employee.middle_name)
          setGender(employee.gender)
          setRole(employee.role)
          setEmployeeId(employee.employee_id)
          setPhoneNumber(employee.phone_number)
          setProfilePicture(employee.photo)
          setEmail(employee.email)
          setMaritalStatus(employee.marital_status)
      }
    })

    .catch(function (error) {
      console.log(error);
    })
  }
  


  let handleUpdate = (e) => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

    e.preventDefault()

    let employee = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      gender: gender,
      marital_status: maritalStatus,
      role: role,
      employee_id: employeeId,
      photo: "",
      middle_name: middleName,
      user_id: id
    }


    axios({
      method: 'post',
      data: employee,
      url: `${process.env.REACT_APP_SERVER_URL}/api/update-employee`,
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
    })
      
    .then(function (response) {
      let res = response.data
      console.log(res)

      if (res.status === false && res.code === 424) {
          window.location.href = '/auth/verification-pending'
      }

      else if (res.status === true && res.code === 200) {
          setError(res.message)
          setErrorClass("text-success")
      }
      else if (res.status === false && res.code === 403) {
          setError(res.message)
          setErrorClass("text-success")
      }

      else if (res.status === false && res.code === 424) {
        setError(res.message)
        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }

      else if (res.status === false && res.code === 422) {

        if (res.errors.first_name) {
          setError(res.errors.first_name[0])
        }
        else if (res.errors.last_name) {
          setError(res.errors.last_name[0])
        }
        else if (res.errors.email) {
          setError(res.errors.email[0])
        }
        else if (res.errors.gender) {
          setError(res.errors.gender[0])
        }
        else if (res.errors.role) {
          setError(res.errors.role[0])
        }
        else if (res.errors.marital_status) {
          setError(res.errors.marital_status[0])
        }
        else if (res.errors.employee_id) {
          setError(res.errors.employee_id[0])
        }

        setErrorClass("text-center d-flex justify-content-center badge badge-danger")
      }
    })

    .catch(function (error) {
      console.log(error);
    });

  }

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Employees </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="" onClick={event => event.preventDefault()}>Employees</a></li>
              <li className="breadcrumb-item active" aria-current="page">Update Employee</li>
            </ol>
          </nav>
        </div>
        <div className="row">   
          <div className="col-md-12 grid-margin stretch-card mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">Update Employee Details</h4>
                <div className='profile-picture d-flex justify-content-center'>
                  <img src={ profilePicture } className="img-fluid"></img>
                </div>
                <div className='message-info'>
                  <h6 className={ errorClass }>
                    { error }
                  </h6>
                </div>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Profile Picture</label>
                  <div className="input-group">
                    <Form.Control type="file" className="form-control" placeholder="Profile Picture" aria-label="ProfilePicture" aria-describedby="basic-addon1" onChange={e => setProfilePicture(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleFormControlSelect2">First Name</label>
                  <div className="input-group">
                    <Form.Control type="text" className="form-control" placeholder="First Name" aria-label="FirstName" aria-describedby="basic-addon1" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleFormControlSelect2">Last Name</label>
                  <div className="input-group">
                    <Form.Control type="text" className="form-control" placeholder="Last Name" aria-label="LastName" aria-describedby="basic-addon1"  value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleFormControlSelect2">Middle Name</label>
                  <div className="input-group">
                    <Form.Control type="text" className="form-control" placeholder="Middle Name" aria-label="MiddleName" aria-describedby="basic-addon1"  value={middleName} onChange={e => setMiddleName(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Email</label>
                  <div className="input-group">
                    <Form.Control type="email" className="form-control"  value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Phone Number</label>
                  <div className="input-group">
                    <Form.Control type="text" className="form-control"  value={phoneNumber} placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Employee ID.</label>
                  <div className="input-group">
                    <Form.Control type="text" className="form-control" placeholder="Employee ID." aria-label="EmployeeId" aria-describedby="basic-addon1"  value={employeeId} onChange={e => setEmployeeId(e.target.value)} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Select Gender</label>
                  <select className="form-control" id="exampleFormControlSelect2"  value={gender}  onChange={e => setGender(e.target.value)} >
                  <option>--Select Gender--</option>
                    <option>Male</option>
                    <option>Female</option>
                    
                  </select>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Select Role</label>
                  <select className="form-control" id="exampleFormControlSelect2"  value={role} onChange={e => setRole(e.target.value)} >
                    <option>--Select Role--</option>
                    <option value="admin" className=''>Admin</option>
                    <option value="receiver" className=''>Receiver</option>
                    <option value="sender" className=''>Sender</option>
                    <option value="receiver and sender" className=''>Receiver & Sender</option>
                    <option value="read only" className=''>Read Only</option>
                  </select>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleFormControlSelect2">Select Marital Status</label>
                  <select  className="form-control" id="exampleFormControlSelect2"  value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} >

                    <option>--Select Marital Status--</option>
                    <option value="Single" className=''>Single</option>
                    <option value="Married" className=''>Married</option>
                    <option value="Seperated" className=''>Seperated</option>
                    <option value="Widowed" className=''>Widowed</option>
                   
                  </select>
                </Form.Group>
                <button onClick={handleUpdate} className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }

export default UpdateEmployee
