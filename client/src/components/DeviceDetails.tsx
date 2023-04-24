import React, { ChangeEvent, FormEvent, useState } from "react";
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

interface PropsInterface {
    show: boolean;
    onHide(): void;
    device: ProductInterface;
}

const DeviceDetails = (props: PropsInterface) => {
    const [message, setMessage] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [messageType, setMessageType] = useState<string>("danger");
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    interface TextsInterface {
        [key: string]: string;
    }

    const texts: TextsInterface = {
        desc: "Description",
        title: "Title",
        price: "Price",
        productId: "Product Id",
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
                        <Table className="m-2">
                            <tbody>
                                {Object.keys(props.device).map((key) => {
                                    return (
                                        <>
                                            <tr key={key}>
                                                <th>
                                                    {
                                                        texts[
                                                            key as keyof TextsInterface
                                                        ]
                                                    }
                                                </th>
                                                <td>
                                                    {
                                                        props.device[
                                                            key as keyof ProductInterface
                                                        ]
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })}
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
                                disabled={loading}
                            >
                                Submit Details
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    return <></>;
};

export default DeviceDetails;
