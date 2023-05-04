import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
    FloatingLabel,
    Alert,
    Row,
    Table,
} from "react-bootstrap";
import { ProductInterface } from "../types";
import axios from "axios";
import { BACKEND_URI } from "../constants";

interface PropsInterface {
    show: boolean;
    onHide(): void;
    updated: boolean;
    setUpdated(arg0: boolean): void;
    device: ProductInterface;
}

const DeviceDetails = (props: PropsInterface) => {
    const [message, setMessage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [messageType, setMessageType] = useState<string>("danger");

    useEffect(() => {
        if (props.device === null) return;
        setPrice(Number.parseFloat(props.device.price));
        setDesc(props.device.desc);
        setTitle(props.device.title);
    }, [props.device]);

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.setUpdated(true);
        axios({
            url: `${BACKEND_URI}/setDevice`,
            data: {
                title,
                price,
                desc,
                productId: props.device.productId,
            },
            method: "POST",
        })
            .then(() => {
                setMessage("Values updated successfully!");
                setMessageType("info");
            })
            .catch((err) => {
                console.log(err);
                setMessage("Error while updating information!");
                setMessageType("warning");
            })
            .finally(() => {
                props.setUpdated(false);
            });
    };

    if (props.device !== null)
        return (
            <>
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.device.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className="m-2" striped hover bordered>
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td>$ {price}</td>
                                </tr>
                                <tr>
                                    <th>Desc</th>
                                    <td>{desc}</td>
                                </tr>
                                <tr>
                                    <th>Product Id</th>
                                    <td>{props.device.productId}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Form className="m-2" onSubmit={handleOnSubmit}>
                            <FloatingLabel className="m-2" label={"Title"}>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Title"
                                    value={title}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setTitle(e.target.value);
                                    }}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                className="m-2"
                                label={"Description"}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Product Description"
                                    value={desc}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setDesc(e.target.value);
                                    }}
                                    required
                                />
                            </FloatingLabel>
                            <FloatingLabel className="m-2" label={"Price"}>
                                <Form.Control
                                    type="number"
                                    placeholder="Product Price"
                                    value={price}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPrice(
                                            Number.parseFloat(e.target.value)
                                        );
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
                                disabled={props.updated}
                            >
                                Submit Details
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                props.onHide();
                                setMessage("");
                            }}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    return <></>;
};

export default DeviceDetails;
