import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Logo from "../assest/logo.png"
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const CustomNav = () => {
     
    const redirect = useNavigate() 
    const userContext = useContext(UserContext);
    const {cart} = useContext(CartContext);
    const doLogout = () => {
        userContext.logout()
        redirect("/login")
    }

    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark' className='sticky-top'>
    <Container>
      <Navbar.Brand as={NavLink} to="/">
        <img
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="ElectroStore"
            />
        <span className='ms-2'>ElectroStore</span>      
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link as={NavLink} to="/services">Features</Nav.Link>
          <NavDropdown title="Product Categories" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Branded Phone</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Smart TVs
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              More
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
          <Nav.Link as={NavLink} to="/cart">Cart{userContext.isLogin && cart && ( '(' + cart.items.length + ')')}</Nav.Link>
            {(userContext.isLogin) ? (
                <>
                    {(userContext.isAdminUser && (
                        <>
                         <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
                        </>
                    ))}
                <Nav.Link as={NavLink} to="/users/orders">Order</Nav.Link>
                <Nav.Link as={NavLink} to="/users/profile">{userContext.userData.user.email}</Nav.Link>
                <Nav.Link onClick={doLogout}>Logout</Nav.Link> 
                </>
            ) : (
                <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Signup</Nav.Link>
                </>
            )}
               
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 );
}

export default CustomNav;