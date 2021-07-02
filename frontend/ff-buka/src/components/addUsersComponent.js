import React, {useState} from 'react';
// import {Redirect} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
// import Table from 'react-bootstrap/Table';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        // phone: Number,
        isAdmin: false,
        password: ''
    });
    const [msg, setMsg] = useState('');

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setData((prevState)=>{
            return{
                ...prevState,
                [name]: value
            };
        });
    };
    const handler = (e) => {
        axios.post('/users/register/', data)
        .then((res)=>{
            console.log(res.data);
            setMsg(res.data);
        })
        .catch((err)=>console.log(`Error: ${err}`));
        console.log(data);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form className='text-left my-5 py-5 mx-md-auto rounded bg-white shadow px-md-5' style={{width: 100+'%'}} onSubmit={showMe}>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
            <Form.Group controlId="formBasicname">
                <Form.Label>name</Form.Label>
                <Form.Control name="name" onChange={onInputChange} type="text" placeholder="Enter your name" />
                <Form.Text className="text-muted">
                We'll never share your name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" onChange={onInputChange} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            {/* <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone address</Form.Label>
                <Form.Control name="phone" onChange={onInputChange} type="tel" placeholder="Enter phone number" />
                <Form.Text className="text-muted">
                We'll never share your phone with anyone else.
                </Form.Text>
            </Form.Group> */}

            <Form.Group controlId="formBasicUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control name="isAdmin" defaultValue="Customer" onChange={onInputChange} as="select" custom>
                <option value={false}>Customer</option>
                {/* <option value="Customer">Customer</option> */}
                <option value={true}>Admin</option>
                {/* <option value="Worker">Worker</option> */}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={onInputChange} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
        </Form>
    )
}

export default Login;