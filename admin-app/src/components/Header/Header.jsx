import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signout } from './../../actions/auth.action';

function Header() {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(signout())
    }
    return (
        <Navbar fixed="top" style={{ zIndex: 1 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Link className="navbar-brand" to="/">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>
                    <Nav>
                        <li className="nav-item">
                            <NavLink to="/signin" className="nav-link" onClick={logout}>Logout</NavLink>
                        </li>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
