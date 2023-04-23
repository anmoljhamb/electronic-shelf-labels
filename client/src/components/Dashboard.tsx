import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface, DevicesInterface } from "../types";
import { useNavigate } from "react-router-dom";
import { NavbarComponent } from ".";
import axios from "axios";
import { BACKEND_URI } from "../constants";

const Dashboard = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { currentUser } = authContext;
    const navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [devices, setDevices] = useState<DevicesInterface>({});

    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/getDevices`)
            .then((resp) => {
                // console.log(resp.data);
                setDevices(resp.data as DevicesInterface);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleViewCard = (key: string) => {
        const _util = () => {
            console.log(key);
        };
        return _util;
    };

    return (
        <>
            <NavbarComponent />
            <Container
                className="p-3"
                style={{ width: "100% !important", height: "40rem" }}
            >
                <Row>
                    <h1 className="text-center">Dashboard</h1>
                    <hr />
                </Row>
                <Container id="cardContainer">
                    {Object.keys(devices).length > 0 &&
                        Object.keys(devices).map((key) => {
                            return (
                                <Card id="card" key={key}>
                                    <Card.Header as={"h5"}>{key}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            {devices[key].title}
                                        </Card.Title>
                                        <Card.Subtitle>
                                            {devices[key].price}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            {devices[key].desc}
                                        </Card.Text>
                                        <Button onClick={handleViewCard(key)}>
                                            Edit/View
                                        </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                </Container>
            </Container>
        </>
    );
};

export default Dashboard;
