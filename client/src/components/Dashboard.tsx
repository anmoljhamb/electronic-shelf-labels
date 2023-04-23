import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { logOut, currentUser } = authContext;
    const navigator = useNavigate();

    return (
        <Container className="p-3">
            <h1>This is my super important dashboard</h1>
            <p>Welcome {`${currentUser?.email}`}</p>
            <Row className="m-2">
                <Col>
                    <Button className="w-100" onClick={logOut}>
                        Log Out
                    </Button>
                </Col>
                <Col>
                    <Button
                        className="w-100"
                        variant="secondary"
                        onClick={() => {
                            navigator("/update-profile");
                        }}
                    >
                        Update Profile
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
