import React, { useState } from 'react';
import Logo from '../../Assets/Images/logo.png';
import LogoText from '../../Assets/Images/text_logo.png';
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
                        <img src={Logo} className="img-fluid" alt="Bitcone" />
                        <img src={LogoText} className="img-fluid" alt="Bitcone" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink href="/">FAQ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://quickswap.exchange/#/swap/v2?currency0=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&currency1=0xbA777aE3a3C91fCD83EF85bfe65410592Bdd0f7c" target="_blank" className="btn btn_primary_outline">Buy BitCone</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" className="btn btn_primary">Connect Wallet</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header