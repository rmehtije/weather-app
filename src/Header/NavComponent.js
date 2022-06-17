import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// react-bootstrap eto govaja biblioteka react componentov
export default function NavComponent() {
    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Weather App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav
                        className="me-auto"
                        navbarScroll
                    >
                        {/* Link zapuskajet obrabotku pravel'nogo kompanenta.
                            Bez Link terjajetsa smqsl react route poskolku obqn4qj <a href="/"></a> 
                            perezapuskajet vsjo stranicu.
                            
                        */}
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/current/0">Tallinn</Link>
                        <Link className="nav-link" to="/current/1">Tartu</Link>
                        <Link className="nav-link" to="/current/2">Kuressaare</Link>
                        <Link className="nav-link" to="/current/3">Parnu</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}