import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import {
    AuthContextInterface,
    CustomersInterface,
    DevicesInterface,
    ProductInterface,
} from "../types";
import { useNavigate } from "react-router-dom";
import { DeviceDetails, NavbarComponent } from ".";
import axios from "axios";
import { BACKEND_URI } from "../constants";

const Dashboard = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { currentUser } = authContext;
    const navigator = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [updated, setUpdated] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [devices, setDevices] = useState<DevicesInterface>({});
    const [customers, setCustomers] = useState<CustomersInterface>({});
    const [showDevice, setShowDevice] = useState<ProductInterface | null>(null);
    const [counter, setCounter] = useState<number>(0);

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

        axios
            .get(`${BACKEND_URI}/customers`)
            .then((resp) => {
                setCustomers(resp.data.customers as CustomersInterface);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [updated, counter]);

    const handleViewCard = (key: string) => {
        const _util = () => {
            setModalShow(true);
            setShowDevice(devices[key]);
        };
        return _util;
    };

    const handleOnPaid = (key: string) => {
        const _util = () => {
            axios
                .get(`${BACKEND_URI}/emptyCustomer/${key}`)
                .then(() => {
                    alert("Paid successfully!");
                    setCounter((old) => old + 1);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        return _util;
    };

    const customerTotal = (key: string) => {
        return customers[key].cart.reduce((prevValue, currentValue) => {
            return (Number.parseFloat(devices[currentValue].price) +
                (prevValue as number)) as number;
        }, 0);
    };

    return (
        <>
            <NavbarComponent />
            <DeviceDetails
                onHide={() => setModalShow(false)}
                show={modalShow}
                device={showDevice as ProductInterface}
                updated={updated}
                setUpdated={setUpdated}
            />
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
                <Container id="cardContainer">
                    {Object.keys(customers).length > 0 &&
                        Object.keys(customers).map((key) => {
                            if ((customerTotal(key) as number) > 0)
                                return (
                                    <Card id="card" key={key}>
                                        <Card.Header as={"h5"}>
                                            {key}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                {customers[key].email}
                                            </Card.Title>
                                            <Card.Subtitle>
                                                Total $ {customerTotal(key)}
                                            </Card.Subtitle>
                                            <Button onClick={handleOnPaid(key)}>
                                                Paid
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
