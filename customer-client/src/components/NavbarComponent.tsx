import { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
    const authContext = useContext(AuthContext) as AuthContextInterface;
    const { currentUser, logOut } = authContext;

    return (
        <>
            <Navbar id="navbar" bg="light">
                <Container fluid className="h-100">
                    <Navbar.Brand>ElectronicShelfLabels</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as:{" "}
                            <Link to="/update-profile">
                                {currentUser?.email}
                            </Link>
                        </Navbar.Text>
                        <Button className="mx-2" onClick={logOut}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;
