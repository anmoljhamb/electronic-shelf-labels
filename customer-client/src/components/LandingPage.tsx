import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigator = useNavigate();

    return (
        <Container className="p-3">
            <Row>
                <h1 className="text-center">Landing Page</h1>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="w-100"
                        variant="outline-primary"
                        onClick={() => {
                            navigator("/signup");
                        }}
                    >
                        Register Page
                    </Button>
                </Col>
                <Col>
                    <Button
                        className="w-100"
                        variant="secondary"
                        onClick={() => {
                            navigator("/login");
                        }}
                    >
                        Login Page
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
