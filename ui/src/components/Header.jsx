import { Link } from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/patrimoine">Gestion Patrimoine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/patrimoine">Patrimoine</Nav.Link>
                        <Nav.Link as={Link} to="/possession">Possessions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
