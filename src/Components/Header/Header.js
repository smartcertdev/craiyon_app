import React, { useState } from 'react';
import Logo from '../../Assets/Images/logo.png';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <header className="header">
            <Container>
                <Navbar color="transparent" expand="md">
                    <NavbarBrand href="/">
                        <img src={Logo} height="24" width="96.63" className="img-fluid" alt="craiyon logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink href="/">FAQ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Contact</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header