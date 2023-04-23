import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import {
    Alert,
    Button,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCpassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("danger");
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const { signUp } = authContext as AuthContextInterface;

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== cpassword) {
            setLoading(false);
            setMessage("The password's do not match.");
            return;
        }

        try {
            setMessage("");
            setLoading(true);
            await signUp(email, password);
            setMessage("User created Successfully!");
            setMessageType("info");
        } catch {
            setMessage("Failed to create the account.");
        }

        setLoading(false);
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
                    {message.length > 0 && (
                        <Row className="m-2 mb-0">
                            <Alert
                                show={message.length > 0}
                                onClose={() => setMessage("")}
                                dismissible
                                variant={messageType}
                            >
                                {message}
                            </Alert>
                        </Row>
                    )}
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
                        <Link to="/login">Log In</Link>
                    </h6>
                </Row>
            </Container>
        </>
    );
};

export default SignUp;
