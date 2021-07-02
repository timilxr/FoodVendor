import React, {useRef} from 'react';
import {Link} from 'react-router-dom';
import verifyToken from './actions';
// import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


export const Meal = (props) => {

    return(
        <Card>
            <Card.Img variant='top' src='../../public/logo192.png' />
            <Card.Body>
                <li>{props.meal.meal}</li>
                <Card.Title style={{textAlign: 'center', color: 'black'}}>{props.meal.unitPrice}</Card.Title>
                <Button variant='primary' style={{textAlign: 'right'}}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}

export const Header = (props) => {
    const result = useRef(verifyToken());
    console.log(result.current);

    // useEffect(() =>{
    //     result = verifyToken();
    //     console.log(result);
    //     }, [verifyToken]);

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                
                { result.current ? (
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item><Link to='/add'>Add User</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to='/users'>View Users</Link></NavDropdown.Item>
                        <NavDropdown.Item><Link to='/addproduct'>Add Product</Link></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                ) : <Nav.Link><Link to='/login'>Login</Link></Nav.Link>}
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}