import React, { useEffect, useState } from 'react';
import setAuthToken from '../validation/authAuthToken'
import Header from "components/Headers/Header.js";
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

const axios = require('axios').default;


function InvitationLink() {

  const [copy, setCopy] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("1")
  const [link, setLink] = useState("")
  const [error, setError] = useState("")
  const [errorClass, setErrorClass] = useState("")

  useEffect(() => {
    let token = localStorage.getItem("token");
    setAuthToken(token);

  }, []);


  let handleTypeChange = (e) => {

    const { name, value } = e.target;
    console.log(name, value)

    setType(value)
    console.log(type)
  }


  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(link)
  }



  let generateLink = (e) => {

    let token = localStorage.getItem("token");
    setAuthToken(token);
    e.preventDefault()

    let data = {
      type: type
    }


    axios({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/generate-invitation-link`,
      data: data,
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
          setLink(res.data)
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
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Generate Invitation Link</h3>
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

            <Card className="card-profile shadow">
              <Row className="justify-content-center">
              <Col className="p-lg-4" lg="12">
                <div className="col-md-12 grid-margin stretch-card mx-auto">
                      <div className="invitation-link mt-5">
                        <div className='d-flex'>
                          <input defaultChecked type="radio" className="" onChange={handleTypeChange} name='type' value="1" />Allow any Email
                        </div>
                        <div className='d-flex'>
                          <input type="radio" className="" onChange={handleTypeChange} name='type' value="0" />Allow Emails with only this Domain
                        </div>
                      </div>
                      <div className="">
                        <FormGroup>
                          <div className="input-group">

                            <div className={`input-group-append ${type === "1" ? "d-none" : "null"}`}>
                              <span className="input-group-text text-dark">@digitalswitch.com</span>
                            </div>
                          </div>
                        </FormGroup>
                      </div>

                      <button onClick={generateLink} className="btn btn-primary"><i className="mdi mdi-link"></i> Generate Link</button>
                      <div className='jumbotron mt-3'>
                        <div className='message-info p-2'>
                          <h6 className={errorClass}>
                            {error}
                          </h6>
                          <p className='text-info'>
                            <i>{link}</i>
                            <button onClick={(e) => handleCopy(e)} className={`btn btn-secondary ${link ? "d-block" : "d-none"}`}>Copy</button>
                          </p>
                        </div>
                      </div>
                </div>
                </Col>
              </Row>
            </Card>
            </Card>
          </Col>
        </Row>
      </Container>


    </>


  )
}

export default InvitationLink
