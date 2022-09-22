
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
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
  );
};

export default Footer;
