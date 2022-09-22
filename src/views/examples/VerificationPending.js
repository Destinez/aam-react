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
import setAuthToken from './validation/authAuthToken'
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
      <Container className="mt--7 " fluid>
        <Row>
          <Col className="order-xl-2 mb- mb-xl-0" xl="12">
            <Card className="card-profile shadow">

              <CardBody className="pt-0 pt-md-4 d-flex justify-content-center align-items-center">
                <div>
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div className='h2'>
                          <span id='oops' className="heading badge bg-gradient-warning fs-7">Ooops!</span>

                        </div>
                      </div>
                    </div>
                  </Row>

                  <Row className="mt-1">
                    <Col lg="12" className="mt-1">
                      <div className="text-center text-danger">
                        You have not verified your account. Check your email to complete verification
                      </div>
                    </Col>
                    <Col lg="12" className='mt-2'>
                      <div className="text-center">
                        <Button className="w-50" color="primary" type="button">
                          Resend Verification Link
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </>

  )
}

export default EmployeeDetails
