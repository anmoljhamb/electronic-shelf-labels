import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCpassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const { signUp } = authContext as AuthContextInterface;

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== cpassword) {
            setLoading(false);
            setErrorMsg("The password's do not match.");
            return;
        }
    };

    return (
        <>
            <Container id="signUp" className="p-3">
                <Row>
                    <h2>Get Started and Sign Up</h2>
                </Row>
                <Form className="m-2" onSubmit={handleOnSubmit}>
                    <FloatingLabel className="m-2" label={"Email"}>
                        <Form.Control
                            type="email"
                            placeholder="example@abc.com"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                            }}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel className="m-2" label={"Password"}>
                        <Form.Control
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel className="m-2" label={"Confirm Password"}>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Your Password"
                            value={cpassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setCpassword(e.target.value);
                            }}
                            required
                        />
                    </FloatingLabel>
                    <Button
                        type="submit"
                        className="w-100 m-2"
                        disabled={loading}
                    >
                        Sign Up
                    </Button>
                </Form>
                <Row>
                    <h6>
                        If you have an account already, then{" "}
                        <a href="/login">Log In</a>
                    </h6>
                </Row>
            </Container>
        </>
    );
};

export default SignUp;
