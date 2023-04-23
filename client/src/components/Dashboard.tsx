import React, { useContext } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";
import { User } from "firebase/auth";

const Dashboard = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { logOut, currentUser } = authContext;

    return (
        <Container className="p-3">
            <h1>This is my super important dashboard</h1>
            <p>Welcome {`${(currentUser as User).email}`}</p>
            <Row className="m-2">
                <Button onClick={logOut}>Log Out</Button>
            </Row>
        </Container>
    );
};

export default Dashboard;
