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
  Row,
  Col
} from "reactstrap";

const ResetPassword = () => {
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-info mb-4">
              <h3 className="text-primary">Reset Password</h3>
            </div>
            <div className="text-muted mb-1">
              <small>You can now reset your password</small>
            </div>
            <Form role="form">
            <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <div className="text-center">
                  <Button className="my-2 w-100" color="primary" type="button">
                    Change Password
                  </Button>
                </div>
              </FormGroup>

              <Row className="mt-3">

                <Col className="text-center" xs="12">
                  Don't have an account?
                  <a
                    className="text-primary"
                    href="/auth/register"

                  >
                    <span className="ml-1">Sign Up</span>
                  </a>
                </Col>
              </Row>

            </Form>
          </CardBody>
        </Card>

      </Col>
    </>
  );
};

export default ResetPassword;
