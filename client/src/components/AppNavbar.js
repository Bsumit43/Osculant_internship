import React, { Component, Fragment } from 'react';
import {
    Collapse, 
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Container,
    NavbarBrand
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import { Logout } from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavbar extends Component {
    state={
        isOpen:false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
    }
    
    render() {

        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `${user.name}` : ``}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>

        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                    {/* <NavLink href = "#">
                        Github
                    </NavLink> */}
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        )

        return (
            <div>
                <Navbar color="dark" dark expand = "sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/"><img width="242" height="48" src="https://chocolateplatform.com/wp-content/uploads/2017/10/chocolate-main.png" class="custom-logo" alt="Chocolate Main" data-large_image_width="242" data-large_image_height="48" /></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                                
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
