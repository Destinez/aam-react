
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="12">
              <div className="copyright text-center text-muted">
                © {new Date().getFullYear()}{" "} | Powered by
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.digitalswitch.net"
                  target="_blank"
                >
                   Digital Switch
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
