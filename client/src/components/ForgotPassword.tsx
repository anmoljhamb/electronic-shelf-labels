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

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("danger");
    const [loading, setLoading] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    const { forgotPassword } = authContext as AuthContextInterface;

    const navigator = useNavigate();

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            setMessage("");
            setLoading(true);
            await forgotPassword(email);
            setMessage(
                "Further email instructions have been set to your inbox. Redirecting to Login Page."
            );
            setMessageType("info");
            setTimeout(() => {
                navigator("/login");
            }, 3000);
        } catch {
            setMessage("Failed to find an account with that email.");
            setMessageType("warning");
        }

        setLoading(false);
    };

    return (
        <>
            <Container id="forgotPassword" className="p-3">
                <Row>
                    <h2>Forgot Password</h2>
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
                        Forgot Password
                    </Button>
                </Form>
                <Row>
                    <h6>
                        If you already have an account, then{" "}
                        <Link to="/login">Login</Link>
                    </h6>
                </Row>
            </Container>
        </>
    );
};

export default ForgotPassword;
