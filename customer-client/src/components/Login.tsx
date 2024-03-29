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
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("danger");
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const { logIn } = authContext as AuthContextInterface;

    const navigator = useNavigate();

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setMessage("");
            setLoading(true);
            await logIn(email, password);
            setMessage(
                "User Logged in successfully! You'll be redirected in a couple of seconds."
            );
            setMessageType("info");
            setTimeout(() => {
                navigator("/");
            }, 3000);
        } catch {
            setMessage(
                "Failed to login to the account. Please check your credentials."
            );
            setMessageType("warning");
        }

        setLoading(false);
    };

    return (
        <>
            <Container id="logIn" className="p-3">
                <Row>
                    <h2>Log In!</h2>
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
                    <Link to={"/forgot-password"}>Forgot Password?</Link>
                    <Button
                        type="submit"
                        className="w-100 m-2"
                        disabled={loading}
                    >
                        Log In
                    </Button>
                </Form>
                <Row>
                    <h6>
                        If you don't have an account already, then{" "}
                        <Link to="/signup">Sign Up</Link>
                    </h6>
                </Row>
            </Container>
        </>
    );
};

export default LogIn;
