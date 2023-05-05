import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import {
    AuthContextInterface,
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
    const [cardId, setCardId] = useState<string>("");
    const [updated, setUpdated] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [devices, setDevices] = useState<DevicesInterface>({});
    const [showDevice, setShowDevice] = useState<ProductInterface | null>(null);

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
            .get(`${BACKEND_URI}/getId/${currentUser?.email}`)
            .then((resp) => {
                setCardId(resp.data.cardId as string);
                // console.log(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get;
    }, [updated]);

    const handleViewCard = (key: string) => {
        const _util = () => {
            setModalShow(true);
            setShowDevice(devices[key]);
        };
        return _util;
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
                <Container className="d-flex justify-center align-items-center">
                    <h1 className="d-flex justify-center align-items-center text-center">
                        You have been registered successfully! Your card id is{" "}
                        {cardId}
                    </h1>
                </Container>
            </Container>
        </>
    );
};

export default Dashboard;
