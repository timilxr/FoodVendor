import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const SignUp = () => {
    const [data, setData] = useState({
        firstname: '',
        email: '',
        phone: Number,
        userType: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
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
        axios.post('http://localhost:2000/users/add', data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.errors){
                setErrors(res.data);
            }
            setMsg(res.data);
            return <Redirect to="/admin" />;
        })
        .catch((err)=>console.log(`Error: ${err}`));
        console.log("state");
        console.log(data);
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form className='text-left my-5 pt-5 mx-2 mx-md-5' onSubmit={showMe}>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}
            {/* {errors ? <Alert variant="danger">{errors}</Alert> : <Alert variant="primary">please fill the form</Alert>} */}
            <Form.Group controlId="formBasicFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control name="firstname" onChange={onInputChange} type="text" error={errors.name} placeholder="Enter your firstname" />
                <Form.Text className="text-muted">
                We'll never share your name with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" onChange={onInputChange} type="email" error={errors.email} placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone address</Form.Label>
                <Form.Control name="phone" onChange={onInputChange} type="tel" placeholder="Enter phone number" />
                <Form.Text className="text-muted">
                We'll never share your phone with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicUserType">
                <Form.Label>User Type</Form.Label>
                <Form.Control name="userType" defaultValue="Customer" onChange={onInputChange} as="select" custom>
                <option value="Customer" disabled>Select User Type</option>
                <option value="Customer">Customer</option>
                <option vlaue="Admin">Admin</option>
                <option value="Worker">Worker</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={onInputChange} type="password" error={errors.password} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
            <p className="lead">Already have an account? </p><Link to="/admin/">Log in</Link>
        </Form>
    )
}

export default SignUp;