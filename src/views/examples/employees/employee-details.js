import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
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

function EmployeeDetails() {

  const { employeeId } = useParams()

  const [employeeDetails, setEmployeeDetails] = useState([])
  const [message, setMessage] = useState("")
  const [errorClass, setErrorClass] = useState("")

  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

    fetchEmployeeDetails(token)

  }, []);


  let fetchEmployeeDetails = (token) => {

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/api/employee-details/${employeeId}`,
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

      .then(function (response) {
        let res = response.data

        if (res.status === false && res.code === 423) {
          setMessage(res.message)
          setErrorClass('text-danger')
        }

        // else if (res[0].status === false && res[0].code === 403) {
        //     setMessage(res[0].message)
        //     setErrorClass('text-danger')
        // }

        else if (res.status === true && res.code === 200) {
          setEmployeeDetails(res.data)
          console.log(res.data)
        }
      })

      .catch(function (error) {
        console.log(error);
      })
  }


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="">
                <Col className="order-lg-2" lg="12">
                  <div className="card-profile-image">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading badge bg-gradient-warning">22</span>
                        <span className="description text-primary">Todos</span>
                      </div>
                    </div>
                  </div>
                </Row>

                <Row>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">NAME</span>
                        <span className="description">Obaro Destiny</span>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">ROLE</span>
                        <span className="description">Admin</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">EMAIL</span>
                        <span className="description">Obarodesinez@digitalswitch.net</span>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">PHONE NUMBER</span>
                        <span className="description">08106551521</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">Gender</span>
                        <span className="description">Male</span>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="card-profile-stats">
                      <div>
                        <span className="heading">Marital Status</span>
                        <span className="description">Married</span>
                      </div>
                    </div>
                  </Col>
                </Row>
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
    //           <li className="breadcrumb-item active" aria-current="page">Employee Details</li>
    //         </ol>
    //       </nav>
    //     </div>
    //     <div className="row">   
    //       <div className="col-md-11 grid-margin stretch-card mx-auto">
    //         <div className="card">
    //           <div className="card-body">
    //             <h4 className="card-title text-center">Employee Details</h4>
    //             <div className='container'>
    //               <div className='employee-info'>
    //                   <div className='profile-picture d-flex '>
    //                     <img src={ employeeDetails.photo } className="img-fluid" ></img>
    //                   </div>
    //                   <h6 className={errorClass}>
    //                     { message }
    //                   </h6>
    //                   <div className='row'>
    //                     <div className='col-md-6'>
    //                       <span className='text-muted'>Name</span>
    //                       <p className='text-dark'>{ employeeDetails.last_name } { employeeDetails.first_name } { employeeDetails.middle_name }</p>
    //                     </div>
    //                     <div className='col-md-6'>
    //                       <span className='text-muted'>Role</span>
    //                       <p className='text-dark'>{ employeeDetails.role } </p>
    //                     </div>

    //                   </div>
    //                   <div className='row'>
    //                     <div className='col-md-6'>
    //                       <span className='text-muted'>Email</span>
    //                       <p className='text-dark'>{ employeeDetails.email }
    //                       </p>
    //                     </div>
    //                     <div className='col-md-6'>
    //                       <span className='text-muted'>Phone</span>
    //                       <p className='text-dark'>{ employeeDetails.phone_number ? employeeDetails.phone_number : "----" } </p>
    //                     </div>

    //                   </div>
    //                   <div className='row'>
    //                     <div className='col-md-6'>
    //                       <span className='text-muted'>Gender</span>
    //                       <p className='text-dark'>{ employeeDetails.gender ? employeeDetails.gender : "-----"}
    //                       </p>
    //                     </div>
    //                     <div className='col-md-6'>
    //                     <span className='text-muted'>Marital Status</span>
    //                       <p className='text-dark'>{ employeeDetails.marital_status ? employeeDetails.marital_status : "-----" }
    //                       </p>
    //                     </div>
    //                   </div>
    //               </div>
    //             </div>


    //             {/* <button className="btn btn-primary">Add</button> */}
    //           </div>
    //         </div>
    //       </div>
    //   </div>
    // </div>
  )
}

export default EmployeeDetails
