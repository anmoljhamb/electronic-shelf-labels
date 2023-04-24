import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ProductInterface } from "../types";

interface PropsInterface {
    show: boolean;
    onHide(): void;
    device: ProductInterface;
}

const DeviceDetails = (props: PropsInterface) => {
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
                            {props.device.title} - {props.device.productId}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas
                            eget quam. Morbi leo risus, porta ac consectetur ac,
                            vestibulum at eros.
                        </p>
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
