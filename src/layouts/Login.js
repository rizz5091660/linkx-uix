import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import LoginNavbar from "../components/layout/LoginNavbar/LoginNavbar";
import LoginFooter from "../components/layout/LoginFooter";

const LoginLayout = ({ children, noNavbar, noFooter }) => (
    <Container fluid>
        <Row>

            <Col
                className="main-content p-0"
                lg={{ size: 12, offset: 0 }}
                md={{ size: 12, offset: 0 }}
                sm="12"
                tag="main"
            >
                {!noNavbar && <LoginNavbar />}
                {children}
                {!noFooter && <LoginFooter />}
            </Col>
        </Row>
    </Container>
);

LoginLayout.propTypes = {
    /**
     * Whether to display the navbar, or not.
     */
    noNavbar: PropTypes.bool,
    /**
     * Whether to display the footer, or not.
     */
    noFooter: PropTypes.bool
};


LoginLayout.defaultProps = {
    noNavbar: false,
    noFooter: false
};

export default LoginLayout;