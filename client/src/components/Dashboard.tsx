import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from ".";

const Dashboard = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { currentUser } = authContext;
    const navigator = useNavigate();

    return (
        <>
            <NavbarComponent />
            <Container className="p-3">
                <h1>This is my super important dashboard</h1>
                <p>Welcome {`${currentUser?.email}`}</p>
            </Container>
        </>
    );
};

export default Dashboard;
