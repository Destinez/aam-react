import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Select,
  Option,
  Row,
  Col
} from "reactstrap";
import setAuthToken from './validation/authAuthToken'
import Header from "components/Headers/Header.js";
const axios = require('axios').default;


function ChangePassword() {



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
                    <h3 className="mb-0">Change Password</h3>
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
                    User Security information
                  </h6>
                  <div className="pl-lg-4">

                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Old Password
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter Old Password"
                              type="password"
                              autoComplete="new-password"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            New Password
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter New Password"
                              type="password"
                              autoComplete="new-password"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Confirm New Password
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Re-enter New Password"
                              type="password"
                              autoComplete="new-password"
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                  </div>
                  <div className="pl-lg-4">

                    <Row className='mt-3 justify-content-center'>
                      <Col lg="6">
                        <FormGroup>
                          <Button
                            className='w-100'
                            color="primary"
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            size="lg"
                          >
                            Change Password
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


  )
}

export default ChangePassword
