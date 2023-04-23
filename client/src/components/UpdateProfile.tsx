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

const SignUp = () => {
    const authContext = useContext(AuthContext);
    const { currentUser, updateUserEmail, updateUserPassword } =
        authContext as AuthContextInterface;
    const [email, setEmail] = useState<string>(currentUser?.email as string);
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCpassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [messageType, setMessageType] = useState<string>("danger");
    const [loading, setLoading] = useState<boolean>(false);

    const navigator = useNavigate();

    const handleOnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (email !== currentUser?.email) {
            try {
                await updateUserEmail(email);
                setMessage("Email updated successfully!");
                setMessageType("info");
            } catch (error) {
                setMessage("Cannot update the profile.");
                setMessageType("warning");
                console.log(error);
            }
        }

        if (password.length > 0 && cpassword.length > 0) {
            if (password !== cpassword) {
                setMessage("The password's do not match.");
                return;
            }
            try {
                setMessage("");
                setLoading(true);
                await updateUserPassword(password);
                setMessage("Profile Updated successfully!");
                setMessageType("info");
            } catch (error) {
                setMessage("Failed to update the profile.");
                console.log(error);
            }
        }

        setLoading(false);
    };

    return (
        <>
            <Container id="signUp" className="p-3">
                <Row>
                    <h2>Update Profile</h2>
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
                        />
                        <Form.Text>
                            Leave the passwords empty to keep it same
                        </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel className="m-2" label={"Confirm Password"}>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Your Password"
                            value={cpassword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setCpassword(e.target.value);
                            }}
                        />
                        <Form.Text>
                            Leave the passwords empty to keep it same
                        </Form.Text>
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
                        Update Profile
                    </Button>
                </Form>
                <Link to={"/"} className="btn btn-secondary">
                    Cancel
                </Link>
            </Container>
        </>
    );
};

export default SignUp;
