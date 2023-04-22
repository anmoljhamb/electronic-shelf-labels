import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const SignUp = () => {
    return (
        <>
            <Container id="signUp" className="p-3">
                <Row>
                    <h3>Get Started and Sign Up</h3>
                </Row>
                <Form>
                    <Form.Group></Form.Group>
                </Form>
                <Button>Sign Up</Button>
            </Container>
        </>
    );
};

export default SignUp;
