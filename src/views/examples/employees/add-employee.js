import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Select,
  Option,
  Row,
  Col
} from "reactstrap";
import setAuthToken from '../validation/authAuthToken'
import Header from "components/Headers/Header.js";
const axios = require('axios').default;


function AddEmployee() {

  const [lastName, setLastName] = useState("")
  const [firstName, setfirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [gender, setGender] = useState("")
  const [role, setRole] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [error, setError] = useState("")
  const [errorClass, setErrorClass] = useState("")

  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

  }, []);

  let handleForm = () => {
    if (firstName === "") {
      setError("First Name field is required")
      setErrorClass("text-danger")
    }
    else if (lastName === "") {
      setError("Last Name field is required")
      setErrorClass("text-danger")
    }
    else if (phoneNumber === "") {
      setError("Phone Number field is required")
      setErrorClass("text-danger")
    }
    else if (email === "") {
      setError("Email field is required")
      setErrorClass("text-danger")
    }
    else if (gender === "") {
      setError("Gender field is required")
      setErrorClass("text-danger")
    }
    else if (maritalStatus === "") {
      setError("Marital Status field is required")
      setErrorClass("text-danger")
    }
    else if (role === "") {
      setError("Role field is required")
      setErrorClass("text-danger")
    }
    else if (employeeId === "") {
      setError("Employer ID field is required")
      setErrorClass("text-danger")
    }
    else {
      return
    }
  }

  let handleAdd = (e) => {

    let token = localStorage.getItem("token");
    setAuthToken(token);

    let newEmployee = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      gender: gender,
      marital_status: maritalStatus,
      role: role,
      employee_id: employeeId,
      photo: "",
      middle_name: middleName
    }

    e.preventDefault()

    handleForm()

    axios({
      method: 'post',
      data: newEmployee,
      url: `${process.env.REACT_APP_SERVER_URL}/api/create-employee`,
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
          setError(res.data)
          setErrorClass("text-success")
        }
        else if (res.status === false && res.code === 403) {
          setError(res.data)
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

    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Employee</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Middle Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-middle-name"
                            placeholder="Middle Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="tolutek12@digitalswitch.net"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Employee ID.
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="DS/2022/04"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            placeholder="08100938403"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Addtitional Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Gender
                          </label>
                          <select className="form-control" id="exampleFormControlSelect2" onChange={e => setGender(e.target.value)} >
                            <option>--Select Gender--</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Role
                          </label>
                          <select className="form-control" id="exampleFormControlSelect2" onChange={e => setRole(e.target.value)} >
                            <option>--Select Role--</option>
                            <option value="admin" className=''>Admin</option>
                            <option value="Receiver" className=''>receiver</option>
                            <option value="Sender" className=''>Sender</option>
                            <option value="receiver and sender" className=''>Receiver & Sender</option>
                            <option value="read only" className=''>Read Only</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Marital Status
                          </label>
                          <select className="form-control" id="exampleFormControlSelect2" onChange={e => setMaritalStatus(e.target.value)} >

                            <option>--Select Marital Status--</option>
                            <option value="Single" className=''>Single</option>
                            <option value="Married" className=''>Married</option>
                            <option value="Seperated" className=''>Seperated</option>
                            <option value="Widowed" className=''>Widowed</option>

                          </select>
                        </FormGroup>
                      </Col>

                    </Row>
                    <Row className='mt-3'>
                      <Col lg="6">
                        <FormGroup>
                          <Button
                            className='w-100'
                            color="primary"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            size="lg"
                          >
                            Add
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>



    //   <div>
    //     <div className="page-header">
    //       <h3 className="page-title"> Employees </h3>
    //       <nav aria-label="breadcrumb">
    //         <ol className="breadcrumb">
    //           <li className="breadcrumb-item"><a href="" onClick={event => event.preventDefault()}>Employees</a></li>
    //           <li className="breadcrumb-item active" aria-current="page">Add Employee</li>
    //         </ol>
    //       </nav>
    //     </div>
    //     <div className="row">   
    //       <div className="col-md-11 grid-margin stretch-card mx-auto">
    //         <div className="card">
    //           <div className="card-body">
    //             <h4 className="card-title">Register Employee</h4>
    //             <div className='message-info'>
    //                 <h6 className={ errorClass }>
    //                   { error }
    //                 </h6>
    //             </div>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Profile Picture</label>
    //               <div className="input-group">
    //                 <Form.Control type="file" className="form-control" placeholder="Profile Picture" aria-label="ProfilePicture" aria-describedby="basic-addon1" onChange={e => setProfilePicture(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //             <label htmlFor="exampleFormControlSelect2">First Name</label>
    //               <div className="input-group">
    //                 <Form.Control type="text" className="form-control" placeholder="First Name" aria-label="FirstName" aria-describedby="basic-addon1" onChange={e => setfirstName(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //             <label htmlFor="exampleFormControlSelect2">Last Name</label>
    //               <div className="input-group">
    //                 <Form.Control type="text" className="form-control" placeholder="Last Name" aria-label="LastName" aria-describedby="basic-addon1" onChange={e => setLastName(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //             <label htmlFor="exampleFormControlSelect2">Middle Name</label>
    //               <div className="input-group">
    //                 <Form.Control type="text" className="form-control" placeholder="Middle Name" aria-label="MiddleName" aria-describedby="basic-addon1" onChange={e => setMiddleName(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //             <label htmlFor="exampleFormControlSelect2">Email</label>
    //               <div className="input-group">
    //                 <Form.Control type="email" className="form-control" placeholder='Email' onChange={e => setEmail(e.target.value)} />
    //                 {/* <div className="input-group-append">
    //                   <span className="input-group-text" type="email" placeholder='Email'>@digitalswitch.com</span>
    //                 </div> */}
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Employee ID.</label>
    //               <div className="input-group">
    //                 <Form.Control type="text" className="form-control" placeholder="Phone Number" aria-label="Phone" aria-describedby="basic-addon1" onChange={e => setPhoneNumber(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Select Gender</label>
    //               <select className="form-control" id="exampleFormControlSelect2" onChange={e => setGender(e.target.value)} >
    //               <option>--Select Gender--</option>
    //                 <option>Male</option>
    //                 <option>Female</option>
    //               </select>
    //             </Form.Group>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Select Role</label>
    //               <select className="form-control" id="exampleFormControlSelect2" onChange={e => setRole(e.target.value)} >
    //                 <option>--Select Role--</option>
    //                 <option value="admin" className=''>Admin</option>
    //                 <option value="Receiver" className=''>receiver</option>
    //                 <option value="Sender" className=''>Sender</option>
    //                 <option value="receiver and sender" className=''>Receiver & Sender</option>
    //                 <option value="read only" className=''>Read Only</option>
    //               </select>
    //             </Form.Group>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Select Marital Status</label>
    //               <select className="form-control" id="exampleFormControlSelect2" onChange={e => setMaritalStatus(e.target.value)} >

    //                 <option>--Select Marital Status--</option>
    //                 <option value="Single" className=''>Single</option>
    //                 <option value="Married" className=''>Married</option>
    //                 <option value="Seperated" className=''>Seperated</option>
    //                 <option value="Widowed" className=''>Widowed</option>

    //               </select>
    //             </Form.Group>
    //             <Form.Group>
    //               <label htmlFor="exampleFormControlSelect2">Employee ID.</label>
    //               <div className="input-group">
    //                 <Form.Control type="text" className="form-control" placeholder="Employer ID." aria-label="Employer ID" aria-describedby="basic-addon1" onChange={e => setEmployeeId(e.target.value)} />
    //               </div>
    //             </Form.Group>
    //             <button onClick={handleAdd} className="btn btn-primary">Add</button>
    //           </div>
    //         </div>
    //       </div>
    //   </div>
    // </div>
  )
}

export default AddEmployee
