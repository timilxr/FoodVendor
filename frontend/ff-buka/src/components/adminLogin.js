import React, {useState} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'
// import Table from 'react-bootstrap/Table';
// import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    // const [errors, setErrors] = useState({});
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
        axios.post('http://localhost:2000/users/login', data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.errors){
                setMsg(res.data)
            } else {
                try{
                    localStorage.setItem('E_com', JSON.stringify(res.data.token));
                }
                catch(err){
                    console.error(err);
                }
                // setMsg(res.data);
                return <Redirect to="/users/" />;
            }
        })
        .catch((err)=>console.log(`Error: ${err}`));
        e.preventDefault();
    };

    const showMe = () => {
        alert(data);
    };

    return(
        <Form className='text-left my-5 pt-5 mx-2 mx-md-5' onSubmit={showMe}>
            {msg ? <Alert variant="success">{msg}</Alert> : <Alert variant="primary">please fill the form</Alert>}

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" onChange={onInputChange} type="email" error={msg.email} placeholder="Enter email" required/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={onInputChange} type="password" error={msg.password} placeholder="Password" required/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handler}>
                Submit
            </Button>
            <p className="lead">Don't Have an account? </p><Link to="/admin/signup">Sign Up</Link>
        </Form>
    )
}

export default Login;